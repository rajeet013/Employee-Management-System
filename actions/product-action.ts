'use server';

import prisma from '@/prisma/prisma';
import { ProductWithCategoryName } from '@/types/types';
import { slugify } from '@/utils/slugify';
import { productSchema } from '@/zod-schemas/product-schema';
import { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import * as z from 'zod';
import { deleteImageAction, uploadImageAction } from './image-action';

interface GetProductsResponse {
	data: ProductWithCategoryName[];
	totalItems: number;
}

export const getProductsAction = async ({
	query,
	page = 1
}: GetServerQuery): Promise<GetProductsResponse | undefined> => {
	const take = query ? 100 : 10;
	const skip = (page - 1) * take;

	const numericQuery = Number(query.trim());

	const orConditions: Prisma.ProductWhereInput[] = [
		// String-based search
		{
			name: {
				contains: query,
				mode: 'insensitive'
			}
		},
		{
			category: {
				name: {
					contains: query,
					mode: 'insensitive'
				}
			}
		}
	];

	if (!isNaN(numericQuery)) {
		orConditions.push(
			{
				inventory: {
					equals: numericQuery // Search exact stock threshold
				}
			},
			{
				price: {
					equals: numericQuery // Search exact price
				}
			}
		);
	}

	// Final `whereClause` combining `OR` conditions
	const whereClause: Prisma.ProductWhereInput = {
		OR: orConditions // Combines all conditions in `OR`
	};

	try {
		const data = await prisma.product.findMany({
			take,
			skip,
			where: whereClause,
			include: {
				category: {
					select: {
						name: true
					}
				}
			}
		});

		const totalItems = await prisma.product.count();

		return {
			data,
			totalItems
		};
	} catch (error: unknown) {
		console.log('PRODUCTS_ERROR', error);
		return { data: [], totalItems: 0 };
	}
};

/*export const createProduct = async (
	values: z.infer<typeof productSchema>,
	images: File[]
) => {
	try {
		const validatedFields = productSchema.safeParse(values);

		if (!validatedFields.success) return { error: 'Invalid field!' };

		const {
			name,
			featured,
			description,
			price,
			productType,
			status,
			inStock,
			inventory,
			categoryId
		} = validatedFields.data;

		if (!images || images.length === 0) {
			return { error: 'Please upload at least one image.' };
		}

		// Upload images
		const uploaded = await uploadImageAction(
			images,
			'dummy-products'
		);

		const product = await prisma.product.create({
			data: {
				name,
				slug: slugify(name),
				featured,
				description,
				price,
				productType,
				status,
				inStock,
				inventory,
				categoryId,
				ProductImage: {
					create: uploaded
				}
			}
		});

		revalidatePath('/product');

		return {
			success: 'true',
			message: `${product.name} created successfully!`
		};
	} catch (error: any) {
		if (error instanceof z.ZodError) {
			return {
				success: 'false',
				message: 'Please correct the highlighted fields.',
				errors: error.errors
			};
		}
		console.error('CREATE_PRODUCT_ERROR', error);
		return {
			error: 'Something went wrong while creating the product.'
		};
	}
};*/

export const createProduct = async (
    values: z.infer<typeof productSchema>,
    images: File[]
) => {
    try {
        const validatedFields = productSchema.safeParse(values);
        if (!validatedFields.success) return { error: 'Invalid field!' };

        const {
            name,
            featured,
            description,
            price,
            productType,
            status,
            inStock,
            inventory,
            categoryId
        } = validatedFields.data;

        // 1. MAKE IMAGES OPTIONAL FOR NOW
        let uploaded: any[] = [];
        
        if (images && images.length > 0) {
            try {
                // Try to upload, but don't crash if it fails
                uploaded = await uploadImageAction(images, 'dummy-products');
            } catch (imageError) {
                console.error("IMAGE_UPLOAD_FAILED_BUT_CONTINUING", imageError);
                // We keep 'uploaded' as an empty array so the product still saves
            }
        }

        // 2. CREATE THE PRODUCT
        const product = await prisma.product.create({
            data: {
                name,
                slug: slugify(name) || `product-${Date.now()}`, // Ensure slug exists
                featured,
                description,
                price: parseFloat(price as any), // Ensure it's a number
                productType,
                status,
                inStock,
                inventory: inventory ? parseInt(inventory as any) : 0,
                categoryId,
                ProductImage: {
                    create: uploaded // Will be empty if upload failed
                }
            }
        });

        revalidatePath('/product');

        return {
            success: 'true', // Next.js standard is boolean, but matching your type
            message: `${product.name} created successfully! ${uploaded.length === 0 ? "(Without images due to server error)" : ""}`
        };
    } catch (error: any) {
        console.error('CREATE_PRODUCT_ERROR', error);
        return {
            error: error.message || 'Something went wrong while creating the product.'
        };
    }
};

export const updateProduct = async (
	id: string,
	values: z.infer<typeof productSchema>,
	newImages: File[],
	existingImageIds: string[]
) => {
	try {
		const validatedFields = productSchema.parse(values);

		// Upload new images (if any)
		let newProductImages: UploadedImage[] = [];
		if (newImages.length > 0) {
			try {
				newProductImages = await uploadImageAction(
					newImages,
					'dummy-products'
				);
			} catch (error) {
				return {
					success: 'false',
					message: 'Failed to upload images. Please try again.'
				};
			}
		}

		// Get existing images from DB
		const existingImagesInDB = await prisma.productImage.findMany({
			where: { productId: id }
		});

		// Determine removed images
		const removedImages = existingImagesInDB.filter(
			image => !existingImageIds.includes(image.id)
		);

		// Delete removed images
		for (const image of removedImages) {
			const deleted = await deleteImageAction(image.public_id);
			if (!deleted) {
				console.warn(
					`❗ Image ${image.public_id} failed to delete from storage.`
				);
			}
		}

		// Update product with new data
		await prisma.product.update({
			where: { id },
			data: {
				...validatedFields,
				ProductImage: {
					deleteMany: {
						id: { notIn: existingImageIds }
					},
					create: newProductImages
				}
			}
		});

		revalidatePath('/product');

		return {
			success: 'true',
			message: 'Product updated successfully.'
		};
	} catch (error) {
		if (error instanceof z.ZodError) {
			return {
				success: 'false',
				message: 'Please correct the highlighted fields.',
				errors: error.errors
			};
		}

		console.error('UPDATE_PRODUCT_ERROR', error);
		return {
			success: 'false',
			message: 'Failed to update product. Please try again.'
		};
	}
};

export const deleteProduct = async (id: string) => {
	try {
		const productImages = await prisma.productImage.findMany({
			where: { productId: id }
		});

		// Step 2: Delete images from external storage
		for (const image of productImages) {
			const deleted = await deleteImageAction(image.public_id);
			if (!deleted) {
				console.warn(`⚠️ Failed to delete image ${image.public_id}`);
			}
		}

		const product = await prisma.product.delete({
			where: { id }
		});

		revalidatePath('/admin/product');

		if (!product) {
			return {
				success: 'false',
				error: `Product couldn't be deleted`
			};
		}
		return {
			success: 'true',
			message: `${product.name} deleted successfully.`
		};
	} catch (error) {
		console.error('DELETE_PRODUCT_ERROR', error);
		return {
			success: 'false',
			message: 'Failed to delete product. Please try again.'
		};
	}
};

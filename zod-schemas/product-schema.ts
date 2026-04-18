import { z } from 'zod';

export const ProductTypeEnum = z.enum(['READY', 'CUSTOM']);
export const ProductStatusEnum = z.enum([
	'ACTIVE',
	'HIDDEN',
	'DISCONTINUED'
]);

export const ProductImageSchema = z.object({
	id: z.string().uuid().optional(),
	public_id: z.string(),
	image_url: z.string().url(),
	altText: z.string().optional(),
	productId: z.string()
});

// export const ProductSchema = z.object({
// 	id: z.string().uuid().optional(),
// 	name: z.string().min(1, 'Name is required'),
// 	slug: z.string().min(1, 'Slug is required'),
// 	featured: z.boolean().default(false),
// 	description: z.string().optional(),
// 	price: z.number().min(0, 'Price must be a positive number'),
// 	productType: ProductTypeEnum.default('CUSTOM'),
// 	status: ProductStatusEnum.default('ACTIVE'),
// 	inStock: z.boolean().default(true),
// 	inventory: z.number().int().min(0).optional().default(1),
// 	categoryId: z.string().min(1, 'Category ID is required'),
// 	ProductImage: z.array(ProductImageSchema).optional(),

// 	createdAt: z.date().optional(),
// 	updatedAt: z.date().optional()
// });

// export const productSchema = z.object({
// 	name: z.string().min(1, 'Name is required'),
// 	slug: z.string().min(1, 'Slug is required'),
// 	featured: z.boolean().default(false),
// 	description: z.string().optional(),
// 	price: z.coerce.number().min(0, 'Price must be greater than zero.'),
// 	productType: z.enum(['READY', 'CUSTOM']),
// 	status: z.enum(['ACTIVE', 'HIDDEN', 'DISCONTINUED']),
// 	inStock: z.boolean().default(true),
// 	inventory: z.coerce.number().optional(),
// 	categoryId: z.string().min(1, 'Category is required')
// });

export const productSchema = z.object({
	name: z.string().min(1, 'Name is required.'),
	slug: z.string(),
	featured: z.boolean(),
	description: z.string().optional(),
	price: z.coerce.number().gt(0, 'Price must be greater than 0'),
	productType: z.enum(['READY', 'CUSTOM']),
	status: z.enum(['ACTIVE', 'HIDDEN', 'DISCONTINUED']),
	inStock: z.boolean(),
	inventory: z.coerce.number().gte(0, 'Inventory must be valid'),
	categoryId: z.string().min(1, 'Category is required.')
});

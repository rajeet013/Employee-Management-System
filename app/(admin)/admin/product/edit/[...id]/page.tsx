import prisma from '@/prisma/prisma';

import { lazy } from 'react';
const ProductForm = lazy(
	() => import('../../_components/ProductForm')
);

const EditProductProductPage = async (props: {
	params: Promise<{ id: string }>;
}) => {
	const params = await props.params;

	const { id } = params;
	const categories = await prisma.category.findMany();

	const product = await prisma.product.findUnique({
		where: {
			id: String(id)
		},
		include: {
			category: true,
			ProductImage: true
		}
	});

	return (
		<div className='container mx-auto py-10'>
			<div className='mb-8 text-center'>
				<h1 className='text-3xl font-bold text-sky-600'>
					Update Product
				</h1>
				<p className='text-gray-500'>
					Update your product in your inventory
				</p>
			</div>

			<div className='rounded-lg p-6 bg-gray-100 shadow-sm'>
				<ProductForm
					{...{
						categories,
						initialData: {
							id: product?.id ?? '',
							name: product?.name ?? '',
							slug: product?.slug ?? undefined,
							featured: product?.featured || false,
							description: product?.description ?? undefined,
							price: product?.price ?? 0,
							productType: product?.productType || 'CUSTOM',
							status: product?.status ?? 'ACTIVE',
							inStock: product?.inStock ?? false,
							inventory: product?.inventory ?? undefined,
							categoryId: product?.categoryId ?? '',
							ProductImage: (product?.ProductImage ?? []).map(
								img => ({
									id: img.id,
									public_id: img.public_id,
									image_url: img.image_url,
									altText: img.altText ?? undefined // ✅ normalize null to undefined
								})
							)
						}
					}}
				/>
			</div>
		</div>
	);
};

export default EditProductProductPage;

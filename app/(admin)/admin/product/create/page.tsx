import prisma from '@/prisma/prisma';
import { lazy } from 'react';
const ProductForm = lazy(() => import('../_components/ProductForm'));

const AddProductPage = async () => {
	const categories = await prisma.category.findMany();

	return (
		<div className='container mx-auto py-10'>
			<div className='mb-8 text-center'>
				<h1 className='text-3xl font-bold text-lime-600'>Add New Product</h1>
				<p className='text-gray-400'>
					Create a new product in your inventory
				</p>
			</div>

			<div className='rounded-lg p-6 bg-gray-100 shadow-sm'>
				<ProductForm {...{ categories }} />
			</div>
		</div>
	);
};

export default AddProductPage;

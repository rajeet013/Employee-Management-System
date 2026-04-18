const ProductDetailsCard = lazy(
	() => import('@/components/ProductDetailsCard')
);

const CategoryHeroSection = lazy(
	() => import('@/components/CategoryHeroSection')
);
import {
	shoesCategories,
	shoesImageData
} from '@/data/category-hero-section';

import { shoesProducts } from '@/data/products';
import { Metadata } from 'next';
import { lazy } from 'react';

export const metadata: Metadata = {
	title: 'Shoes'
};
const ProductsPage = () => {
	return (
		<div className='py-10 px-4 space-y-8 lg:space-y-12'>
			<CategoryHeroSection
				{...{
					categories: shoesCategories,
					imageData: shoesImageData,
					title: 'Style for Every Step',
					description:
						'Step into comfort and style with shoes made for every journey',
					orderClass: 'lg:order-2'
				}}
			/>
			<div>
				<h1 className='text-xl lg:text-2xl font-semibold text-gray-800 text-center mb-6'>
					Shop Our Collection
				</h1>

				<div className='flex flex-wrap justify-center gap-10 md:gap-14'>
					{shoesProducts.map(product => (
						<ProductDetailsCard
							key={`all-${product.id}`}
							product={product}
							urlPrefix='shoes' // Pass the correct URL prefix for shoes
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default ProductsPage;

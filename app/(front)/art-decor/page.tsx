const ProductDetailsCard = lazy(
	() => import('@/components/ProductDetailsCard')
);

const CategoryHeroSection = lazy(
	() => import('@/components/CategoryHeroSection')
);
import {
	artDecorCategories,
	artDecorImageData
} from '@/data/category-hero-section';

import { artDecorProducts } from '@/data/products';
import { Metadata } from 'next';
import { lazy } from 'react';

export const metadata: Metadata = {
	title: 'Artwork & Home Decor'
};

const ProductsPage = () => {
	return (
		<div className='py-10 px-4 space-y-8 lg:space-y-12'>
			<CategoryHeroSection
				{...{
					categories: artDecorCategories,
					imageData: artDecorImageData,
					title: 'Inspired Living Through Art',
					description:
						'Discover beautiful artwork and home accents designed to elevate every corner of your space.'
				}}
			/>
			<div>
				<h1 className='text-xl lg:text-2xl font-semibold text-gray-800 text-center mb-6'>
					Shop Our Collection
				</h1>

				<div className='flex flex-wrap justify-center gap-10 md:gap-14'>
					{artDecorProducts.map(product => (
						<ProductDetailsCard
							key={`all-${product.id}`}
							{...{
								product,
								urlPrefix: 'art-decor'
							}}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default ProductsPage;

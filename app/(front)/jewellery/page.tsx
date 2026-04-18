const CategoryHeroSection = lazy(
	() => import('@/components/CategoryHeroSection')
);
import {
	jewelryCategories,
	jewelryImageData
} from '@/data/category-hero-section';
import { jewelryProducts } from '@/data/products';
import { Metadata } from 'next';

import { lazy } from 'react';

const ProductDetailsCard = lazy(
	() => import('@/components/ProductDetailsCard')
);
export const metadata: Metadata = {
	title: 'Jewellery'
};
const ProductsPage = () => {
	return (
		<div className='py-10 px-4 space-y-8 lg:space-y-12'>
			<CategoryHeroSection
				{...{
					categories: jewelryCategories,
					imageData: jewelryImageData,
					title: 'For All Occasions',
					description: 'Gifts That Speak From the Heart',
					orderClass: 'lg:order-2'
				}}
			/>
			<div>
				<h1 className='text-xl lg:text-2xl font-semibold text-gray-800 text-center mb-6'>
					Shop Our Collection
				</h1>
				<div className='flex flex-wrap justify-center gap-10 md:gap-14'>
					{jewelryProducts.map(product => (
						<ProductDetailsCard
							key={`jewelry-${product.id}`}
							product={product}
							urlPrefix='jewelry'
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default ProductsPage;

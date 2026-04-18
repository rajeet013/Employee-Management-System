const CategoryHeroSection = lazy(
	() => import('@/components/CategoryHeroSection')
);
import {
	suitsShirtsCategories,
	suitsShirtsImageData
} from '@/data/category-hero-section';
import { suitProducts } from '@/data/products';
import { Metadata } from 'next';
import { lazy } from 'react';
const ProductDetailsCard = lazy(
	() => import('@/components/ProductDetailsCard')
);
export const metadata: Metadata = {
	title: 'Suits & Shirts'
};
const ProductsPage = () => {
	return (
		<div className='py-10 px-4 space-y-8 lg:space-y-12'>
			<CategoryHeroSection
				{...{
					categories: suitsShirtsCategories,
					imageData: suitsShirtsImageData,
					title: 'Style That Commands Respect',
					description: 'Suits for Every Occasion, Tailored to Impress'
				}}
			/>
			<div>
				<h1 className='text-xl lg:text-2xl font-semibold text-gray-800 text-center mb-6'>
					Shop Our Collection
				</h1>
				<div className='flex flex-wrap justify-center gap-10 md:gap-14'>
					{suitProducts.map(product => (
						<ProductDetailsCard
							key={`suit-${product.id}`}
							product={product}
							urlPrefix='suits-shirts'
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default ProductsPage;

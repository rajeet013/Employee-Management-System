'use client';

import { useCart } from '@/context/CartContext';
import { initialRating } from '@/store/initialState';
import Image from 'next/image';
import { lazy, useState } from 'react';

const Cart = lazy(() => import('@/components/Cart'));
const RatingComponent = lazy(
	() => import('@/components/rating/RatingComponent')
);

interface ProductType {
	id: string;
	title: string;
	slug: string;
	description: string;
	rating: number;
	price: number;
	image: { main: string; hover: string }[];
	tags: string[];
}

const SingleProductPage = ({
	slug,
	productList
}: {
	slug: string;
	productList: ProductType[];
}) => {
	const [index, setIndex] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const { addToCart } = useCart();
	const [showCart, setShowCart] = useState(false);
	const [isHovered, setIsHovered] = useState(false);

	// Find the product that matches the slug from the productList
	const product = productList.find(p => p.slug === slug);
	if (!product) {
		return <div>Product not found</div>;
	}
	const { title, description, price, image, rating } = product;

	const handleAddToCart = () => {
		addToCart({
			id: product.id,
			title,
			price,
			quantity,
			image: image[0].main
		});
	};
	const handleBuyNow = () => {
		handleAddToCart();
		setShowCart(true);
	};
	const handleQuantityChange = (type: 'increment' | 'decrement') => {
		setQuantity(prev =>
			type === 'increment' ? prev + 1 : Math.max(1, prev - 1)
		);
	};
	const toggleCart = () => setShowCart(prev => !prev);

	return (
		<div className='flex flex-col items-center mt-10 mb-20 '>
			<div className='flex flex-col lg:flex-row justify-center space-y-10 lg:space-y-0 lg:space-x-10 w-screen max-w-2xl lg:max-w-[1280px] px-4 md:px-6 xl:px-10'>
				{/* Product image and thumbnail */}
				<div className='w-full flex flex-col items-center py-4'>
					<div
						className='relative w-full xs:w-[450px] lg:w-[500px] h-[450px] xs:h-[550px] lg:h-[650px] rounded-lg overflow-hidden bg-gray-100'
						onMouseEnter={() => setIsHovered(true)}
						onMouseLeave={() => setIsHovered(false)}
					>
						<Image
							src={isHovered ? image[index].hover : image[index].main}
							alt={title}
							fill
							priority
							sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
							className='object-cover transition-transform duration-300 hover:scale-105'
						/>
					</div>

					{/* Thumbnail images */}
					<div className='flex mt-4 space-x-2 overflow-x-auto'>
						{image.map((img, i) => (
							<div
								key={i}
								className={`w-16 h-16 relative cursor-pointer rounded-md border-2 hover:opacity-50 ${
									i === index
										? 'border-primary-emerald opacity-70'
										: 'border-gray-400'
								}`}
								onClick={() => setIndex(i)}
							>
								<Image
									src={img.main}
									alt={title}
									fill
									priority
									sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
									className='object-cover rounded-md'
								/>
							</div>
						))}
					</div>
				</div>

				{/* Product details */}
				<div className='w-full flex flex-col space-y-4 border border-gray-200 p-4'>
					<h1 className='text-2xl md:text-3xl font-bold'>{title}</h1>
					<div className='flex items-center'>
						<RatingComponent
							type='static'
							itemState={{
								...initialRating,
								rating: 5,
								activeStar: rating
							}}
							setItemState={() => {}}
						/>
						<p className='text-lg text-primary-emerald ml-2'>
							({rating})
						</p>
					</div>
					<div className='space-y-1'>
						<h4 className='text-[20px] font-bold'>Description</h4>
						<p className='text-[gray]'>{description}</p>
					</div>
					<span className='text-2xl font-bold text-primary-emerald'>
						${price}
					</span>

					<div className='flex items-center space-x-6 border w-fit'>
						<button
							className='w-14 h-12 flex items-center justify-center border-r text-2xl text-gray-700 hover:bg-gray-100 active:bg-gray-200'
							onClick={() => handleQuantityChange('decrement')}
						>
							−
						</button>
						<span className='text-xl text-gray-800'>{quantity}</span>
						<button
							className='w-14 h-12 flex items-center justify-center border-l text-2xl text-gray-700 hover:bg-gray-100 active:bg-gray-200'
							onClick={() => handleQuantityChange('increment')}
						>
							+
						</button>
					</div>

					{/* Action buttons */}
					<div className='flex space-x-4'>
						<button
							onClick={handleAddToCart}
							className='w-43 h-12 text-base lg:text-lg font-semibold tracking-wide border border-primary-emerald text-primary-emerald hover:scale-105'
						>
							Add to Cart
						</button>
						<button
							onClick={handleBuyNow}
							className='w-43 h-12 text-base lg:text-lg font-semibold tracking-wide bg-primary-emerald text-white hover:scale-105'
						>
							Buy Now
						</button>
					</div>
				</div>
			</div>

			{/* Cart modal */}
			<Cart {...{ showCart, toggleCart }} />
		</div>
	);
};

export default SingleProductPage;

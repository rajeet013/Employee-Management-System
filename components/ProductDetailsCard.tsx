'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface Product {
	id: string;
	title: string;
	description: string;
	price: number;
	image: { main: string; hover: string }[];
	rating: number;
	slug: string;
	tags?: string[];
}

interface ProductCardProps {
	product: Product;
	urlPrefix: string;
}

const ProductDetailsCard = ({
	product,
	urlPrefix
}: ProductCardProps) => {
	const [index, setIndex] = useState(0);
	const [isHovered, setIsHovered] = useState(false);

	const { image, title, slug, price, tags = [] } = product;

	return (
		<div className='w-full max-w-[21rem] text-center border border-gray-200 rounded-md overflow-hidden hover:shadow-xl transition-shadow duration-300 pb-2'>
			<Link href={`/${urlPrefix}/${slug}`} className='block'>
				<div
					className='relative w-full h-[420px] bg-gray-100 overflow-hidden'
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
				>
					<Image
						src={isHovered ? image[index].hover : image[index].main}
						alt={title}
						fill
						priority
						sizes='(max-width: 768px) 100vw'
						className='object-cover transition-transform duration-300 hover:scale-105'
					/>
					<div className='absolute top-2 px-2 flex gap-2 mb-2'>
						{tags.map((tag, i) => (
							<span
								key={i}
								className='px-2 py-0.5 text-xs font-semibold text-white border border-gray-100 rounded'
							>
								{tag.toUpperCase()}
							</span>
						))}
					</div>
				</div>
			</Link>

			<div className='flex justify-center mt-4 space-x-2 overflow-x-auto text-base'>
				{image.map((img, i) => (
					<button
						key={i}
						onClick={() => setIndex(i)}
						className={`w-8 h-8 rounded-full border-2 overflow-hidden cursor-pointer ${
							i === index ? 'border-primary-rose' : 'border-gray-300'
						}`}
					>
						<Image
							src={img.main}
							alt={`${title}-${i}`}
							width={28}
							height={28}
							priority
							className='object-cover'
						/>
					</button>
				))}
			</div>

			<h3 className='font-semibold text-gray-900 mt-4'>{title}</h3>
			<p className='text-gray-700 font-bold mt-1'>${price}</p>
		</div>
	);
};

export default ProductDetailsCard;

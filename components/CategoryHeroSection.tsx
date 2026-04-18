'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

interface Category {
	name: string;
	image: {
		main: string;
		hover: string;
	};
}

interface ImageData {
	src: string;
	alt: string;
}

interface HeroSectionProps {
	categories: Category[];
	imageData: ImageData[];
	title: string;
	description: string;
	buttonText?: string;
	orderClass?: string;
}

const CategoryHeroSection = ({
	categories,
	imageData,
	title,
	description,
	orderClass,
	buttonText = 'CUSTOMIZE NOW'
}: HeroSectionProps) => {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(
		null
	);

	return (
		<div className=' space-y-8 lg:space-y-0'>
			{/* Top Section */}
			<div className='grid lg:grid-cols-3 gap-4  items-center lg:border-t'>
				<div
					className={`grid grid-cols-2 gap-4 col-span-2 ${orderClass}`}
				>
					{imageData.map((img, index) => (
						<div
							key={index}
							className='w-full h-60 sm:h-90 lg:h-110 xl:h-120 2xl:h-150 relative'
						>
							<Image
								src={img.src}
								alt={img.alt || 'category image'}
								fill
								priority
								sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
								className='object-cover'
							/>
						</div>
					))}
				</div>

				<div className='space-y-6 text-center sm:text-left lg:order-1'>
					<h1 className=' text-3xl lg:text-4xl font-bold uppercase'>
						{title}
					</h1>
					<p className='text-lg'>{description}</p>
					<Link
						href='#'
						className='bg-primary-neutral text-white px-6 py-4 font-semibold hover:bg-gray-800 transition rounded cursor-pointer'
					>
						{buttonText}
					</Link>
				</div>
			</div>

			{/* Category Grid */}
			<div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 '>
				{categories.map((cat, i) => (
					<div
						key={i}
						className='relative w-full h-60 sm:h-80 2xl:h-100 overflow-hidden border group'
						onMouseEnter={() => setHoveredIndex(i)}
						onMouseLeave={() => setHoveredIndex(null)}
					>
						<Image
							src={
								hoveredIndex === i ? cat.image.hover : cat.image.main
							}
							alt={cat.name}
							fill
							sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
							className='object-cover transition-transform duration-300 '
						/>
						<div
							className={`absolute bottom-0 left-0 w-full h-10 text-sm font-bold flex items-center pl-4 group-hover:bg-black/50 text-white  group-hover:underline`}
						>
							{cat.name}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default CategoryHeroSection;

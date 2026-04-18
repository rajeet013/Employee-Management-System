'use client';

import Image from 'next/image';
import Link from 'next/link';

const categories = [
	{
		title: 'Jewelry',
		image: '/images/jewelry/jewelry.webp',
		link: '/jewelry',
		tags: ['Sale', 'New']
	},
	{
		title: 'Suits & Shirts',
		image: '/images/suit/suit8.webp',
		link: '/suits-shirts'
	},
	{
		title: 'Shoes',
		image: '/images/shoes/sneakers.webp',
		link: '/shoes'
	},
	{
		title: 'Art Work & Home Decor',
		image: '/images/home-decor/hero-decor1.webp',
		link: '/art-decor'
	}
];

export default function CategoryHighlights() {
	return (
		<section className='w-full py-24 px-6 md:px-12 lg:px-20'>
			<div className='max-w-7xl mx-auto'>
				<h2 className='text-3xl sm:text-4xl font-semibold text-gray-900 text-center mb-12'>
					Explore Our Categories
				</h2>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
					{categories.map((cat, index) => (
						<Link
							key={index}
							href={cat.link}
							className='group relative rounded-md overflow-hidden shadow-md hover:shadow-xl transition duration-300'
						>
							{/* Image Container */}
							<div className='aspect-[4/5] relative w-full'>
								<Image
									src={cat.image}
									alt={cat.title}
									fill
									priority
									sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
									className='object-cover group-hover:scale-105 transition-transform duration-300'
								/>
								<div className='absolute inset-0 bg-black/30' />
								<div className='absolute bottom-4 left-4 z-10'>
									<h3 className='text-white text-lg font-semibold'>
										{cat.title}
									</h3>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}

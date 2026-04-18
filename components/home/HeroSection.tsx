'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const sliderImages = [
	'/images/suit/suit1.webp',
	'/images/suit/suit2.webp',
	'/images/suit/suit3.webp'
];

export default function HeroSection() {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setIndex(prev => (prev + 1) % sliderImages.length);
		}, 4000);
		return () => clearInterval(timer);
	}, []);

	return (
		<section className='w-full px-4 sm:px-10 lg:px-16 xl:px-24 py-20'>
			<div className='max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-20 min-h-[85vh]'>
				<div className='flex flex-col justify-center h-full space-y-6 -ml-2 sm:-ml-6 lg:-ml-12'>
					<p className='text-sm uppercase tracking-widest text-primary-emerald font-semibold'>
						Premium Shop
					</p>
					<h1 className='text-3xl md:text-4xl sm:text-5xl 2xl:text-5xl font-extrabold text-gray-900 leading-tight'>
						Discover the{' '}
						<span className='text-black underline decoration-primary-emerald decoration-4 underline-offset-4'>
							New Standard
						</span>{' '}
						of Style
					</h1>
					<p className='text-lg sm:text-xl text-gray-600 max-w-lg'>
						A minimal aesthetic for the modern wardrobe. Clean cuts,
						muted tones, and timeless designs — now 25% off.
					</p>

					<div className='flex flex-wrap items-center gap-3 mt-4'>
						<span className='bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-700 shadow-sm'>
							✨ Handcrafted Design
						</span>
						<span className='bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-700 shadow-sm'>
							🧵 Custom Tailored Fit
						</span>
						<span className='bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-700 shadow-sm'>
							✅ Quality Guaranteed
						</span>
					</div>

					<div className='pt-6'>
						<button className='px-8 py-3 bg-black text-white text-base font-medium rounded hover:bg-gray-800 transition'>
							Customize Now
						</button>
					</div>
				</div>

				<div className='relative w-full h-[450px] sm:h-[500px] md:h-[550px] lg:h-[600px] xl:h-[650px] rounded-3xl overflow-hidden shadow-2xl'>
					{sliderImages.map((img, i) => (
						<Image
							key={i}
							src={img}
							alt={`Slide ${i + 1}`}
							fill
							priority
							sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
							className={`object-cover transition-opacity duration-1000 ease-in-out ${
								i === index ? 'opacity-100' : 'opacity-0'
							}`}
						/>
					))}
				</div>
			</div>
		</section>
	);
}

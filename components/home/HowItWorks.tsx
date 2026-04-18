'use client';

import { Edit3, Search, Truck } from 'lucide-react';

const HowItWorks = () => {
	return (
		<section className='w-full py-16 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto'>
			<h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12'>
				How It Works
			</h2>

			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 text-center'>
				<div className='flex flex-col items-center space-y-4'>
					<Search size={40} className='text-primary-emerald' />
					<h3 className='text-lg sm:text-xl font-semibold'>
						1. Explore Our Collection
					</h3>
					<p className='text-sm sm:text-base text-gray-600 max-w-xs'>
						Browse suits, shoes, jewelry & more to match your style.
					</p>
				</div>

				<div className='flex flex-col items-center space-y-4'>
					<Edit3 size={40} className='text-primary-emerald' />
					<h3 className='text-lg sm:text-xl font-semibold'>
						2. Customize & Choose
					</h3>
					<p className='text-sm sm:text-base text-gray-600 max-w-xs'>
						Pick your size or custom design for a perfect fit.
					</p>
				</div>

				<div className='flex flex-col items-center space-y-4'>
					<Truck size={40} className='text-primary-emerald' />
					<h3 className='text-lg sm:text-xl font-semibold'>
						3. Delivered to Your Door
					</h3>
					<p className='text-sm sm:text-base text-gray-600 max-w-xs'>
						Enjoy fast and safe delivery, right to your home.
					</p>
				</div>
			</div>
		</section>
	);
};

export default HowItWorks;

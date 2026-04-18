const CategoryHighlights = lazy(
	() => import('@/components/home/CategoryHighlights')
);
const HeroSection = lazy(
	() => import('@/components/home/HeroSection')
);
const HeroSlider = lazy(() => import('@/components/home/HeroSlider'));
const HowItWorks = lazy(() => import('@/components/home/HowItWorks'));
import { Metadata } from 'next';
import React, { lazy } from 'react';

export const metadata: Metadata = {
	title: 'Home'
};

const page = () => {
	return (
		<div className='space-y-4 lg:space-y-6 xl:space-y-8 2xl:space-10 3xl:space-y-12'>
			<HeroSection />
			<CategoryHighlights />
			<HeroSlider />
			<HowItWorks />
		</div>
	);
};

export default page;

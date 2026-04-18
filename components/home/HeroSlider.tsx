'use client';

import { HeroSliderItems } from '@/data/slider';
import useSlider from '@/hooks/useSlider';
import { useMemo } from 'react';

const HeroSlider = () => {
	const sliderImages = useMemo(() => HeroSliderItems, []);

	const { index } = useSlider(sliderImages.map(image => image.url));

	return (
		<div className='relative flex flex-col items-center justify-center  sm:mt-0 h-[40dvh] lg:h-[60dvh] mx-auto z-0'>
			{sliderImages && (
				<div
					className={`relative h-full w-full overflow-hidden z-0 bg-cover bg-center transition-all duration-300 ease-linear rounded-md
				`}
					style={{
						backgroundImage: `url(${sliderImages[index].url})`
					}}
				></div>
			)}
		</div>
	);
};

export default HeroSlider;

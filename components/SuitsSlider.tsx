'use client';

import { SuitsSliderItems } from '@/data/slider';
import useSlider from '@/hooks/useSlider';
import { lazy, useMemo } from 'react';
const SliderButtonLeft = lazy(
	() => import('./buttons/SliderButtonLeft')
);
const SliderButtonRight = lazy(
	() => import('./buttons/SliderButtonRight')
);
const SliderIndicator = lazy(
	() => import('./buttons/SliderIndicators')
);

const SuitsSlider = () => {
	const sliderImages = useMemo(() => SuitsSliderItems, []);

	const {
		index,
		setAutoSlide,
		handlePrev,
		handleNext,
		handleButton
	} = useSlider(sliderImages.map(image => image.url));

	return (
		<div className='relative flex flex-col items-center justify-center  sm:mt-0 h-[80dvh] mx-auto z-0'>
			{sliderImages && (
				<div
					className={`relative h-full w-full overflow-hidden z-0 bg-cover bg-center transition-all duration-300 ease-linear rounded-md
				`}
					style={{
						backgroundImage: `url(${sliderImages[index].url})`
					}}
				></div>
			)}

			{/* <SliderContent
				{...{
					index,
					id: sliderImages[index].id,
					subtitle: sliderImages[index].subtitle,
					title: sliderImages[index].title,
					description: sliderImages[index].description
				}}
			/> */}

			<div className='absolute inset-0 mx-auto my-auto flex items-center justify-between z-50 px-[3%]'>
				<SliderButtonLeft
					{...{
						onClick: handlePrev,
						setAutoSlide,
						text: 'Previous'
					}}
				/>

				<SliderButtonRight
					{...{
						onClick: handleNext,
						setAutoSlide,
						text: 'Next'
					}}
				/>
			</div>

			{/* <CallToAction /> */}

			<SliderIndicator
				{...{
					sliderImages,
					index,
					handleButton,
					setAutoSlide
				}}
			/>
		</div>
	);
};

export default SuitsSlider;

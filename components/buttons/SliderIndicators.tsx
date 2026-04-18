'use client';

import useMediaQuery from '@/hooks/useMediaQuery';
import { fadeIn } from '@/utils/variants';
import { motion } from 'framer-motion';
import { SetStateAction } from 'react';

interface SliderIndicatorProps {
	sliderImages: {
		id: number;
		url: string;
		subtitle: string;
		title: string;
		description?: string;
	}[];
	index: number;
	handleButton: (ind: number) => void;
	setAutoSlide: (value: SetStateAction<boolean>) => void;
}

const SliderIndicator = ({
	sliderImages,
	index,
	handleButton,
	setAutoSlide
}: SliderIndicatorProps) => {
	const isABoveMediumScreens = useMediaQuery('(min-width: 1060px');

	const handleClick = (index: number) => {
		setAutoSlide(false);
		handleButton(index);
	};

	return (
		<motion.div
			variants={fadeIn('up', 'spring', 0, 0.5)}
			initial='hidden'
			animate={'show'}
			// viewport={{ once: false, amount: 0.5 }}
			className={`absolute left-0 ${
				isABoveMediumScreens
					? 'bottom-8 sm:top-bottom-10 scale-[85%] sm:scale-100'
					: 'bottom-4 scale-[50%]'
			} right-0 flex items-center justify-center w-full sm:w-2/3 sm:px-20 mx-auto  z-50`}
		>
			{sliderImages?.map((_, i) => (
				<span
					key={i}
					className={`relative flex items-center justify-center cursor-pointer ${
						i === index ? 'text-amber-400' : 'text-amber-200'
					} ${
						isABoveMediumScreens
							? 'text-[13px] 2xl:text-[16px] mx-8'
							: 'text-[10px] mx-4'
					}  px-1
        ${
					i === index
						? '-translate-y-2 transition-all duration-300'
						: 'translate-y-0 transition-all duration-300'
				}
        `}
					onClick={() => handleClick(i)}
					onMouseEnter={() => setAutoSlide(false)}
				>
					{i + 1}

					<span
						className={`absolute h-[1px] w-full left-0 ${
							isABoveMediumScreens ? 'top-7' : 'top-4'
						} bg-primary/60 hover:bg-primary/70 ${
							i === index
								? 'z-10 transition-all duration-300'
								: '-z-10 scale-0 opacity-0 transition-all duration-300'
						}`}
					></span>
					<span
						className={`absolute h-[1px] w-full bg-primary/60 hover:bg-primary/70 left-0 ${
							isABoveMediumScreens ? 'top-8' : 'top-5'
						} ${
							i === index
								? ' z-10 transition-all duration-300'
								: ' -z-10 scale-0 opacity-0 transition-all duration-300'
						}`}
					></span>
				</span>
			))}
		</motion.div>
	);
};

export default SliderIndicator;

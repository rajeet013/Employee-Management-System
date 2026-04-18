

import { fadeIn } from '@/utils/variants';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface SliderButtonProps {
	onClick: () => void;
	setAutoSlide: (value: boolean) => void;
	text: string;
}

const arrowVariants = {
	rest: { scale: 1, fill: 'transparent' },
	hover: {
		scale: 1.2,
		fill: '#FFB300',
		transition: { type: 'tween', duration: 1, ease: 'easeOut' }
	}
};

const SliderButtonLeft = ({
	onClick,
	setAutoSlide,
	text
}: SliderButtonProps) => {
	const [hovered, setHovered] = useState(false);

	const handleMouseEnter = () => {
		setAutoSlide(false);
		setHovered(true);
	};
	const handleMouseLeave = () => {
		setHovered(false);
	};

	return (
		<motion.button
			variants={fadeIn('left', 'spring', 1.2, 1.4)}
			initial='hidden'
			whileInView='show'
			onClick={onClick}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			className='flex items-center justify-center font-extrabold text-3xl w-7 h-7 sm:w-10 sm:h-10 z-50 cursor-pointer'
		>
			<motion.svg
				width='15'
				height='28'
				viewBox='0 0 15 28'
				xmlns='http://www.w3.org/2000/svg'
				style={{ originX: 0.5, originY: 0.5 }}
				initial='rest'
				animate={hovered ? 'hover' : 'rest'}
				variants={arrowVariants}
				className='z-50 w-7 h-7 -mr-5'
			>
				<motion.path
					d='M13.9139 3.40351C14.5182 2.78301 14.518 1.79393 13.9134 1.17372V1.17372C13.2862 0.530434 12.2522 0.530588 11.6252 1.17406L0.618066 12.4715C0.422198 12.6714 0.266754 12.909 0.160681 13.1708C0.0546078 13.4325 0 13.7133 0 13.9968C0 14.2803 0.0546078 14.561 0.160681 14.8227C0.266754 15.0845 0.422198 15.3221 0.618066 15.522L11.6253 26.8254C12.2521 27.469 13.2862 27.4691 13.913 26.8255V26.8255C14.5168 26.2056 14.5168 25.2176 13.9131 24.5976L3.59328 14L13.9139 3.40351Z'
					variants={arrowVariants}
				/>
			</motion.svg>

			{/* static filled arrow */}
			<svg
				width='15'
				height='28'
				viewBox='0 0 15 28'
				xmlns='http://www.w3.org/2000/svg'
				className='z-50 w-9 h-9 order-0'
				fill='#FFB300'
			>
				<path d='M13.9139 3.40351C14.5182 2.78301 14.518 1.79393 13.9134 1.17372V1.17372C13.2862 0.530434 12.2522 0.530588 11.6252 1.17406L0.618066 12.4715C0.422198 12.6714 0.266754 12.909 0.160681 13.1708C0.0546078 13.4325 0 13.7133 0 13.9968C0 14.2803 0.0546078 14.561 0.160681 14.8227C0.266754 15.0845 0.422198 15.3221 0.618066 15.522L11.6253 26.8254C12.2521 27.469 13.2862 27.4691 13.913 26.8255V26.8255C14.5168 26.2056 14.5168 25.2176 13.9131 24.5976L3.59328 14L13.9139 3.40351Z' />
			</svg>

			<span className='sr-only'>{text}</span>
		</motion.button>
	);
};

export default SliderButtonLeft;

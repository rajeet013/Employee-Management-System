
import { fadeIn } from '@/utils/variants';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface SliderButtonProps {
	onClick: () => void;
	setAutoSlide: (value: boolean) => void;
	text: string;
}

// only animating fill+scale here (no stroke)
const arrowVariants = {
	rest: { scale: 1, fill: 'transparent' },
	hover: {
		scale: 1.2,
		fill: '#FFB300',
		transition: { type: 'tween', duration: 0.8, ease: 'easeOut' }
	}
};

const SliderButtonRight = ({
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
			variants={fadeIn('right', 'spring', 1.2, 1.4)}
			initial='hidden'
			whileInView='show'
			onClick={onClick}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			className='flex items-center justify-end font-extrabold text-3xl w-7 h-7 sm:w-10 sm:h-10 z-50 cursor-pointer'
		>
			{/* static outline arrow */}
			<svg
				width='15'
				height='28'
				viewBox='0 0 15 28'
				xmlns='http://www.w3.org/2000/svg'
				className='z-50 w-9 h-9'
			>
				<path
					d='M1.08612 3.40351C0.481774 2.78301 0.482007 1.79393 1.08664 1.17372V1.17372C1.71377 0.530434 2.74783 0.530588 3.37477 1.17406L14.3819 12.4715C14.5778 12.6714 14.7332 12.909 14.8393 13.1708C14.9454 13.4325 15 13.7133 15 13.9968C15 14.2803 14.9454 14.561 14.8393 14.8227C14.7332 15.0845 14.5778 15.3221 14.3819 15.522L3.37466 26.8254C2.74792 27.469 1.71379 27.4691 1.087 26.8255V26.8255C0.483239 26.2056 0.483193 25.2176 1.0869 24.5976L11.4067 14L1.08612 3.40351Z'
					fill='#FFB300'
				/>
			</svg>

			{/* motion arrow: BOTH the <svg> and the <path> need to be motion components */}
			<motion.svg
				width='15'
				height='28'
				viewBox='0 0 15 28'
				xmlns='http://www.w3.org/2000/svg'
				style={{ originX: 0.5, originY: 0.5 }}
				initial='rest'
				animate={hovered ? 'hover' : 'rest'}
				variants={arrowVariants}
				className='z-50 w-7 h-7 -ml-5'
			>
				<motion.path
					d='M1.08612 3.40351C0.481774 2.78301 0.482007 1.79393 1.08664 1.17372V1.17372C1.71377 0.530434 2.74783 0.530588 3.37477 1.17406L14.3819 12.4715C14.5778 12.6714 14.7332 12.909 14.8393 13.1708C14.9454 13.4325 15 13.7133 15 13.9968C15 14.2803 14.9454 14.561 14.8393 14.8227C14.7332 15.0845 14.5778 15.3221 14.3819 15.522L3.37466 26.8254C2.74792 27.469 1.71379 27.4691 1.087 26.8255V26.8255C0.483239 26.2056 0.483193 25.2176 1.0869 24.5976L11.4067 14L1.08612 3.40351Z'
					variants={arrowVariants}
				/>
			</motion.svg>

			<span className='sr-only'>{text}</span>
		</motion.button>
	);
};

export default SliderButtonRight;

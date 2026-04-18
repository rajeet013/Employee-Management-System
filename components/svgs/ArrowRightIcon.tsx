interface ArrowRightIconProps {
	className: string;
	dimension?: string;
}

const ArrowRightIcon = ({
	className,
	dimension
}: ArrowRightIconProps) => {
	return (
		<svg
			width={dimension ?? 30}
			height={dimension ?? 30}
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className='cursor-pointer'
		>
			<path
				d='M16.175 11H4V9H16.175L10.575 3.4L12 2L20 10L12 18L10.575 16.6L16.175 11Z'
				className={`${className} fill-current`}
			/>
		</svg>
	);
};

export default ArrowRightIcon;

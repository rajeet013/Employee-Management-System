const CategoryIcon = ({ className, dimension }: IconProps) => {
	return (
		<svg
			width={dimension ?? '18'}
			height={dimension ?? '18'}
			viewBox='0 0 76 80'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className='cursor-pointer'
		>
			<path
				d='M36 0L14 36H58L36 0ZM36 15.36L43.72 28H28.24L36 15.36ZM58 44C48.04 44 40 52.04 40 62C40 71.96 48.04 80 58 80C67.96 80 76 71.96 76 62C76 52.04 67.96 44 58 44ZM58 72C52.48 72 48 67.52 48 62C48 56.48 52.48 52 58 52C63.52 52 68 56.48 68 62C68 67.52 63.52 72 58 72ZM0 78H32V46H0V78ZM8 54H24V70H8V54Z'
				className={`${className} fill-current`}
			/>
		</svg>
	);
};

export default CategoryIcon;

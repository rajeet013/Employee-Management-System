const YoutubeIcon = ({ className, dimension }: IconProps) => {
	return (
		<svg
			width={dimension ?? 30}
			height={dimension ?? 30}
			viewBox='0 0 50 50'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className='cursor-pointer'
		>
			<path
				d='M16 3C8.83248 3 3 8.83248 3 16V34C3 41.1675 8.83248 47 16 47H34C41.1675 47 47 41.1675 47 34V16C47 8.83248 41.1675 3 34 3H16ZM16 5H34C40.0865 5 45 9.91352 45 16V34C45 40.0865 40.0865 45 34 45H16C9.91352 45 5 40.0865 5 34V16C5 9.91352 9.91352 5 16 5Z'
				className={`${className} fill-current`}
			/>

			<path
				d='M20 15L35 25L20 35V15Z'
				className={`${className} fill-current`}
			/>
		</svg>
	);
};

export default YoutubeIcon;

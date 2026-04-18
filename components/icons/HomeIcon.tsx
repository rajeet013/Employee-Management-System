const HomeIcon = ({ className, dimension }: IconProps) => {
	return (
		<svg
			width={dimension ?? '32'}
			height={dimension ?? '32'}
			viewBox='0 0 33 33'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className='cursor-pointer'
		>
			<path
				d='M11.5 23.4167H14.25V17.9167H19.75V23.4167H22.5V15.1667L17 11.0417L11.5 15.1667V23.4167ZM9.66663 25.25V14.25L17 8.75L24.3333 14.25V25.25H17.9166V19.75H16.0833V25.25H9.66663Z'
				className={`${className} fill-current`}
			/>
		</svg>
	);
};

export default HomeIcon;

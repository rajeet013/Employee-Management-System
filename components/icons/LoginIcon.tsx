const LoginIcon = ({ className, dimension }: IconProps) => {
	return (
		<svg
			width={dimension ?? '37'}
			height={dimension ?? '37'}
			viewBox='0 0 37 37'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className='-ml-1'
		>
			<path
				d='M18.5 37V32.8889H32.8889V4.11111H18.5V0H32.8889C34.0194 0 34.9876 0.402204 35.7934 1.20661C36.5978 2.01239 37 2.98056 37 4.11111V32.8889C37 34.0194 36.5978 34.9876 35.7934 35.7934C34.9876 36.5978 34.0194 37 32.8889 37H18.5ZM14.3889 28.7778L11.5625 25.7972L16.8042 20.5556H0V16.4444H16.8042L11.5625 11.2028L14.3889 8.22222L24.6667 18.5L14.3889 28.7778Z'
				className={`${className} fill-current`}
			/>
		</svg>
	);
};

export default LoginIcon;

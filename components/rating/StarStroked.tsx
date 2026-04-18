interface StarProps {
	type: string;
}
const StarStroked = ({ type }: StarProps) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 15.74 15.76'
			className={` ${
				type === 'dynamic'
					? 'w-[3rem] h-[3rem] cursor-pointer'
					: 'w-[20px] h-[20px]'
			}`}
			fill='none'
		>
			<polygon
				strokeLinecap='round'
				strokeLinejoin='round'
				points='7.87 0.42 9.64 6.16 15.37 6.15 10.73 9.69 12.51 15.42 7.87 11.88 3.23 15.42 5.01 9.69 0.37 6.15 6.1 6.16 7.87 0.42'
				strokeMiterlimit={10}
				strokeWidth='0.5'
				stroke='#059669'
			/>
		</svg>
	);
};

export default StarStroked;

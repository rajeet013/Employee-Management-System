const ProductIcon = ({ className, dimension }: IconProps) => {
	return (
		<svg
			viewBox='0 0 24 24'
			version='1.1'
			xmlns='http://www.w3.org/2000/svg'
			stroke='#fff'
			width={dimension ?? '18'}
			height={dimension ?? '18'}
			className={className}
		>
			<g
				fill='none'
				fillRule='evenodd'
				stroke='none'
				strokeWidth='1'
			>
				{' '}
				<g transform='translate(-325.000000, -80.000000)'>
					{' '}
					<g transform='translate(325.000000, 80.000000)'>
						{' '}
						<polygon
							fill='#FFFFFF'
							fillOpacity='0.01'
							fillRule='nonzero'
							points='24 0 0 0 0 24 24 24'
						></polygon>{' '}
						<polygon
							points='22 7 12 2 2 7 2 17 12 22 22 17'
							stroke='#fff'
							strokeLinejoin='round'
							strokeWidth='1.5'
						></polygon>{' '}
						<line
							stroke='#fff'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='1.5'
							x1='2'
							x2='12'
							y1='7'
							y2='12'
						></line>{' '}
						<line
							stroke='#fff'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='1.5'
							x1='12'
							x2='12'
							y1='22'
							y2='12'
						></line>{' '}
						<line
							stroke='#fff'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='1.5'
							x1='22'
							x2='12'
							y1='7'
							y2='12'
						></line>{' '}
						<line
							stroke='#fff'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='1.5'
							x1='17'
							x2='7'
							y1='4.5'
							y2='9.5'
						></line>{' '}
					</g>{' '}
				</g>{' '}
			</g>{' '}
		</svg>
	);
};

export default ProductIcon;

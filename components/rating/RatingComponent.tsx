'use client';

import { Dispatch, SetStateAction, lazy, useRef } from 'react';
const StarFilled = lazy(() => import('./StarFilled'));
const StarStroked = lazy(() => import('./StarStroked'));

interface RatingComponentProps {
	type: string;
	itemState: RatingProps;
	setItemState: Dispatch<SetStateAction<RatingProps>>;
}

const RatingComponent = ({
	type,
	itemState,
	setItemState
}: RatingComponentProps) => {
	const { activeStar } = itemState;
	const ratingContainerRef = useRef<HTMLDivElement>(null);

	const precision = 0.25;
	const totalStars = 5;

	const calculateRating = (e: React.MouseEvent<HTMLDivElement>) => {
		const containerRef = ratingContainerRef.current;

		if (containerRef) {
			const { width, left } = containerRef.getBoundingClientRect();
			const offsetX = e.clientX - left;

			// Define the total width of a single star (including gaps)
			const starWidthWithGap = width / totalStars;

			// Calculate the star index based on the mouse position
			const starIndex = Math.floor(offsetX / starWidthWithGap);

			// Calculate the percentage based on the star index and position within the star
			const percent =
				(offsetX - starIndex * starWidthWithGap) / starWidthWithGap;

			// Calculate the rating based on the totalStars and precision
			const numberInStars = starIndex + percent;
			const nearestNumber =
				Math.round((numberInStars + precision / 2) / precision) *
				precision;

			return Number(
				nearestNumber.toFixed(
					precision.toString().split('.')[1]?.length || 0
				)
			);
		}

		// Handle the case where ratingContainerRef.current is null
		return 0; // or any other default value or handling mechanism
	};

	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (type === 'dynamic') {
			const rating = calculateRating(e);
			setItemState(prev => ({
				...prev,
				activeStar: rating,
				rating: rating
			}));
		}
	};

	return (
		<div
			ref={ratingContainerRef}
			onClick={handleClick}
			className='flex flex-row'
		>
			{Array.from({ length: totalStars }, (_, index) => {
				const activeState = activeStar;

				const showEmptyIcon =
					activeState === -1 || activeState < index + 1;

				const isActiveRating = activeState !== 1;
				const isRatingWithPrecision = activeState % 1 !== 0;
				const isRatingEqualToIndex =
					Math.ceil(activeState) === index + 1;
				const showRatingWithPrecision =
					isActiveRating &&
					isRatingWithPrecision &&
					isRatingEqualToIndex;

				return (
					<div className='relative' key={index}>
						<div
							className='absolute overflow-hidden'
							style={{
								width: showRatingWithPrecision
									? `${(activeState % 1) * 100}%`
									: '0%'
							}}
						>
							<StarFilled {...{ type }} />
						</div>
						<div>
							{showEmptyIcon ? (
								<StarStroked {...{ type }} />
							) : (
								<StarFilled {...{ type }} />
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default RatingComponent;

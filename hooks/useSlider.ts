import { useEffect, useRef, useState } from 'react';

const useSlider = (images: string[]) => {
	const [index, setIndex] = useState(0);
	const [index1, setIndex1] = useState(1);
	const [transitionLeft, setTransitionLeft] = useState(false);
	const [transitionRight, setTransitionRight] = useState(false);
	const [autoSlide, setAutoSlide] = useState(false);

	const slideInterval = 2000; // Change the interval to 7 seconds (7000 milliseconds)
	const slideTimerRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (!autoSlide) {
			setTimeout(() => setAutoSlide(true), 7000);
		}
	}, [autoSlide]);

	useEffect(() => {
		if (transitionRight) {
			setTimeout(() => {
				setTransitionRight(false);
			},
			2000);
		}

		if (transitionLeft) {
			setTimeout(() => {
				setTransitionLeft(false);
				setIndex((index + 1) % images.length);
				setIndex1((index1 + 1) % images.length);
			}, 2000);
		}
	}, [
		transitionLeft,
		transitionRight,
		images?.length,
		index,
		index1
	]);

	const handlePrev = () => {
		setTransitionRight(true);
		setTransitionLeft(false);
		setAutoSlide(false);
		setTimeout(() => setAutoSlide(true), 7000); // Change to 7000 milliseconds (7 seconds)

		const nextIndex = index - 1;
		const nextIndex1 = index1 - 1;

		setIndex(nextIndex < 0 ? images.length - 1 : nextIndex);
		setIndex1(nextIndex1 < 0 ? images.length - 1 : nextIndex1);
	};

	const handleNext = () => {
		setTransitionLeft(true);
		setTransitionRight(false);
		setAutoSlide(false);
		setTimeout(() => setAutoSlide(true), 7000);

		const nextIndex = (index + 1) % images.length;
		const nextIndex1 = (index1 + 1) % images.length;

		setIndex(nextIndex);
		setIndex1(nextIndex1);
	};

	useEffect(() => {
		if (autoSlide) {
			slideTimerRef.current = setInterval(() => {
				setTransitionLeft(true);
				setTransitionRight(false);
			}, slideInterval);
		}

		return () => {
			if (slideTimerRef.current) {
				clearInterval(slideTimerRef.current);
			}
		};
	}, [autoSlide, slideInterval]);

	const handleButton = (ind: number) => {
		setAutoSlide(false);
		if (ind > index) {
			setTransitionRight(false);
			setTransitionLeft(true);
			setIndex(ind);
			setIndex1(ind + 1);
		} else if (ind < index) {
			setTransitionRight(true);
			setTransitionLeft(false);
			setIndex(ind);
			setIndex1((ind + 1) % images.length);
		}

		setAutoSlide(false);
	};

	return {
		index,
		autoSlide,
		transitionLeft,
		transitionRight,
		setAutoSlide,
		handlePrev,
		handleNext,
		handleButton
	};
};

export default useSlider;

export const fadeIn = (
	direction: 'left' | 'right' | 'up' | 'down',
	type: string,
	delay: number,
	duration: number
) => {
	return {
		hidden: {
			x: direction === 'left' ? 80 : direction === 'right' ? -80 : 0,
			y: direction === 'up' ? 80 : direction === 'down' ? -80 : 0,
			opacity: 0.5
		},
		show: {
			x: 0,
			y: 0,
			opacity: 1,
			transition: {
				type,
				delay,
				duration,
				ease: 'easeOut'
			}
		},
		exit: {
			x: direction === 'left' ? -80 : direction === 'right' ? 80 : 0,
			y: direction === 'up' ? -80 : direction === 'down' ? 80 : 0,
			opacity: 0,
			transition: {
				type,
				duration: 0.5,
				ease: 'easeIn'
			}
		}
	};
};

export const staggerContainer = (
	staggerChildren?: number,
	delayChildren?: number
) => {
	return {
		hidden: {},
		show: {
			transition: {
				staggerChildren: staggerChildren,
				delayChildren: delayChildren
			}
		}
	};
};

export const rollInVariants = {
	hidden: {
		x: '-200%',
		opacity: 0,
		rotate: -120,
		scale: 3
	},
	show: {
		x: 0,
		opacity: 1,
		rotate: 0,
		scale: 1,
		transition: {
			type: 'spring',
			duration: 1
		}
	}
};

export const headerVariants = {
	hidden: {
		background: 'rgba(0,0,0,0.05)',
		backdropFilter: 'blur(0.5px)'
	},
	show: {
		background: 'rgba(0,0,0,0.4)',
		backdropFilter: 'blur(3px)',
		transition: {
			type: 'spring'
		}
	}
};

export const navVariants = {
	hidden: {
		clipPath: 'circle(5.8% at 50% 0)',
		opacity: 0,
		transition: {
			type: 'spring',
			delay: 0.2,
			stiffness: 300,
			damping: 140
		}
	},
	show: {
		opacity: 1,
		clipPath: 'circle(130% at 50% 0)',
		transition: {
			type: 'spring',
			stiffness: 80
		}
	}
};

export const svgVariant = {
	hidden: {
		opacity: 0,
		pathLength: 0
	},
	show: {
		opacity: 1,
		pathLength: 1,
		transition: {
			duration: 2,
			ease: 'easeInOut'
		}
	}
};

export const pathVariant = {
	hidden: {
		opacity: 0,
		pathLength: 0
	},
	show: {
		opacity: 1,
		pathLength: 1,
		transition: {
			duration: 1,
			// ease: 'easeInOut',
			type: 'spring'
		}
	}
};

export const navigationVariant = {
	show: {
		transition: { staggerChildren: 1, delayChildren: 1 }
	},
	hidden: {
		transition: { staggerChildren: 0.09, staggerDirection: -1 }
	}
};

export const menuItemVariant = {
	show: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 1,
			ease: [0.6, 0.05, 0.19, 0.9],
			type: 'spring'
		}
	},
	hidden: {
		y: 100,
		opacity: 0,
		transition: {
			duration: 0.4,
			ease: [0.6, 0.05, 0.19, 0.9],
			type: 'spring'
		}
	}
};

export const popVariant = {
	hover: { scale: 1.1 },
	tap: { scale: 0.9 }
};

export const dropIn = {
	hidden: {
		y: '-100vh'
	},
	visible: {
		y: 0,
		transition: {
			duration: 1,
			delay: 1,
			type: 'spring',
			damping: 25,
			stiffness: 500
		}
	},
	exit: {
		y: '100vh'
	}
};

'use client';

import { cn } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';

export interface SelectOption {
	value: string;
	label: string;
}

export interface CustomSelectProps {
	options: SelectOption[];
	value?: string;
	defaultValue?: string;
	onChange?: (value: string) => void;
	error?: boolean;
	placeholder?: string;
	className?: string;
	name?: string; // ✅ add this
}

const Select: React.FC<CustomSelectProps> = ({
	options,
	value,
	defaultValue,
	onChange,
	error,
	placeholder = 'Select an option',
	className,
	name
}) => {
	const [open, setOpen] = useState(false);
	const [internalValue, setInternalValue] = useState(
		defaultValue || ''
	);

	const isControlled = value !== undefined;
	const selectedValue = isControlled ? value : internalValue;
	const selectedLabel =
		options.find(opt => opt.value === selectedValue)?.label ||
		placeholder;

	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () =>
			document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const handleSelect = (val: string) => {
		if (!isControlled) {
			setInternalValue(val);
		}
		onChange?.(val);
		setOpen(false);
	};

	return (
		<div
			ref={containerRef}
			className={cn('relative w-full', className)}
		>
			{name && (
				<input
					type='hidden'
					name={name}
					value={selectedValue}
				/>
			)}
			<button
				type='button'
				className={cn(
					'flex justify-between items-center w-full h-10 rounded-md border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500',
					error
						? 'border-red-500 focus:ring-red-500'
						: 'border-gray-300',
					'appearance-none disabled:cursor-not-allowed disabled:opacity-50'
				)}
				onClick={() => setOpen(prev => !prev)}
			>
				<span className={cn(!selectedValue && 'text-gray-400')}>
					{selectedLabel}
				</span>
				<svg
					className='h-4 w-4 text-gray-600'
					fill='currentColor'
					viewBox='0 0 20 20'
				>
					<path
						fillRule='evenodd'
						d='M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.08 1.04l-4.25 4.65a.75.75 0 01-1.08 0l-4.25-4.65a.75.75 0 01.02-1.06z'
						clipRule='evenodd'
					/>
				</svg>
			</button>

			{open && (
				<div className='absolute z-50 mt-1 w-full rounded-md bg-white shadow-lg border border-gray-200 max-h-60 overflow-auto text-sm'>
					{options.map(option => (
						<div
							key={option.value}
							onClick={() => handleSelect(option.value)}
							className={cn(
								'cursor-pointer px-4 py-2 hover:bg-blue-50',
								option.value === selectedValue &&
									'bg-blue-100 font-medium'
							)}
						>
							{option.label}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Select;

// 'use client';

// import type React from 'react';

// import { cn } from '@/lib/utils';
// import { forwardRef } from 'react';

// export interface SelectOption {
// 	value: string;
// 	label: string;
// }

// export interface SelectProps
// 	extends Omit<
// 		React.SelectHTMLAttributes<HTMLSelectElement>,
// 		'onChange'
// 	> {
// 	options: SelectOption[];
// 	error?: boolean;
// 	onChange?: (value: string) => void;
// }

// const Select = forwardRef<HTMLSelectElement, SelectProps>(
// 	({ className, options, error, onChange, ...props }, ref) => {
// 		const handleChange = (
// 			e: React.ChangeEvent<HTMLSelectElement>
// 		) => {
// 			if (onChange) {
// 				onChange(e.target.value);
// 			}
// 		};

// 		return (
// 			<div className='relative'>
// 				<select
// 					className={cn(
// 						'block w-full max-w-full truncate overflow-hidden h-10 rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none disabled:cursor-not-allowed disabled:opacity-50',
// 						error && 'border-red-500 focus:ring-red-500',
// 						className
// 					)}
// 					onChange={handleChange}
// 					ref={ref}
// 					{...props}
// 				>
// 					{options.map(option => (
// 						<option key={option.value} value={option.value}>
// 							{option.label}
// 						</option>
// 					))}
// 				</select>
// 				<div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
// 					<svg
// 						className='h-4 w-4 fill-current'
// 						xmlns='http://www.w3.org/2000/svg'
// 						viewBox='0 0 20 20'
// 					>
// 						<path
// 							fillRule='evenodd'
// 							d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
// 							clipRule='evenodd'
// 						/>
// 					</svg>
// 				</div>
// 			</div>
// 		);
// 	}
// );

// Select.displayName = 'Select';

// export default Select;

import React, { useState } from 'react';

interface CustomDropdownProps {
	label: string;
	options: string[];
	selected: string;
	onChange: (value: string) => void;
}

const CustomDropdown = ({
	options,
	selected,
	onChange
}: CustomDropdownProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleDropdown = () => setIsOpen(prev => !prev);
	const handleOptionClick = (option: string) => {
		onChange(option);
		setIsOpen(false);
	};

	return (
		<div className='relative w-full sm:w-80'>
			<button
				onClick={toggleDropdown}
				className='px-4 py-2 border border-gray-300 rounded w-full bg-transparent text-left flex items-center justify-between '
			>
				{selected}
				<span className='float-right'>
					<svg
						className={`w-4 h-4 transition-transform ${
							isOpen ? 'rotate-180' : ''
						}`}
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M19 9l-7 7-7-7'
						/>
					</svg>
				</span>
			</button>

			{isOpen && (
				<div className='absolute mt-2 w-full shadow-inner bg-white/50  overflow-hidden backdrop-blur-md  rounded-md  border border-gray-300 border-opacity-30 z-10'>
					{options.map(option => (
						<div
							key={option}
							onClick={() => handleOptionClick(option)}
							className='px-4 py-2 cursor-pointer  hover-emerald  hover:text-white hover:font-semibold '
						>
							{option}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default CustomDropdown;

import { CircleCheck, CircleX, RotateCcw, Send } from 'lucide-react';
import React from 'react';

interface AnimatedProps {
	path?: string;
	text?: string;
	name?: string;
	loading?: boolean;
}

const AnimatedButton = ({
	path,
	text,
	name,
	loading
}: AnimatedProps) => {
	const buttonClass = () => {
		if (name === 'Add') {
			return `font-medium bg-indigo-700 dark:bg-green-800 p-4 px-6 py-3 rounded-full}`;
		}

		if (name === 'Submit') {
			return `w-[15rem] rounded-md px-4 py-2.5 font-bold bg-sky-600 hover:bg-sky-700 text-white
			`;
		}

		if (name === 'Confirm') {
			return `rounded-md px-4 py-1.5 font-bold bg-red-600 mr-5 text-white
			`;
		}

		if (name === 'Cancel') {
			return 'bg-blue-400 rounded-md px-4 py-1.5 font-bold text-white';
		}

		if (name === 'Reset') {
			return `bg-blue-800 py-1.5 rounded-md ${
				path === 'address'
					? 'font-bold px-6'
					: 'font-medium text-sm px-3'
			}`;
		}

		return '';
	};

	const spanClass = () => {
		if (name === 'Confirm') {
			return `${path === 'address' ? 'bg-blue-800' : 'bg-red-700'}`;
		}

		if (name === 'Cancel') {
			return 'bg-indigo-500';
		}

		if (name === 'View' || name === 'PlaceOrder') {
			return 'bg-indigo-900';
		}

		return '';
	};

	const handleIcon = () => {
		if (name === 'Confirm') {
			return <CircleCheck className={`h-6 w-6 text-white`} />;
		}

		if (name === 'Cancel') {
			return <CircleX className='h-6 w-6 text-white' />;
		}

		if (name === 'Reset') {
			return <RotateCcw className='h-5 w-5 text-white' />;
		}

		if (name === 'Submit') {
			return loading ? (
				<Loader />
			) : (
				<Send className='h-7 w-7 text-white' />
			);
		}
	};

	return (
		<button
			className={`group relative inline-flex items-center justify-center overflow-hidden shadow-xl transition text-[13px] ${buttonClass()}`}
			disabled={loading}
		>
			<span
				className={`absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center text-white group-hover:translate-x-0 transition ${spanClass()}`}
			>
				{handleIcon()}
			</span>
			<span className='ease-in-out absolute flex h-full w-full items-center justify-center transition translate-x-0 group-hover:translate-x-full py-2'>
				{loading ? <Loader /> : text}
			</span>
			<span className='invisible relative'>
				{loading ? <Loader /> : text}
			</span>
		</button>
	);
};

export default AnimatedButton;

const Loader = () => (
	<div className='animate-loader-border rounded-full h-7 w-7  border-b-2 border-gray-200 z-0 shadow-xl'></div>
);

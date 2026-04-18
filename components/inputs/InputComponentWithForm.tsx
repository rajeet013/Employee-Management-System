import { lazy } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
const Label = lazy(() => import('./Label'));

interface InputComponentProps {
	type: string;
	name: string;
	title: string;
	placeholder: string;
	classNames?: string;
	peerClassNames?: string;
	register: UseFormRegisterReturn;
	showLabel?: boolean;
}

const InputComponent = ({
	type,
	title,
	name,
	register,
	placeholder,
	classNames,
	peerClassNames,
	showLabel
}: InputComponentProps) => {
	return (
		<div className='relative flex flex-wrap items-center justify-center w-full space-y-1 sm:space-y-0'>
			<input
				type={type}
				autoComplete={name}
				className={`
					appearance-none
					w-full
					px-2
					h-9
					focus:outline-none
					bg-transparent
					transition
					duration-300
					peer
					text-sm
					focus:placeholder-transparent
				text-gray-700
				placeholder:text-gray-700
				autofill:text-gray-700
				 z-40
				 border-b-[2px]
				 border-dashed
				 border-text-link/30
				'
				${classNames}
				`}
				placeholder={placeholder}
				{...register}
			/>
			{showLabel !== false ? (
				<Label {...{ text: title, peerClassNames }} />
			) : null}
		</div>
	);
};

export default InputComponent;

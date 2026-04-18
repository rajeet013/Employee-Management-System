'use client';

import { lazy } from 'react';
const CloseComponent = lazy(() => import('./CloseComponent'));

interface ModalProps {
	children: React.ReactNode;
	handleToggleModal: () => void;
	path?: string;
}

const Modal = ({ children, handleToggleModal, path }: ModalProps) => {
	return (
		<div
			className={`${
				path === 'front'
					? 'absolute rounded-2xl'
					: 'fixed h-screen w-screen'
			} inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md p-5 overflow-auto z-50 cursor-text mx-auto my-auto`}
		>
			<div
				className={`flex items-center justify-center w-full	min-w-fit h-auto`}
			>
				<div
					className={`relative flex flex-col items-center justify-center h-auto border-[1px] bg-sky-100 border-blue-900/30 backdrop-blur-md rounded-lg py-5 px-2 sm:p-5 overflow-y-auto shadow-md z-[5] w-fit

					`}
				>
					<div
						className='absolute right-2 top-6 flex items-center justify-center'
						onClick={handleToggleModal}
					>
						<CloseComponent />
					</div>

					<div className='w-fit h-auto p-1.5 mx-auto my-auto'>
						{children}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;

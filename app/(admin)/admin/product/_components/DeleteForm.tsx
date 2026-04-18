'use client';

import { lazy } from 'react';
const Loader = lazy(() => import('@/components/Loader'));
const AnimatedButton = lazy(
	() => import('@/components/buttons/AnimatedButton')
);

interface DeleteFormProps {
	loading: boolean;
	text?: string;
	handleDelete: () => void;
	formType?: string;
	handleClose: () => void;
}

const DeleteForm = ({
	loading,
	text,
	handleDelete,
	formType,
	handleClose
}: DeleteFormProps) => {
	return (
		<div className='flex w-full flex-col px-6'>
			<div className='text-center text-sm font-semibold'>
				<span className='block text-red-500'>
					Are you sure you want to{' '}
					{formType === 'file' ? 'replace' : 'delete'}
				</span>

				<span className='flex items-center justify-center h-10'>
					{loading ? <Loader /> : `${text}?`}
				</span>
			</div>
			<div className='flex'>
				<div className='w-full'>
					<div className='mt-7 flex w-full justify-center space-x-3'>
						<div className='flex justify-end' role='group'>
							<span onClick={handleDelete}>
								<AnimatedButton
									{...{
										text: `Yes, I'm Sure`,
										name: 'Confirm',
										action: 'Delete',
										path: 'category',
										loading
									}}
								/>
							</span>
							<div onClick={handleClose}>
								<AnimatedButton
									{...{
										text: 'No, Cancel',
										name: 'Cancel',
										path: 'category',
										action: 'Delete',
										loading
									}}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DeleteForm;

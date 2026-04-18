'use client';

import { Upload, X } from 'lucide-react';
import Image from 'next/image';
import { lazy } from 'react';
import { ImageUploadProps, useImageUpload } from './useImageUpload';
const Button = lazy(() => import('@/components/ui/Button'));

const ImageComponent = ({
	onChange,
	value = [],
	onRemove
}: ImageUploadProps) => {
	const {
		isDragging,
		handleDragOver,
		handleDragLeave,
		handleDrop,
		handleButtonClick,
		fileInputRef,
		handleFileChange,
		isUploading,
		handleRemoveExisting,
		previewImages,
		handleRemovePreview
	} = useImageUpload({ onChange, value: [], onRemove });

	return (
		<div className='space-y-4'>
			{/* Add loading indicator to the upload area */}
			<div
				className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
					isDragging
						? 'border-blue-500 bg-blue-50'
						: 'border-gray-300 hover:border-sky-300'
				}`}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
				onClick={handleButtonClick}
			>
				<input
					type='file'
					ref={fileInputRef}
					onChange={handleFileChange}
					accept='image/*'
					multiple
					className='hidden'
				/>
				{isUploading ? (
					<div className='flex flex-col items-center'>
						<div className='h-10 w-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin'></div>
						<p className='mt-2 text-sm text-gray-600'>Uploading...</p>
					</div>
				) : (
					<>
						<Upload className='h-10 w-10 mx-auto text-gray-400' />
						<p className='mt-2 text-sm text-gray-600'>
							Drag and drop images here or click to browse
						</p>
						<p className='text-xs text-gray-500 mt-1'>
							Supported formats: JPEG, PNG, GIF, WebP
						</p>
						<p className='text-xs text-gray-500 mt-1'>
							MAX Upload 20M
						</p>
					</>
				)}
			</div>

			{/* Preview of existing images */}

			{value && value.length > 0 && (
				<div className='grid grid-cols-[repeat(auto-fit,_30.666666%)] justify-center gap-4 mt-4'>
					{value.map(image => (
						<div
							key={image.public_id}
							className='relative group aspect-square rounded-md overflow-hidden border'
						>
							<input
								type='hidden'
								name='existingImageIds'
								value={image.id || image.public_id}
							/>
							<Image
								src={image.image_url || '/placeholder.svg'}
								alt={image.altText || 'Product image'}
								fill
								className='object-cover'
							/>
							<div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
								<Button
									type='button'
									variant='danger'
									size='icon'
									className='h-8 w-8'
									onClick={() =>
										handleRemoveExisting(image.public_id!)
									}
								>
									<X className='h-4 w-4' />
								</Button>
							</div>
						</div>
					))}
				</div>
			)}

			{/* Preview of newly added images */}

			{previewImages.length > 0 && (
				<div className='grid grid-cols-[repeat(auto-fit,_30.666666%)] justify-center gap-4 mt-4'>
					{previewImages.map((image, index) => (
						<div
							key={index}
							className='relative group aspect-square rounded-md overflow-hidden border'
						>
							<Image
								src={image.preview || '/placeholder.svg'}
								alt={`Preview ${index}`}
								fill
								className='object-cover'
							/>
							<div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
								<Button
									type='button'
									variant='danger'
									size='icon'
									className='h-8 w-8'
									onClick={() => handleRemovePreview(index)}
								>
									<X className='h-4 w-4' />
								</Button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default ImageComponent;

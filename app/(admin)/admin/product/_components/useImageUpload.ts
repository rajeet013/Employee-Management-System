import { useCallback, useRef, useState } from 'react';

export interface ImageUploadProps {
	onChange: (files: File[]) => void;
	value?: {
		id?: string;
		public_id: string;
		image_url: string;
		altText?: string;
	}[];
	onRemove?: (id: string) => void;
}

export const useImageUpload = ({
	onChange,
	onRemove
}: ImageUploadProps) => {
	const [isDragging, setIsDragging] = useState(false);
	const [previewImages, setPreviewImages] = useState<
		{ file: File; preview: string }[]
	>([]);
	const fileInputRef = useRef<HTMLInputElement>(null);

	// Add loading state
	const [isUploading, setIsUploading] = useState(false);

	const handleDragOver = useCallback(
		(e: React.DragEvent<HTMLDivElement>) => {
			e.preventDefault();
			e.stopPropagation();
			setIsDragging(true);
		},
		[]
	);

	const handleDragLeave = useCallback(
		(e: React.DragEvent<HTMLDivElement>) => {
			e.preventDefault();
			e.stopPropagation();
			setIsDragging(false);
		},
		[]
	);

	// Update the handleFiles function to show loading state
	const handleFiles = useCallback(
		(files: File[]) => {
			if (files && files.length > 0) {
				setIsUploading(true);

				const newPreviews = files.map(file => ({
					file,
					preview: URL.createObjectURL(file)
				}));

				setPreviewImages(prev => [...prev, ...newPreviews]);
				onChange(files);

				setIsUploading(false);
			}
		},
		[onChange]
	);

	const handleDrop = useCallback(
		(e: React.DragEvent<HTMLDivElement>) => {
			e.preventDefault();
			e.stopPropagation();
			setIsDragging(false);

			if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
				const files = Array.from(e.dataTransfer.files).filter(file =>
					file.type.startsWith('image/')
				);

				handleFiles(files);
				e.dataTransfer.clearData();
			}
		},
		[handleFiles]
	);

	const handleFileChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			if (e.target.files && e.target.files.length > 0) {
				const files = Array.from(e.target.files).filter(file =>
					file.type.startsWith('image/')
				);
				handleFiles(files);

				// Reset the input value so the same file can be selected again
				e.target.value = '';
			}
		},
		[handleFiles]
	);

	const handleRemovePreview = useCallback((index: number) => {
		setPreviewImages(prev => {
			const newPreviews = [...prev];
			// Revoke the object URL to avoid memory leaks
			URL.revokeObjectURL(newPreviews[index].preview);
			newPreviews.splice(index, 1);
			return newPreviews;
		});
	}, []);

	const handleRemoveExisting = useCallback(
		(id: string) => {
			if (onRemove) {
				onRemove(id);
			}
		},
		[onRemove]
	);

	const handleButtonClick = useCallback(() => {
		fileInputRef.current?.click();
	}, []);

	return {
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
	};
};

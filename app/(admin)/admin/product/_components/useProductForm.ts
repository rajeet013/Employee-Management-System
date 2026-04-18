import { deleteImageAction } from '@/actions/image-action';
import {
	createProduct,
	updateProduct
} from '@/actions/product-action';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { toast } from 'react-toastify';

export type ProductStatus = 'ACTIVE' | 'HIDDEN' | 'DISCONTINUED';
export type ProductType = 'READY' | 'CUSTOM';

export interface ProductImage {
	id: string;
	public_id: string;
	image_url: string;
	altText?: string;
}

export interface Category {
	id: string;
	name: string;
}

export interface ProductFormInitialData {
	id: string;
	name: string;
	slug?: string;
	featured: boolean;
	description?: string;
	price: number;
	productType: ProductType;
	status: ProductStatus;
	inStock: boolean;
	inventory?: number;
	categoryId: string;
	ProductImage?: ProductImage[];
}

export type ProductFormErrors = Partial<Record<string, string>>;

export interface ProductFormValues {
	name: string;
	slug: string;
	description: string;
	price: number;
	inventory: number;
	categoryId: string;
	productType: ProductType;
	status: ProductStatus;
	featured: boolean;
	inStock: boolean;
	images: File[];
}

export const useProductForm = ({
	initialData,
	categories
}: {
	initialData?: ProductFormInitialData;
	categories: Category[];
}) => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const [form, setForm] = useState({
		name: initialData?.name || '',

		price: initialData?.price || '',
		inventory: initialData?.inventory || '',
		description: initialData?.description || '',
		categoryId: initialData?.categoryId || categories[0]?.id || '',
		productType: initialData?.productType || 'CUSTOM',
		status: initialData?.status || 'ACTIVE',
		featured: initialData?.featured ?? false,
		inStock: initialData?.inStock ?? true
	});

	const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
	const [existingImages, setExistingImages] = useState<
		ProductImage[]
	>(initialData?.ProductImage || []);
	const [errors, setErrors] = useState<ProductFormErrors>({});

	const handleImageChange = (files: File[]) => {
		setUploadedFiles(prev => [...prev, ...files]);
	};

	const handleRemoveExistingImage = async (public_id: string) => {
		console.log(`debug: public_id =>`, public_id);
		const result = await deleteImageAction(public_id);
		if (result) {
			setExistingImages(prev =>
				prev.filter(img => img.public_id !== public_id)
			);
		} else {
			console.warn('Image could not be deleted');
		}
	};

	const validate = (): boolean => {
		const newErrors: ProductFormErrors = {};

		if (!form.name.trim()) newErrors.name = 'Name is required';
		if (!form.price || Number(form.price) <= 0)
			newErrors.price = 'Price must be greater than 0';
		if (!form.categoryId)
			newErrors.categoryId = 'Category is required';
		if (!form.description.trim())
			newErrors.description = 'Description is required';
		if (uploadedFiles.length === 0 && existingImages.length === 0) {
			newErrors.ProductImage = 'At least one image is required';
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return false;
		}

		setErrors({});
		return true;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!validate()) return;

		const payload: ProductFormValues = {
			...form,
			price: Number(form.price),
			inventory: Number(form.inventory),
			slug: form.name.toLowerCase().replace(/\s+/g, '-'),
			images: uploadedFiles
		};

		const existingImageIds = existingImages.map(img => img.id);

		startTransition(async () => {
			const result = initialData
				? await updateProduct(
						initialData.id,
						payload,
						uploadedFiles,
						existingImageIds
				  )
				: await createProduct(payload, uploadedFiles);

			if (result?.success === 'true') {
				toast.success(result.message || 'Product saved successfully');
				setTimeout(() => router.push('/admin/product'), 1000);
			} else {
				const newErrors: ProductFormErrors = {};

				if (result?.errors && Array.isArray(result.errors)) {
					for (const issue of result.errors) {
						if (issue.path?.[0]) {
							newErrors[issue.path[0]] = issue.message;
						}
					}
				}

				if (result?.message) {
					newErrors.form = result.message;
				}

				setErrors(newErrors);
				toast.error(result?.message || 'Failed to save product');
			}
		});
	};

	const inputFields = [
		{
			id: 'name',
			label: 'Product Name',
			type: 'text',
			required: true,
			value: form.name,
			onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
				setForm(prev => ({ ...prev, name: e.target.value }))
		},
		{
			id: 'price',
			label: 'Price',
			type: 'text',
			required: true,
			value: form.price,
			onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
				setForm(prev => ({
					...prev,
					price: e.target.value
				}))
		},
		{
			id: 'inventory',
			label: 'Inventory',
			type: 'text',
			required: true,
			value: form.inventory,
			onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
				setForm(prev => ({
					...prev,
					inventory: e.target.value
				}))
		}
	];

	const selectFields = [
		{
			id: 'categoryId',
			label: 'Category',
			value: form.categoryId,
			onChange: (val: string) =>
				setForm(prev => ({ ...prev, categoryId: val })),
			options: categories.map(c => ({ value: c.id, label: c.name }))
		},
		{
			id: 'productType',
			label: 'Product Type',
			value: form.productType,
			onChange: (val: string) =>
				setForm(prev => ({
					...prev,
					productType: val as ProductType
				})),
			options: [
				{ value: 'READY', label: 'Ready' },
				{ value: 'CUSTOM', label: 'Custom' }
			]
		},
		{
			id: 'status',
			label: 'Status',
			value: form.status,
			onChange: (val: string) =>
				setForm(prev => ({
					...prev,
					ProductStatus: val as ProductStatus
				})),
			options: [
				{ value: 'ACTIVE', label: 'Active' },
				{ value: 'HIDDEN', label: 'Hidden' },
				{ value: 'DISCONTINUED', label: 'Discontinued' }
			]
		}
	];

	const checkboxFields = [
		{
			id: 'featured',
			label: 'Featured Product',
			checked: form.featured,
			onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
				setForm(prev => ({ ...prev, featured: e.target.checked }))
		},
		{
			id: 'inStock',
			label: 'In Stock',
			checked: form.inStock,
			onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
				setForm(prev => ({ ...prev, inStock: e.target.checked }))
		}
	];

	return {
		form,
		setForm,
		errors,
		uploadedFiles,
		existingImages,
		handleImageChange,
		handleRemoveExistingImage,
		handleSubmit,
		isPending,
		categories,
		inputFields,
		selectFields,
		checkboxFields,
		fieldErrors: errors,
		state: errors.form
			? { success: 'false', message: errors.form }
			: { success: 'true' },
		router
	};
};

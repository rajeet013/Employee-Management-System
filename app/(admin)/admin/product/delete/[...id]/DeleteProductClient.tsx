'use client';

import { deleteProduct } from '@/actions/product-action';
import { Product } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { lazy, useState } from 'react';
import { toast } from 'react-toastify';
const Modal = lazy(() => import('@/components/modal/Modal'));
const DeleteForm = lazy(() => import('../../_components/DeleteForm'));

interface DeleteProductClientProps {
	product: Product | undefined;
}

const DeleteProductClient = ({
	product
}: DeleteProductClientProps) => {
	const [loading, setLoading] = useState<boolean>(false);
	const router = useRouter();

	const handleDelete = async () => {
		if (!product?.id) return;
		const result = await deleteProduct(product.id);

		try {
			if (result.success) {
				toast.success(result.message);
			} else {
				toast.error(result.error);
			}
		} catch (error) {
			toast.error(`Something went wrong.
				Please, try again later`);
			console.warn(error);
		} finally {
			setLoading(false);
			router.push('/admin/product');
		}
	};

	const handleToggleModal = () => {
		router.replace('/admin/product');
	};

	return (
		<Modal
			{...{
				handleToggleModal
			}}
		>
			<DeleteForm
				{...{
					loading,
					text: product?.name,
					handleDelete: () => handleDelete(),
					handleClose: handleToggleModal
				}}
			/>
		</Modal>
	);
};

export default DeleteProductClient;

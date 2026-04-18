import prisma from '@/prisma/prisma';
import React from 'react';
import DeleteProductClient from './DeleteProductClient';

const DeleteProductServer = async (props: {
	params: Promise<{ id: string }>;
}) => {
	const params = await props.params;
	const { id } = params;

	const product = await prisma.product.findUnique({
		where: {
			id: String(id)
		}
	});
	return <DeleteProductClient {...{ product: product! }} />;
};

export default DeleteProductServer;

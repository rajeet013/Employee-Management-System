import { getProductsAction } from '@/actions/product-action';
import { getServerData } from '@/lib/get-server-data';
import React, { lazy } from 'react';
import { productColumns } from '../../_components/table-columns/product-columns';
const ProductTableBody = lazy(
	() => import('../../_components/table-bodies/ProductTableBody')
);
const CommonClient = lazy(
	() => import('../../_components/CommonClient')
);

const AdminProductServer = async (
	props: ServerComponentProps<SearchParams>
) => {
	const { query, data, totalItems } = await getServerData({
		fetchData: getProductsAction,
		props
	});

	return (
		<CommonClient
			{...{
				query,
				initialData: data,
				totalItems: totalItems,
				mainRoute: '/admin/product',
				columns: productColumns,
				fetchData: getProductsAction,
				headingText: 'Products',
				buttonText: 'Product',
				searchBoxText: 'Find Product',
				showCreate: true,
				showSearch: true,
				createLink: '/admin/product/create',
				TableBody: ProductTableBody
			}}
		/>
	);
};

export default AdminProductServer;

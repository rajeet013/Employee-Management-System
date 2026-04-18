'use client';

import { ProductWithCategoryName } from '@/types/types';
import { formatDateString } from '@/utils/format-date-string';
import { lazy } from 'react';
const CrudActions = lazy(() => import('../table/CrudActions'));
const TableCell = lazy(() => import('../table/TableCell'));

interface ProductTableBodyProps {
	tableData: ProductWithCategoryName[] | undefined;
}

const ProductTableBody = ({ tableData }: ProductTableBodyProps) => {
	return (
		<>
			<tbody>
				{tableData && tableData.length > 0 ? (
					tableData.map((item, index) => (
						<tr
							key={item.id}
							className='border border-sky-200 border-l-0 border-r-0 border-b-0 hover:bg-sky-50 shadow odd:bg-slate-100/90'
						>
							<TableCell {...{ text: index + 1 }} />
							<TableCell {...{ text: item.name }} />
							<TableCell {...{ text: item.category?.name }} />
							<TableCell>
								<span>{Number(item.price)}</span>
							</TableCell>
							<TableCell>
								<span
									className={`inline-block rounded-full px-2 py-1 text-xs uppercase font-semibold ${
										item.featured
											? 'bg-green-200 text-lime-700'
											: 'bg-red-200 text-red-700'
									}`}
								>
									{item.featured ? 'TRUE' : 'FALSE'}
								</span>
							</TableCell>
							<TableCell {...{ text: item.description }} />
							<TableCell>
								<span className='inline-block rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-lime-700'>
									{item.productType}
								</span>
							</TableCell>
							<TableCell>
								<span
									className={`inline-block px-2 py-1 text-xs font-semibold rounded-full text-white
									${
										item.status === 'ACTIVE'
											? 'bg-green-400'
											: item.status === 'HIDDEN'
											? 'bg-yellow-600'
											: 'bg-red-400'
									}`}
								>
									{item.status}
								</span>
							</TableCell>
							<TableCell>
								<span
									className={`inline-block px-2 py-1 text-xs font-semibold rounded-full text-white
									${item.inStock ? 'bg-emerald-500' : 'bg-rose-500'}`}
								>
									{item.inStock ? 'TRUE' : 'FALSE'}
								</span>
							</TableCell>
							<TableCell>
								<span>{item.inventory}</span>
							</TableCell>
							<TableCell>
								{formatDateString(item?.createdAt.toString())}
							</TableCell>
							<TableCell>
								{formatDateString(item?.updatedAt.toString())}
							</TableCell>
							<TableCell>
								<CrudActions
									{...{
										slug: item?.slug,
										id: item?.id,
										link: '/admin/product',
										route: '/admin/product',
										showView: true,
										showBarcode: false
									}}
								/>
							</TableCell>
						</tr>
					))
				) : (
					<tr className='border border-sky-200 border-r border-l-0 border-t-0 border-b-0'>
						<td
							colSpan={12}
							className='text-center py-4 text-red-700 text-xl font-semibold'
						>
							No data found
						</td>
					</tr>
				)}
			</tbody>
		</>
	);
};

export default ProductTableBody;

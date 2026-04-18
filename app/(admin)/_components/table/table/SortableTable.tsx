import { lazy } from 'react';
const SortIcon = lazy(() => import('./SortIcon'));

interface SortableTableProps<T extends object> {
	columns: { key: keyof T; text: string }[];
	children: React.ReactNode;
	handleSort: (key: keyof T) => void;
	sortKey: keyof T;
	sortOrder: 'asc' | 'desc';
}

const SortableTable = <T extends object>({
	columns,
	children,
	handleSort,
	sortKey,
	sortOrder
}: SortableTableProps<T>) => {
	return (
		<div className='overflow-auto w-full h-auto rounded-md border  border-lime-200 border-r-0 text-sm'>
			<table className={`w-full text-center`}>
				<thead className='border-b font-medium  border-lime-20 bg-black-200'>
					<tr>
						{/* <TableHead text='SL' /> */}
						{columns.map(item => (
							<th
								key={String(item.key)}
								className={`border-r px-3 py-4 border-lime-200 whitespace-nowrap
									${item.key === 'image' ? 'cursor-text' : 'cursor-pointer'}`}
								onClick={() =>
									item.key !== 'image' ? handleSort(item.key) : null
								}
							>
								{item.text}
								{item.key !== 'image' && sortKey === item.key && (
									<SortIcon sortOrder={sortOrder} />
								)}
							</th>
						))}
						<TableHead text='Actions' />
					</tr>
				</thead>
				{children}
			</table>
		</div>
	);
};

export default SortableTable;

interface TableHeadProps {
	children?: React.ReactNode;
	text?: string;
}

const TableHead = ({ children, text }: TableHeadProps) => {
	return (
		<th className='border-r px-2 py-4 border-lime-200'>
			{text ?? children}
		</th>
	);
};

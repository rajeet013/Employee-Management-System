import { useTable, useTableControls } from '@/hooks/useTable';
import {
	ArrowUpDown,
	ChevronDown,
	ChevronUp,
	Search
} from 'lucide-react';
import React from 'react';

const Table = <T extends Record<string, unknown>>({
	data,
	columns,
	searchPlaceholder = 'Search...',
	emptyMessage = 'No data available'
}: TableProps<T>) => {
	const { searchTerm, setSearchTerm, sortConfig, handleSort } =
		useTableControls<T>();

	const { filteredAndSortedData } = useTable<T>({
		data,
		searchTerm,
		sortConfig
	});

	const getSortIcon = (column: Column<T>) => {
		if (!column.sortable) return null;
		if (sortConfig.key !== column.accessor) {
			return <ArrowUpDown className='w-4 h-4 ml-1' />;
		}
		return sortConfig.direction === 'asc' ? (
			<ChevronUp className='w-4 h-4 ml-1' />
		) : (
			<ChevronDown className='w-4 h-4 ml-1' />
		);
	};

	return (
		<div className='w-full'>
			{/* Search Bar */}
			<div className='mb-4 relative'>
				<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
					<Search className='h-5 w-5 text-gray-400' />
				</div>
				<input
					type='text'
					className='block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-card text-card-foreground placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none  sm:text-sm'
					placeholder={searchPlaceholder}
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
				/>
			</div>

			{/* Table */}
			<div className='overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700'>
				<table className='min-w-full divide-y divide-gray-200 dark:divide-gray-700'>
					<thead className='bg-gray-50 dark:bg-gray-800'>
						<tr>
							{columns.map((column, index) => (
								<th
									key={index}
									className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider ${
										column.sortable
											? 'cursor-pointer select-none'
											: ''
									}`}
									onClick={() =>
										handleSort(
											column.accessor,
											column.sortable || false
										)
									}
								>
									<div className='flex items-center'>
										{column.header}
										{column.sortable && getSortIcon(column)}
									</div>
								</th>
							))}
						</tr>
					</thead>
					<tbody className='bg-card divide-y divide-gray-200 dark:divide-gray-700'>
						{filteredAndSortedData.length > 0 ? (
							filteredAndSortedData.map((item, rowIndex) => (
								<tr
									key={rowIndex}
									className='hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-150'
								>
									{columns.map((column, colIndex) => (
										<td
											key={colIndex}
											className='px-6 py-4 whitespace-nowrap text-sm text-card-foreground'
										>
											{column.render
												? column.render(item[column.accessor], item)
												: String(item[column.accessor])}
										</td>
									))}
								</tr>
							))
						) : (
							<tr>
								<td
									colSpan={columns.length}
									className='px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400'
								>
									{emptyMessage}
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Table;

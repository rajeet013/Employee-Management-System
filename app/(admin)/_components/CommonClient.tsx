'use client';
import { useQuery } from '@/hooks/useQuery';
import { useTableData } from '@/hooks/useTableData';
import { lazy } from 'react';
const SortableTable = lazy(
	() => import('./table/table/SortableTable')
);
const AdminWrapper = lazy(() => import('./AdminWrapper'));

interface CommonClientProps<T extends object> {
	query: string;
	initialData: T[] | undefined;
	totalItems: number;
	mainRoute: string;
	columns: { key: keyof T; text: string }[];
	fetchData: (args: { query: string; page: number }) => Promise<
		| {
				data: T[];
				totalItems: number;
		  }
		| undefined
	>;
	headingText: string;
	buttonText: string;
	searchBoxText: string;
	showCreate: boolean;
	showSearch: boolean;
	createLink: string;
	TableBody: React.ComponentType<{
		tableData: T[];
		totalItems: number;
	}>;
}

const CommonClient = <T extends object>({
	query,
	initialData,
	totalItems,
	mainRoute,
	columns,
	fetchData,
	headingText,
	buttonText,
	searchBoxText,
	showCreate,
	showSearch,
	createLink,
	TableBody
}: CommonClientProps<T>) => {
	const {
		itemState: { searchText },
		setItemState,
		handleSearch,
		inputValue,
		dataArray,
		handleLoadMore,
		handleSort,
		sortKey,
		sortOrder,
		sortedData,
		memoizedSortedData
	} = useTableData({
		query,
		initialData,
		totalItems,
		columns,
		fetchData
	});

	useQuery<T>({
		route: mainRoute,
		searchText,
		initialData: initialData || [],
		setItemState
	});

	return (
		<AdminWrapper
			{...{
				heading: headingText,
				buttonText: buttonText,
				inputValue,
				searchText,
				handleSearch,
				searchBoxText: searchBoxText,
				showCreate,
				showSearch,
				totalItems,
				currentItems: dataArray?.length || 0,
				initialState: initialData,
				handleLoadMore,
				link: createLink
			}}
		>
			{dataArray && totalItems > 0 ? (
				<SortableTable<T>
					{...{
						data: dataArray || [],
						columns,
						handleSort,
						sortKey,
						sortOrder,
						sortedData
					}}
				>
					<TableBody
						{...{
							tableData: memoizedSortedData,
							totalItems
						}}
					/>
				</SortableTable>
			) : (
				<p className='font-bold text-5xl text-red-600'>
					{`No ${headingText} in Database`}
				</p>
			)}
		</AdminWrapper>
	);
};

export default CommonClient;

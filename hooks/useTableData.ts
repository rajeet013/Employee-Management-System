import { useMemo, useState } from 'react';
import useHandleSearch from './useHandleSearch';
import useSorting from './useSorting';

export const useTableData = <T extends object>({
	query,
	initialData,
	totalItems,
	columns,
	fetchData
}: UseTableDataProps<T>) => {
	const [itemState, setItemState] = useState({
		data: initialData,
		filteredData: initialData,
		page: 1,
		searchText: ''
	});

	const { searchText, page, data, filteredData } = itemState;

	const { handleSearch, inputValue } = useHandleSearch({
		setItemState
	});

	const dataArray = searchText ? data : filteredData;

	const handleLoadMore = async () => {
		const next = page + 1;
		const response = await fetchData({ query, page: next });

		const newItems = response?.data;

		if (!newItems) return;

		if (totalItems === dataArray?.length) return;

		if (newItems.length) {
			setItemState(prev => ({
				...prev,
				page: next,
				filteredData: [...(prev.filteredData || []), ...newItems]
			}));
		}
	};

	const { handleSort, sortKey, sortOrder, sortedData } =
		useSorting<T>({
			data: dataArray || [],
			columns
		});

	const memoizedSortedData = useMemo(
		() => sortedData(),
		[sortedData]
	);

	return {
		itemState,
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
	};
};

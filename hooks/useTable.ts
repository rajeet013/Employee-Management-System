'use client';

import { useMemo, useState } from 'react';

interface UseTableProps<T> {
	data: T[];
	searchTerm: string;
	sortConfig: {
		key: keyof T | null;
		direction: SortDirection;
	};
}

export const useTable = <T extends Record<string, any>>({
	data,
	searchTerm,
	sortConfig
}: UseTableProps<T>) => {
	const filteredAndSortedData = useMemo(() => {
		let processed = [...data];

		// Filter
		if (searchTerm) {
			processed = processed.filter(item =>
				Object.values(item).some(value =>
					String(value)
						.toLowerCase()
						.includes(searchTerm.toLowerCase())
				)
			);
		}

		// Sort
		if (sortConfig.key && sortConfig.direction) {
			processed.sort((a, b) => {
				const aValue = a[sortConfig.key as keyof T];
				const bValue = b[sortConfig.key as keyof T];

				if (aValue === bValue) return 0;

				const comparison = aValue < bValue ? -1 : 1;
				return sortConfig.direction === 'asc'
					? comparison
					: -comparison;
			});
		}

		return processed;
	}, [data, searchTerm, sortConfig]);

	return {
		filteredAndSortedData
	};
};

export const useTableControls = <T>() => {
	const [searchTerm, setSearchTerm] = useState('');
	const [sortConfig, setSortConfig] = useState<{
		key: keyof T | null;
		direction: SortDirection;
	}>({
		key: null,
		direction: null
	});

	const handleSort = (accessor: keyof T, sortable: boolean) => {
		if (!sortable) return;

		setSortConfig(current => {
			if (current.key === accessor) {
				if (current.direction === 'asc') {
					return { key: accessor, direction: 'desc' };
				}
				if (current.direction === 'desc') {
					return { key: null, direction: null };
				}
			}
			return { key: accessor, direction: 'asc' };
		});
	};

	return {
		searchTerm,
		setSearchTerm,
		sortConfig,
		handleSort
	};
};

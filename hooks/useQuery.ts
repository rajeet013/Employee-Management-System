import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface UseQueryHookProps<T> {
	route: string;
	searchText: string;
	initialData: T[]; // Specify that initialData is an array of type T
	setItemState: SetItemStateFunction<T>;
}

export const useQuery = <T extends object>({
	route,
	searchText,
	initialData,
	setItemState
}: UseQueryHookProps<T>) => {
	const router = useRouter();

	useEffect(() => {
		const timeout = setTimeout(() => {
			router.push(
				`${route}${searchText ? `?search=${searchText}` : ''}`
			);

			if (searchText) {
				setItemState((prev: any) => ({
					...prev,
					data: initialData
				}));
			}
		}, 500); // Wait 500ms after last keystroke

		return () => clearTimeout(timeout);
	}, [searchText]);
};

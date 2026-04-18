interface GetServerDataProps<T> {
	fetchData: (args: { query: string; page?: number }) => Promise<
		| {
				data: T[];
				totalItems: number;
		  }
		| undefined
	>;
	props: ServerComponentProps<SearchParams>;
}

export const getServerData = async <T>({
	fetchData,
	props
}: GetServerDataProps<T>) => {
	const searchParams = await props.searchParams;
	const query =
		searchParams?.search?.toString().toLowerCase() ||
		searchParams?.category?.toString().toLowerCase() ||
		'';

	// Fetch the data using the provided fetchData function
	const data = await fetchData({ query });

	// Return the query and fetched data
	return {
		query,
		data: data?.data || [],
		totalItems: data?.totalItems || 0
	};
};

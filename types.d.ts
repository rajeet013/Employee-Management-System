declare namespace React {
	function lazy<T extends ComponentType<any>>(
		factory: () => Promise<{ default: T }>
	): T;
}

interface IconProps {
	className?: string;
	dimension?: string;
}

interface RatingProps {
	activeStar: number;
	loading: boolean;
	reviewId: string;
	productId: string;
	name: string;
	userId: string;
	rating: number;
	comment: string;
	reviewExists: boolean;
}

interface iPageProps {
	params: Promise<{
		id: string;
		slug: string;
	}>;
	searchParams: Promise<{
		[key: string]: string | string[] | undefined;
	}>;
}

type SortDirection = 'asc' | 'desc' | null;

interface Column<T> {
	header: string;
	accessor: keyof T;
	sortable?: boolean;
	render?: (value: any, item: T) => React.ReactNode;
}

interface TableProps<T> {
	data: T[];
	columns: Column<T>[];
	searchPlaceholder?: string;
	emptyMessage?: string;
}

interface UseTableDataProps<T extends object> {
	query: string;
	initialData: T[] | undefined;
	totalItems: number;
	columns: { key: keyof T; text: string }[];
	fetchData: (args: { query: string; page: number }) => Promise<
		| {
				data: T[];
				totalItems: number;
		  }
		| undefined
	>;
}
interface GetServerQuery {
	query: string;
	page?: number;
}

interface ServerProps<T> {
	params: Promise<T>;
}

interface ServerComponentProps<T = Record<string, unknown>> {
	searchParams: Promise<T>;
}

type SearchParams = {
	[key: string]: string | string[] | undefined;
};

type SetItemStateFunctionSearch<T> = React.Dispatch<
	React.SetStateAction<T>
>;

interface ItemState<T> {
	data: T[] | undefined;
	filteredData: T[] | undefined;
	page: number;
	searchText: string;
}

type SetItemStateFunction<T> = React.Dispatch<
	React.SetStateAction<ItemState<T>>
>;

interface ProductViewProps {
	product: {
		id: string;
		name: string;
		slug: string;
		featured: boolean;
		description: string | null;
		price: number;
		productType: 'READY' | 'CUSTOM';
		status: 'ACTIVE' | 'HIDDEN' | 'DISCONTINUED';
		inStock: boolean;
		inventory: number | null;
		categoryId: string;
		category: {
			name: string | null;
		} | null;
		ProductImage: {
			id: string;
			image_url: string;
			altText: string | null;
		}[];
		createdAt: Date;
		updatedAt: Date;
	};
}

type UploadedImage = {
	public_id: string;
	image_url: string;
	altText: string;
};

interface ProductFormErrors {
  name?: string;
  price?: string;
  categoryId?: string;
  ProductImage?: string;
  form?: string;
  description?: string; // ✅ Add this line
}

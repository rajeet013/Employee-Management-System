import { Category, Prisma, Product } from '@prisma/client';

export type ProductWithCategoryName = Product & {
	category: {
		name: string | null;
	} | null;
};

export type ProductWithRelations = Prisma.ProductGetPayload<{
	include: { category: true; ProductImage: true };
}>;

export interface ProductFormProps {
	initialData?: {
		id: string;
		name: string;
		slug?: string;
		featured: boolean;
		description?: string;
		price: number;
		productType: 'READY' | 'CUSTOM';
		status: 'ACTIVE' | 'HIDDEN' | 'DISCONTINUED';
		inStock: boolean;
		inventory?: number;
		categoryId: string;
		ProductImage?: {
			id: string;
			public_id: string;
			image_url: string;
			altText?: string;
		}[];
	};
	categories: Category[];
}

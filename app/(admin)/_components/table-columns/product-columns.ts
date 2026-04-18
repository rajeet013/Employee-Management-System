import { Product } from '@prisma/client';

export const productColumns: {
	key: keyof Product;
	text: string;
}[] = [
	{
		key: 'id',
		text: 'SL'
	},
	{
		key: 'name',
		text: 'Name'
	},
	{
		key: 'categoryId',
		text: 'Category'
	},
	{
		key: 'price',
		text: 'Price'
	},
	{
		key: 'featured',
		text: 'Featured'
	},
	{
		key: 'description',
		text: 'Description'
	},
	{
		key: 'productType',
		text: 'Product Type'
	},
	{
		key: 'status',
		text: 'Product Status'
	},
	{
		key: 'inStock',
		text: 'In Stock'
	},
	{
		key: 'inventory',
		text: 'Stock Count'
	},

	{
		key: 'createdAt',
		text: 'Date Created'
	},
	{
		key: 'updatedAt',
		text: 'Date Updated'
	}
];

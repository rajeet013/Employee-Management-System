const SingleProductPage = lazy(
	() => import('@/components/SingleProductPage')
);

import { artDecorProducts } from '@/data/products';
import { Metadata } from 'next';
import { lazy } from 'react';
export const metadata: Metadata = {
	title: 'Artwork & Home Decor'
};

const Page = async ({ params }: iPageProps) => {
	const resolvedSlug = await params;
	const slug = resolvedSlug.slug[0];

	return (
		<SingleProductPage {...{ slug, productList: artDecorProducts }} />
	);
};

export default Page;

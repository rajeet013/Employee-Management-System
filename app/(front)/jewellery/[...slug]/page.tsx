const SingleProductPage = lazy(
	() => import('@/components/SingleProductPage')
);
import { jewelryProducts } from '@/data/products';
import { Metadata } from 'next';
import { lazy } from 'react';

export const metadata: Metadata = {
	title: 'Jewelry'
};

const Page = async ({ params }: iPageProps) => {
	const resolvedSlug = await params;
	const slug = resolvedSlug.slug[0];

	return (
		<SingleProductPage {...{ slug, productList: jewelryProducts }} />
	);
};

export default Page;

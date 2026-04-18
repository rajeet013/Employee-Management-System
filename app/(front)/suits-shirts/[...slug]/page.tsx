const SingleProductPage = lazy(
	() => import('@/components/SingleProductPage')
);
import { suitProducts } from '@/data/products';
import { Metadata } from 'next';
import { lazy } from 'react';
export const metadata: Metadata = {
	title: 'Suits & Shirts'
};
const Page = async ({ params }: iPageProps) => {
	const resolvedSlug = await params;
	const slug = resolvedSlug.slug[0];

	return (
		<SingleProductPage {...{ slug, productList: suitProducts }} />
	);
};

export default Page;

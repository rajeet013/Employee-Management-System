import prisma from '@/prisma/prisma';
import { notFound } from 'next/navigation';
import ProductView from './_components/ProductView';

const ProductPage = async (props: {
	params: Promise<{ slug: string }>;
}) => {
	const params = await props.params;
	const { slug } = params;

	const product = await prisma.product.findUnique({
		where: { slug: String(slug) },
		include: {
			category: {
				select: {
					name: true
				}
			},
			ProductImage: true
		}
	});

	if (!product) notFound();

	return (
		<div className='min-h-screen bg-gray-50'>
			<ProductView {...{ product }} />
		</div>
	);
};

export default ProductPage;

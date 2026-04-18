'use client';

import {
	ArrowLeft,
	CheckCircle,
	Clock,
	Edit,
	Package,
	Star,
	Tag,
	XCircle
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { lazy, useState } from 'react';
const Button = lazy(() => import('@/components/ui/Button'));

const ProductView = ({ product }: ProductViewProps) => {
	const router = useRouter();
	const [selectedImage, setSelectedImage] = useState(
		product?.ProductImage[0]?.image_url || ''
	);

	const formatDate = (date: Date) => {
		return new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	};

	const getStatusBadgeClass = (status: string) => {
		switch (status) {
			case 'ACTIVE':
				return 'bg-green-100 text-green-800';
			case 'HIDDEN':
				return 'bg-yellow-100 text-yellow-800';
			case 'DISCONTINUED':
				return 'bg-red-100 text-red-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	};

	return (
		<div className='container mx-auto py-8 px-4'>
			{/* Back button and edit button */}
			<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6'>
				<button
					onClick={() => router.back()}
					className='flex items-center text-gray-600 hover:text-sky-600 transition-colors mb-4 sm:mb-0'
				>
					<ArrowLeft className='h-4 w-4 mr-2' />
					Back to Products
				</button>
				<Link href={`/admin/product/edit/${product.id}`}>
					<Button
						variant='outline'
						className='border-sky-500 text-sky-600 hover:bg-sky-50'
					>
						<Edit className='h-4 w-4 mr-2' />
						Edit Product
					</Button>
				</Link>
			</div>

			{/* Product details */}
			<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
				{/* Product images */}
				<div className='space-y-4'>
					<div className='relative aspect-square rounded-lg overflow-hidden border border-gray-200'>
						{selectedImage ? (
							<Image
								src={selectedImage || '/placeholder.svg'}
								alt={product.name}
								fill
								priority
								sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
								className='object-cover'
							/>
						) : (
							<div className='w-full h-full flex items-center justify-center bg-gray-100'>
								<p className='text-gray-500'>No image available</p>
							</div>
						)}
					</div>

					{/* Thumbnail gallery */}
					{product.ProductImage.length > 1 && (
						<div className='grid grid-cols-[repeat(auto-fit,_12.666666%)] justify-center gap-2'>
							{product.ProductImage.map(image => (
								<div
									key={image.id}
									className={`relative aspect-square rounded-md overflow-hidden border cursor-pointer ${
										selectedImage === image.image_url
											? 'border-sky-200 ring-2 ring-sky-300'
											: 'border-gray-200 hover:border-sky-300'
									}`}
									onClick={() => setSelectedImage(image.image_url)}
								>
									<Image
										src={image.image_url || '/placeholder.svg'}
										alt={image.altText || product.name}
										fill
										sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
										className='object-cover'
									/>
								</div>
							))}
						</div>
					)}
				</div>

				{/* Product info */}
				<div className='space-y-6'>
					<div>
						<div className='flex items-center space-x-2 mb-2'>
							<span
								className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(
									product.status
								)}`}
							>
								{product.status}
							</span>
							{product.featured && (
								<span className='px-2 py-1 rounded-full text-xs bg-sky-100 text-sky-800 flex items-center'>
									<Star className='h-3 w-3 mr-1' />
									Featured
								</span>
							)}
							<span className='px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800'>
								{product.productType}
							</span>
						</div>
						<h1 className='text-3xl font-bold text-gray-900'>
							{product.name}
						</h1>
						<div className='flex items-center mt-2'>
							<Tag className='h-4 w-4 text-gray-500 mr-2' />
							<span className='text-gray-600'>
								{product?.category && product?.category.name}
							</span>
						</div>
					</div>

					<div className='border-t border-b border-gray-200 py-4'>
						<div className='flex items-center justify-between'>
							<span className='text-3xl font-bold text-gray-900'>
								${product.price.toFixed(2)}
							</span>
							<span
								className={`px-3 py-1 rounded-full text-sm ${
									product.inStock
										? 'bg-green-100 text-green-800'
										: 'bg-red-100 text-red-800'
								}`}
							>
								{product.inStock ? (
									<div className='flex items-center'>
										<CheckCircle className='h-4 w-4 mr-1' />
										In Stock
									</div>
								) : (
									<div className='flex items-center'>
										<XCircle className='h-4 w-4 mr-1' />
										Out of Stock
									</div>
								)}
							</span>
						</div>
						{product.inventory !== null && product?.inventory > 0 && (
							<p className='text-sm text-gray-500 mt-1'>
								{product.inventory}{' '}
								{product.inventory === 1 ? 'unit' : 'units'} available
							</p>
						)}
					</div>

					{product.description && (
						<div>
							<h2 className='text-lg font-semibold mb-2'>
								Description
							</h2>
							<p className='text-gray-700 whitespace-pre-line'>
								{product.description}
							</p>
						</div>
					)}

					{/* <div className='space-y-4'>
						<Button
							className='w-full bg-sky-600 hover:bg-sky-700 text-white'
							disabled={!product.inStock}
						>
							<ShoppingCart className='h-4 w-4 mr-2' />
							{product.inStock ? 'Add to Cart' : 'Out of Stock'}
						</Button>
					</div> */}

					<div className='border-t border-gray-200 pt-4 space-y-3'>
						<div className='flex items-start'>
							<Clock className='h-5 w-5 text-gray-500 mr-3 mt-0.5' />
							<div>
								<p className='text-sm font-medium text-gray-700'>
									Last Updated
								</p>
								<p className='text-sm text-gray-500'>
									{formatDate(product.updatedAt)}
								</p>
							</div>
						</div>
						<div className='flex items-start'>
							<Package className='h-5 w-5 text-gray-500 mr-3 mt-0.5' />
							<div>
								<p className='text-sm font-medium text-gray-700'>
									Product ID
								</p>
								<p className='text-sm text-gray-500'>{product.id}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductView;

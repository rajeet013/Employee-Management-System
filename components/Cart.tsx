import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { lazy } from 'react';
const ArrowRightIcon = lazy(() => import('./svgs/ArrowRightIcon'));

interface CartProps {
	showCart: boolean;
	toggleCart: () => void;
}

const Cart = ({ toggleCart, showCart }: CartProps) => {
	const { cartItems, removeFromCart, clearCart, addToCart } =
		useCart();

	const totalPrice = cartItems.reduce(
		(total, item) => total + item.price * item.quantity,
		0
	);
	const totalQuantity = cartItems.reduce(
		(total, item) => total + item.quantity,
		0
	);

	const handleQuantityChange = (
		itemId: string,
		type: 'increment' | 'decrement'
	) => {
		const existingItem = cartItems.find(item => item.id === itemId);
		if (!existingItem) return;

		if (type === 'increment') {
			addToCart({ ...existingItem, quantity: 1 });
		} else {
			if (existingItem.quantity > 1) {
				addToCart({ ...existingItem, quantity: -1 });
			} else {
				removeFromCart(itemId);
			}
		}
	};

	return (
		<div
			className={`fixed right-0 top-0 h-screen w-full max-w-lg z-50 p-5 md:p-10 bg-white shadow-lg overflow-y-auto no-scrollbar transition-all duration-200
		${showCart ? 'translate-x-0' : 'translate-x-full'}
		`}
		>
			<div className='flex justify-between items-center mb-5'>
				<h2 className='text-xl font-bold mb-4'>
					Your Cart
					<span className='text-red-500 text-base ml-2 '>
						({totalQuantity} items)
					</span>
				</h2>
				<div onClick={toggleCart}>
					<ArrowRightIcon className='text-black hover:text-red-500' />
				</div>
			</div>
			{cartItems.length === 0 ? (
				<p className='text-lg text-center text-gray-500'>
					Your cart is empty.
				</p>
			) : (
				<>
					<div className='space-y-4'>
						{cartItems.map(item => (
							<div
								key={item.id}
								className='flex items-center space-x-4 '
							>
								<Image
									src={item.image}
									alt={item.title}
									width={80}
									height={80}
									className='bg-gray-200 p-2 rounded-lg'
								/>
								<div className='flex flex-col w-full space-y-2'>
									<div className='flex item-center justify-between'>
										<p className='font-semibold'>{item.title}</p>
										<p>${(item.price * item.quantity).toFixed(2)}</p>
									</div>
									<div className='flex items-center justify-between'>
										<div className='flex items-center space-x-6 border w-fit'>
											<button
												className='w-12 h-10 flex items-center justify-center border-r text-2xl  text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition duration-200'
												onClick={() =>
													handleQuantityChange(item.id, 'decrement')
												}
											>
												−
											</button>
											<span className='text-xl  text-gray-800 '>
												{item.quantity}
											</span>
											<button
												className='w-12 h-10 flex items-center justify-center border-l text-2xl  text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition duration-200'
												onClick={() =>
													handleQuantityChange(item.id, 'increment')
												}
											>
												+
											</button>
										</div>
										<button
											onClick={() => removeFromCart(item.id)}
											className='hover:bg-red-500 hover:text-white w-5 h-5 flex items-center justify-center rounded-full border border-black hover:border-none'
										>
											<p className='text-2xl rotate-45'> + </p>
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
					<div className='flex flex-col items-end mt-4'>
						<button
							onClick={clearCart}
							className='text-red-500 font-semibold text-sm'
						>
							Clear Cart
						</button>
					</div>
					<div className='mt-4 border-t pt-4'>
						<p className='text-lg font-semibold'>
							Subtotal: ${totalPrice.toFixed(2)}
						</p>
						<Link href='/checkout'>
							<button className='w-full rounded-full text-lg lg:text-xl tracking-wide bg-[var(--primary-emerald)] text-white px-4 py-2 mt-5'>
								Pay With Stripe
							</button>
						</Link>
					</div>
				</>
			)}
		</div>
	);
};

export default Cart;

'use client';

import { useCart } from '@/context/CartContext';
import { useLogout } from '@/hooks/useLogout';
import { User } from '@prisma/client';
import { LogIn, LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { lazy, useState } from 'react';
const BagIcon = lazy(() => import('../svgs/BagIcon'));
const Cart = lazy(() => import('../Cart'));
const Image = lazy(() => import('next/image'));
const Link = lazy(() => import('next/link'));

interface NavbarProps {
	isAdmin: boolean;
	user: User | null;
}

const nav = [
	{ id: '1', label: 'Jewellery ', link: '/jewellery' },
	{ id: '2', label: 'Suits & Shirts', link: '/suits-shirts' },
	{ id: '3', label: 'Shoes', link: '/shoes' },
	{ id: '4', label: 'Artwork & Home Decor', link: '/art-decor' }
];

const Navbar = ({ isAdmin, user }: NavbarProps) => {
	const [showCart, setShowCart] = useState(false);
	const [showMobileMenu, setShowMobileMenu] = useState(false);
	const { cartItems } = useCart();
	const { handleLogout } = useLogout();

	const pathname = usePathname();

	const cartCount = cartItems.reduce(
		(total, item) => total + item.quantity,
		0
	);

	const toggleCart = () => setShowCart(prev => !prev);

	return (
		<>
			{/* Main Navbar */}
			<div className='sticky top-0 z-50 bg-white/60 backdrop-blur-md shadow flex justify-between items-center py-3 px-4 md:px-6 xl:px-10'>
				{/* Logo */}
				<div className='flex items-center'>
					<Link href='/' className='relative w-[5rem] h-12'>
						<Image
							src='/svgs/ariimpex_logo.svg'
							alt='logo'
							fill
							sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
						/>
					</Link>
				</div>

				{/* Desktop Nav */}
				<div className='hidden md:flex items-center text-sm space-x-6 font-semibold text-black/80'>
					{nav.map(item => (
						<Link
							key={item.id}
							href={item.link}
							className={`${
								pathname === item.link
									? 'text-black underline underline-offset-5 border-black'
									: 'text-black/70'
							}  transition-colors duration-200`}
						>
							{item.label}
						</Link>
					))}
					{isAdmin && <Link href='/admin/dashboard'>Admin</Link>}
				</div>

				{/* Right Section */}
				<div className='flex items-center gap-x-3'>
					{user ? (
						<button onClick={handleLogout} className='cursor-pointer'>
							<LogOut />
						</button>
					) : (
						<Link href='/auth/sign-in'>
							<LogIn />
						</Link>
					)}

					<button
						onClick={toggleCart}
						className='relative pr-2 group'
					>
						<BagIcon className='text-black' dimension={'24'} />

						<span className='absolute -top-1 left-3 flex items-center justify-center bg-red-500 rounded-full w-5 h-5 text-xs text-white font-semibold'>
							{cartCount}
						</span>
					</button>

					{/* Hamburger Menu (Mobile Only) */}
					<button
						className='md:hidden ml-2'
						onClick={() => setShowMobileMenu(prev => !prev)}
					>
						<svg
							width='24'
							height='24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
							className='text-black'
						>
							<path d='M4 6h16M4 12h16M4 18h16' />
						</svg>
					</button>
				</div>
			</div>

			{/* Cart Component */}
			<Cart {...{ showCart, toggleCart }} />

			{/* Mobile Nav */}
			<div
				className={`fixed top-[4rem] md:hidden w-full h-screen bg-white p-5 shadow-md z-50 transition-all duration-200 ${
					showMobileMenu ? ' right-0' : 'right-[50rem]'
				} `}
			>
				<div className='flex flex-col justify-center gap-y-4 font-medium pt-20 px-10'>
					{nav.map(item => (
						<Link
							key={item.id}
							href={item.link}
							className={`${
								pathname === item.link
									? 'text-black underline underline-offset-5 border-black'
									: 'text-black/70'
							}  transition-colors duration-200`}
							onClick={() => setShowMobileMenu(false)}
						>
							{item.label}
						</Link>
					))}
					{isAdmin && (
						<Link
							href='/admin'
							onClick={() => setShowMobileMenu(false)}
						>
							Admin
						</Link>
					)}
				</div>
			</div>
		</>
	);
};

export default Navbar;

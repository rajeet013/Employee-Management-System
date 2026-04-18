const Footer = lazy(() => import('@/components/footer/Footer'));
const NavServer = lazy(() => import('@/components/nav/NavServer'));
import { CartProvider } from '@/context/CartContext';
import { lazy } from 'react';

const FrontLayout = async ({
	children
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<CartProvider>
			<div className='flex flex-col min-h-screen'>
				<NavServer />
				<main className='flex-grow'>{children}</main>
				<Footer />
			</div>
		</CartProvider>
	);
};

export default FrontLayout;

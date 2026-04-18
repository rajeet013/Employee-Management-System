import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import './globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin']
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin']
});

export const metadata: Metadata = {
	metadataBase: new URL('https://ariimpex.com'),
	title: {
		default: 'Ariimpex',
		template: `%s - Ariimpex`
	},
	description:
		'Ariimpex is a custom fashion and decor platform offering handcrafted jewelry, tailored suits & shirts, bespoke shoes, and curated art & home decor. Discover timeless style through innovation and tradition.',
	generator: 'Next.js',
	applicationName: 'Ariimpex Website',
	referrer: 'origin-when-cross-origin',
	creator: 'Joy Ahmed team of Zettabyte Technology Incorporation',
	keywords: [
		'custom fashion',
		'handcrafted jewelry',
		'tailored suits',
		'bespoke shoes',
		'home decor',
		'Ariimpex',
		'custom ecommerce'
	],
	publisher: 'Ariimpex',	icons: {
		icon: '/favicon.ico'
	},
	robots: {
		index: true,
		follow: true,
		nocache: true,
		googleBot: {
			index: true,
			follow: true,
			noimageindex: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1
		}
	},

	openGraph: {
		title: {
			default: 'Ariimpex',
			template: `%s - Ariimpex`
		},
		description:
			'Discover timeless, handcrafted jewelry, bespoke fashion, and curated home decor. Where tradition meets innovation.',
		url: 'https://ariimpex.com',
		siteName: 'Ariimpex',
		images: {
			url: '/opengraph-image.png',
			width: 400,
			height: 300
		},
		type: 'website'
	}
};

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				{children}
				<ToastContainer />
			</body>
		</html>
	);
}

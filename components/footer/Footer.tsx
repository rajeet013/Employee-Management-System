'use client';

import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import Link from 'next/link';

const categoryLinks = [
	{ label: 'Custom Jewelry', href: '/jewelry' },
	{ label: 'Custom Shoes', href: '/shoes' },
	{ label: 'Art & Home Decor', href: '/art-decor' },
	{ label: 'Custom Suits & Shirts', href: '/suits-shirts' }
];

const companyLinks = [
	{ label: 'About Us', href: '/about' },
	{ label: 'Contact', href: '/contact' },
	{ label: 'Accessibility', href: '/legal/accessibility' }
];

const policyLinks = [
	{ label: 'Privacy Policy', href: '/legal/privacy-policy' },
	{ label: 'Terms & Conditions', href: '/legal/terms-conditions' }
];

const socialLinks = [
	{ href: 'https://facebook.com', icon: Facebook },
	{ href: 'https://instagram.com', icon: Instagram },
	{ href: 'https://x.com', icon: Twitter },
	{ href: 'https://youtube.com', icon: Youtube }
];

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className='w-full px-6 md:px-12 xl:px-24 mt-16 pt-10 pb-8 bg-zinc-100 text-neutral-800 border-t border-gray-300'>
			<div className='text-center mb-10'>
				<h2 className='text-xl font-semibold'>
					Tradition Meets Innovation
				</h2>
				<p className='text-sm text-neutral-600'>
					Timeless Craftsmanship. Modern Design.
				</p>
			</div>

			<div className='grid md:grid-cols-4 gap-8 border-t border-gray-300 pt-10'>
				<div>
					<h3 className='font-semibold mb-4'>Explore</h3>
					{categoryLinks.map(link => (
						<Link
							key={link.href}
							href={link.href}
							className='block text-sm hover:text-emerald-600'
						>
							{link.label}
						</Link>
					))}
				</div>

				<div>
					<h3 className='font-semibold mb-4'>Company</h3>
					{companyLinks.map(link => (
						<Link
							key={link.href}
							href={link.href}
							className='block text-sm hover:text-emerald-600'
						>
							{link.label}
						</Link>
					))}
				</div>

				<div>
					<h3 className='font-semibold mb-4'>Legal</h3>
					{policyLinks.map(link => (
						<Link
							key={link.href}
							href={link.href}
							className='block text-sm hover:text-emerald-600'
						>
							{link.label}
						</Link>
					))}
				</div>

				<div>
					<h3 className='font-semibold mb-4'>Contact</h3>
					<p className='text-sm mb-1'>
						Email:{' '}
						<a
							href='mailto:ariimpex07@gmail.com'
							className='hover:text-emerald-600'
						>
							ariimpex07@gmail.com
						</a>
					</p>
					<p className='text-sm mb-1'>
						Phone:{' '}
						<a
							href='tel:+66816013676'
							className='hover:text-emerald-600'
						>
							+66816013676
						</a>
					</p>
					<p className='text-sm mb-1'>Hours: Mon–Fri, 9AM–6PM</p>
					<p className='text-sm mb-4'>Location: Bangkok, Thailand</p>

					<div className='flex space-x-4'>
						{socialLinks.map(({ href, icon: Icon }) => (
							<Link
								key={href}
								href={href}
								target='_blank'
								className='hover:text-emerald-600'
							>
								<Icon size={20} />
							</Link>
						))}
					</div>
				</div>
			</div>

			<div className='text-center text-sm text-neutral-600 border-t border-gray-300 mt-10 pt-4'>
				<div>&copy; {currentYear} ARIIMPEX. All rights reserved.</div>
				<div>
					Developed & Designed by{' '}
					<Link
						href='https://zettabyteincorp.com'
						className='hover:underline'
						target='_blank'
					>
						ZettaByte Technology Incorporation
					</Link>
					.
				</div>
			</div>
		</footer>
	);
};

export default Footer;

// 'use client';
// import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
// import Link from 'next/link';

// const navLinks = [
// 	{ label: 'Custom Shoes', href: '/shoes' },
// 	{ label: 'Custom Jewelry', href: '/jewelry' },
// 	{ label: 'Art Work & Home Decor', href: '/art-decor' },
// 	{ label: 'Custom Fitted Suits & Shirts', href: '/suits-shirts' }
// ];

// const policyLinks = [
// 	{ label: 'Privacy Policy', href: '/legal/privacy-policy' },
// 	{ label: 'Terms & Conditions', href: '/legal/terms-conditions' },
// 	{ label: 'Accessibility', href: '/legal/accessibility' }
// ];

// const socialLinks = [
// 	{ href: 'https://facebook.com', icon: Facebook },
// 	{ href: 'https://instagram.com', icon: Instagram },
// 	{ href: 'https://x.com', icon: Twitter },
// 	{ href: 'https://youtube.com', icon: Youtube }
// ];

// const Footer = () => {
// 	const currentYear = new Date().getFullYear();
// 	return (
// 		<footer className='w-full px-6 md:px-12 xl:px-24 pt-10 pb-6'>
// 			<div className='flex flex-col md:flex-row justify-between gap-10 border-t border-gray-700 pt-10'>
// 				{[navLinks, policyLinks].map((group, i) => (
// 					<div key={i} className='flex flex-col space-y-3'>
// 						{group.map(({ label, href }) => (
// 							<Link
// 								key={href}
// 								href={href}
// 								className='hover:text-emerald-600'
// 							>
// 								{label}
// 							</Link>
// 						))}
// 					</div>
// 				))}
// 				<div className='flex flex-col space-y-2'>
// 					<a
// 						href='mailto:ariimpex07@gmail.com'
// 						className='hover:text-emerald-600'
// 					>
// 						ariimpex07@gmail.com
// 					</a>
// 					<a
// 						href='tel:+66816013676'
// 						className='hover:text-emerald-600'
// 					>
// 						+66816013676
// 					</a>
// 					<div className='flex space-x-6 mt-2'>
// 						{socialLinks.map(({ href, icon: Icon }) => (
// 							<Link
// 								key={href}
// 								href={href}
// 								target='_blank'
// 								className='hover:text-emerald-600'
// 							>
// 								<Icon size={20} />
// 							</Link>
// 						))}
// 					</div>
// 				</div>
// 			</div>
// 			<div className='text-center text-primary-foreground/70 text-sm space-y-2 border-t border-gray-700 pt-4 mt-10'>
// 				<div className='lg:text-center'>
// 					{' '}
// 					&copy; {currentYear} Ariimpex. All rights reserved.
// 				</div>
// 				<div>
// 					Developed & Designed By:{' '}
// 					<Link
// 						href='https://zettabyteincorp.com'
// 						className='hover:underline'
// 						target='_blank'
// 					>
// 						ZettaByte Technology Incorporation.
// 					</Link>
// 				</div>
// 			</div>
// 		</footer>
// 	);
// };

// export default Footer;

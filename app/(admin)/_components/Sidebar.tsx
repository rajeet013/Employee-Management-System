'use client';

const DashboardIcon = lazy(
    () => import('@/components/icons/DashboardIcon')
);
const HomeIcon = lazy(() => import('@/components/icons/HomeIcon'));
import ProductIcon from '@/components/icons/ProductIcon';
import { useLogout } from '@/hooks/useLogout';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { lazy } from 'react';
const SideBarIcon = lazy(() => import('./SideBarIcon'));

const Sidebar = () => {
    const navigation = [
        {
            text: 'Home',
            href: '/',
            // UPDATED: Added text-lime-primary to the icons
            icon: <HomeIcon {...{ className: 'text-lime-primary', dimension: '29' }} />
        },
        {
            text: 'Dashboard',
            href: '/admin/dashboard',
            icon: <DashboardIcon {...{ className: 'text-lime-primary', dimension: '26' }} />
        },
        {
            text: 'Product',
            href: '/admin/product',
            icon: <ProductIcon {...{ className: 'text-lime-primary', dimension: '19' }} />
        }
    ];

    const { handleLogout } = useLogout();

    return (
        <div
            // UPDATED: Changed bg-slate-200 to bg-zinc-900 and updated shadow to lime
            className={`fixed left-0 top-0 flex flex-col items-center justify-center w-[3.5rem] h-screen text-white shadow-2xl bg-zinc-900 shadow-lime-primary/20 z-50`}
        >
            {navigation.map((item, index) => (
                <Link href={item.href} key={index}>
                    <SideBarIcon
                        {...{
                            icon: item.icon,
                            text: item.text,
                            href: item.href
                        }}
                    />
                </Link>
            ))}
            <button
                // UPDATED: Changed bg-sky-500 to bg-lime-primary and hover to text-black
                className='absolute bottom-10 flex items-center justify-center rounded-full bg-lime-primary hover:bg-lime-hover h-9 w-9 cursor-pointer text-black'
                onClick={handleLogout}
            >
                <LogOut className='w-4 h-4' />
            </button>
        </div>
    );
};

export default Sidebar;
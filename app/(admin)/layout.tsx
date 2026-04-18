import { getUserInfo } from '@/actions/session-action';
import { redirect } from 'next/navigation';
import Sidebar from './_components/Sidebar';

const AdminLayout = async ({
	children
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const userInfo = await getUserInfo();
	const { isAdmin = false } = userInfo ?? {};

	if (!isAdmin) redirect('/auth/sign-in');

	return (
		<div className='flex flex-col min-h-screen'>
			<Sidebar />
			<main className='flex-grow ml-[3.5rem]'>{children}</main>
		</div>
	);
};

export default AdminLayout;

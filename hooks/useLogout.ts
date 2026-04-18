import { logoutAction } from '@/actions/auth-action';

export const useLogout = () => {
	const handleLogout = async () => {
		await logoutAction();
	};

	return { handleLogout };
};

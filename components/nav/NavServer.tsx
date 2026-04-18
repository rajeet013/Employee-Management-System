import { getUserInfo } from '@/actions/session-action';
import React, { lazy } from 'react';
const Navbar = lazy(() => import('./Navbar'));

const NavServer = async () => {
	const userInfo = await getUserInfo();
	const { isAdmin = false, user = null } = userInfo ?? {};

	return <Navbar {...{ isAdmin, user }} />;
};

export default NavServer;

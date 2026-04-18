'use server';

import prisma from '@/prisma/prisma';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

interface JwtPayload {
	user: {
		email: string;
		id?: string;
		role?: string;
		[key: string]: any;
	};
	exp?: number;
	iat?: number;
}

export const getUserInfo = async () => {
	const cookieStore = cookies();
	const cookie = (await cookieStore).get('ARIIMPEX_SESSION');

	if (!cookie) return null;

	try {
		const secretKey = new TextEncoder().encode(
			process.env.JWT_SECRET_KEY
		);
		const { payload } = (await jwtVerify(
			cookie.value,
			secretKey
		)) as { payload: JwtPayload };


		const { user: cookieUser } = payload;

		const user = await prisma.user.findUnique({
			where: {
				email: cookieUser?.email
			}
		});

		let isAdmin = false;

		if (user?.role === 'SUPERADMIN' || user?.role === 'ADMIN') {
			isAdmin = true;
		}

		return { isAdmin: isAdmin, user };
	} catch (err: any) {
		console.error('Invalid or expired token:', err);
		return { isAdmin: false, user: null };
	}
};

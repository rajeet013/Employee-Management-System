'use server';

import * as z from 'zod';

import { LoginSchema } from '@/zod-schemas/auth';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { getUserByEmail } from './user-actions';

export const loginAction = async (
	values: z.infer<typeof LoginSchema>
) => {
	try {
		const validatedFields = LoginSchema.safeParse(values);

		if (!validatedFields.success) {
			return { error: 'Invalid fields!' };
		}

		const { email, password } = validatedFields.data;

		const user = await getUserByEmail(email);

		if (!user || !user.email || !user.password) {
			return { error: 'Email does not exist!' };
		}

		const passwordMatches = await bcrypt.compare(
			password,
			user.password
		);

		if (!passwordMatches) {
			return { error: 'Incorrect password!' };
		}
		const ARIIMPEX_SESSION = {
			LOGIN_APPROVED: true,
			user
		};

		const token = jwt.sign(
			ARIIMPEX_SESSION,
			process.env.JWT_SECRET_KEY!,
			{ expiresIn: '7d' }
		);

		(await cookies()).set('ARIIMPEX_SESSION', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV !== 'development',
			sameSite: 'strict',
			maxAge: 3600 * 3
		});

		return {
			success: true,
			message: `Login successful ${user?.firstName}!`
		};
	} catch (error: any) {
		return error;
	}
};

export const logoutAction = async () => {
	try {
		const cookieStore = await cookies();
		const token = '';

		cookieStore.set('ARIIMPEX_SESSION', token, {
			maxAge: -1
		});

		return { success: true, message: 'Successfully Signed Out!' };
	} catch (error: any) {
		return error;
	}
};

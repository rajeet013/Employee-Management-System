'use client';
import { loginAction } from '@/actions/auth-action';
import { LoginSchema } from '@/zod-schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
//import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { lazy } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import type { z } from 'zod';
const InputComponent = lazy(
	() => import('@/components/inputs/InputComponentWithForm')
);

type LoginFormData = z.infer<typeof LoginSchema>;

const SignInForm = () => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm<LoginFormData>({
		resolver: zodResolver(LoginSchema)
	});

	const onSubmit = async (data: LoginFormData) => {
		const result = await loginAction(data);

		if (result.success) {
			toast.success(result.message);
			router.push('/admin/dashboard');
		}

		console.log(`debug: result =>`, result);
	};

	const formItems = [
		{
			type: 'email',
			name: 'email',
			title: 'Email',
			placeholder: 'Enter your email'
		},
		{
			type: 'password',
			name: 'password',
			title: 'Password',
			placeholder: 'Enter your password'
		}
	];

	return (
		<div className='flex flex-col items-center justify-center mx-auto my-auto h-screen w-screen bg-gray-100'>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='flex flex-col space-y-10 min-w-sm w-auto rounded-md p-7 shadow-lg'
			>
				<h1 className='text-lg font-bold text-center'>
					Login to Ariimpex
				</h1>
				{formItems.map(item => (
					<div key={item.name} className='w-full'>
						<InputComponent
							{...item}
							register={register(item.name as keyof LoginFormData)}
						/>
						{errors[item.name as keyof LoginFormData]?.message && (
							<p className='text-red-500 text-xs mt-1'>
								{String(
									errors[item.name as keyof LoginFormData]?.message
								)}
							</p>
						)}
					</div>
				))}
				<button
					type='submit'
					disabled={isSubmitting}
					className='w-full bg-sky-500 hover:bg-sky-600 py-2 rounded text-white font-bold cursor-pointer'
				>
					{isSubmitting ? 'Signing In...' : 'Sign In'}
				</button>
			</form>
		</div>
	);
};

export default SignInForm;

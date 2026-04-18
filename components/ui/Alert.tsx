import { cn } from '@/lib/utils';
import type React from 'react';
import { forwardRef } from 'react';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?: 'default' | 'destructive' | 'success';
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(
	({ className, variant = 'default', ...props }, ref) => {
		const variantStyles = {
			default: 'bg-blue-50 text-blue-800 border-blue-200',
			destructive: 'bg-red-50 text-red-800 border-red-200',
			success: 'bg-green-50 text-green-800 border-green-200'
		};

		return (
			<div
				ref={ref}
				role='alert'
				className={cn(
					'relative w-full flex items-start gap-2 rounded-lg border p-4',
					variantStyles[variant],
					className
				)}
				{...props}
			/>
		);
	}
);
Alert.displayName = 'Alert';

export default Alert;

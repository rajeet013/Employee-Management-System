import { cn } from '@/lib/utils';
import type React from 'react';
import { forwardRef } from 'react';

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>;

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
	({ className, ...props }, ref) => {
		return (
			<div className='relative flex items-start'>
				<div className='flex h-10 items-center'>
					<input
						type='checkbox'
						className={cn(
							'h-6 w-6 rounded border-gray-300 text-blue-600 focus:ring-blue-500',
							className
						)}
						ref={ref}
						{...props}
					/>
				</div>
			</div>
		);
	}
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
export type { CheckboxProps }; 

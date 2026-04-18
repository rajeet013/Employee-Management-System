import { usePathname } from 'next/navigation';
import type { JSX } from "react";

interface IconProps {
	href: string;
	icon: JSX.Element;
	text: string;
	item?: string;
}

const SideBarIcon = ({
	href,
	icon,
	item,
	text = 'tooltip 💡'
}: IconProps) => {
	const path = usePathname();

	return (
		<div
			className={`relative mx-auto my-2 flex h-9 w-9 cursor-pointer items-center justify-center bg-lime-500 hover:bg-lime-700 shadow-2xl transition-all duration-300 ease-linear
			${
				item !== 'floating'
					? 'rounded-3xl hover:rounded-xl bg-button-bg/50 hover:bg-button-bg/70'
					: ''
			}
			hover:text-white sm:h-9 sm:w-9 group ${
				path === href &&
				'bg-button-bg/80 text-white/90 hover:button-bg/90'
			}`}
		>
			{icon}
			<span
				className={`absolute z-[5] m-2 w-auto min-w-max  scale-0 opacity-0 rounded-md bg-sky-700 backdrop-blur-sm p-2 text-xs font-bold text-white/90 shadow-md transition-all duration-300 dark:shadow-sm  group-hover:scale-100 group-hover:opacity-100 group-hover:translate-x-0 ${
					item === 'floating'
						? 'right-16 translate-x-16 origin-right button-bg'
						: 'left-16 -translate-x-16 origin-left bg-button-bg/90'
				}`}
			>
				{text}
			</span>
		</div>
	);
};

export default SideBarIcon;

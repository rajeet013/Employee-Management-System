// import DropdownIcon from '@/components/icons/DropdownIcon';

import DropdownIcon from '@/components/icons/DropdownIcon';

interface SortProp {
	sortOrder: string;
}

const SortIcon = ({ sortOrder }: SortProp) => {
	return (
		<span
			className={`ml-2 inline-block w-4
    ${
			sortOrder === 'asc'
				? 'rotate-0 animation-300'
				: 'rotate-180 animation-300'
		}
    `}
		>
			<DropdownIcon className='text-black' />
		</span>
	);
};

export default SortIcon;

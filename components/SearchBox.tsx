import { Search } from 'lucide-react';
import { ChangeEvent, lazy } from 'react';
const Label = lazy(() => import('./inputs/Label'));

interface SearchBoxProps {
	inputValue: string;
	handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
	text: string;
}

const SearchBox = ({
	inputValue,
	handleSearch,
	text
}: SearchBoxProps) => {
	return (
		<div className='relative w-full h-full'>
			<input
				type='text'
				value={inputValue}
				onChange={handleSearch}
				placeholder={text}
				className={`w-full px-2 focus:outline-none bg-transparent peer text-sm focus:placeholder-transparent shadow-md
				z-50 h-11 borderborder-white/90 rounded-md placeholder:text-lime-700
				`}
			/>
			<Search
				size={20}
				className={`absolute right-2 top-3 peer-focus:opacity-0 transition-all duration-300 ease-in-out text-lime-700
				}`}
			/>
			<Label
				{...{
					text: text,
					peerClassName: 'peer-focus:text-lime-500 '
				}}
			/>
		</div>
	);
};

export default SearchBox;

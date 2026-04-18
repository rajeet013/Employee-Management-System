
import {
	ChangeEvent,
	useState,
	useTransition
} from 'react';

interface HandleSearchProps<T> {
	setItemState: SetItemStateFunctionSearch<T>;
}

const useHandleSearch = <T extends object>({
	setItemState
}: HandleSearchProps<T>) => {

	const [isPending, startTransition] = useTransition();
	const [inputValue, setInputValue] = useState('');
	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setInputValue(value);
		startTransition(() => {
			setItemState(prev => ({
				...prev,
				searchText: value
			}));
		});
	};

	return { handleSearch, inputValue, isPending };
};

export default useHandleSearch;

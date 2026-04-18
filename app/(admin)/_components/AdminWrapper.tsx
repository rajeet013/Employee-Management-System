'use client';

const CreateButton = lazy(
	() => import('@/components/buttons/CreateButton')
);
const Loader = lazy(() => import('@/components/Loader'));
const SearchBox = lazy(() => import('@/components/SearchBox'));
import { ChangeEvent, lazy, Suspense } from 'react';

interface AdminWrapperProps {
	children: React.ReactNode;
	heading: string;
	buttonText: string;
	inputValue: string;
	searchText: string;
	handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
	searchBoxText: string;
	showCreate: boolean;
	showSearch?: boolean;
	handleLoadMore: () => Promise<void>;
	link: string;
	totalItems: number;
	currentItems: number;
}

const AdminWrapper = ({
	children,
	heading,
	buttonText,
	inputValue,
	searchText,
	handleSearch,
	searchBoxText,
	showCreate,
	showSearch,
	handleLoadMore,
	link,
	totalItems,
	currentItems
}: AdminWrapperProps) => {
	return (
		<div className='flex w-[calc(100vw-3.5rem)] h-screen overflow-hidden overflow-y-auto'>
			<div className='flex flex-col items-center justify-center w-full h-full px-4 min-h-fit my-5'>
				<div
					className={`flex flex-col gap-y-5 lg:gap-y-0 ${
						showCreate ? 'lg:flex-row' : 'space-y-10'
					} items-center justify-between w-full my-7`}
				>
					{showCreate ? (
						<CreateButton
							{...{
								...{
									text: buttonText,
									link
								}
							}}
						/>
					) : null}

					<h1
						className={`font-bold text-2xl  uppercase w-full order-1 lg:order-2 text-center`}
					>
						{heading}
					</h1>

					{showSearch ? (
						<div
							className={`w-full sm:w-[33%] mx-auto order-3 sm:order-3 max-w-[400px]`}
						>
							<SearchBox
								{...{
									inputValue,
									searchText,
									handleSearch,
									text: searchBoxText
								}}
							/>
						</div>
					) : null}
				</div>
				<Suspense
					fallback={
						<div className='flex items-center justify-center w-full my-5 min-h-[30rem]'>
							<Loader />
						</div>
					}
				>
					<div
						className={`flex flex-col items-center justify-center w-full my-5 gap-y-5 overflow-y-auto min-h-[33rem] sm:min-h-[30rem]
								`}
					>
						{children}

						{currentItems === totalItems ? null : (
							<button
								className='shadow-inner shadow-sky-600/50 text-[12px] font-semibold px-3 py-2 rounded-xl'
								onClick={handleLoadMore}
							>
								Load More
							</button>
						)}
						<span className='sr-only'>Loading...</span>
					</div>
				</Suspense>
			</div>
		</div>
	);
};

export default AdminWrapper;

interface LoaderProps {
	text?: string;
}

const Loader = ({ text }: LoaderProps) => {
	return (
		<div className='relative flex items-center justify-center w-full h-1/2 mx-auto'>
			<div className='absolute animate-loader-border rounded-full h-32 w-32 border-b-2 border-primary z-0 shadow-[15px] dark:shadow-xl'></div>
			<div className='absolute z-1 tracking-wider animate-loader-text text-amber-200 text-2xl'>
				{text ?? 'Loading'}
			</div>
		</div>
	);
};

export default Loader;

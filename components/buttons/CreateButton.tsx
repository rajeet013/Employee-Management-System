import Link from 'next/link';

interface ButtonProps {
	text: string;
	link: string;
}

const CreateButton = ({ text, link }: ButtonProps) => {
	return (
		<Link
			href={link}
			className='flex items-center justify-center w-full sm:w-[33%] max-w-[400px] border-0 rounded-md px-3 py-2 cursor-pointer bg-sky-600 hover:bg-sky-700  animate-300 mx-auto text-white font-bold order-2 lg:order-1'
		>
			Create {text}
		</Link>
	);
};

export default CreateButton;

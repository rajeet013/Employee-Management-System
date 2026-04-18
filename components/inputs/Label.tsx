interface LabelProps {
	text: string;
	peerClassName?: string;
}

const Label = ({ text, peerClassName }: LabelProps) => {
	return (
		<label
			className={`
				 absolute
				 left-2
				 -z-40
				 opacity-0
				 text-sm
				 text-transparent
				 transition-all
				 peer-placeholder-shown:top-3
				 peer-placeholder-shown:left-2
				 placeholder-shown:text-transparent
				 peer-placeholder-shown:text-[14px]
				 peer-focus:opacity-100
				 peer-focus:z-50
				 peer-focus:sm-top-0
				 peer-focus:-top-5
				 peer-focus:left-2
				 peer-focus:text-sm
			 peer-focus:dark:text-gray-700
			 ${peerClassName}
			 `}
		>
			{text}
		</label>
	);
};

export default Label;

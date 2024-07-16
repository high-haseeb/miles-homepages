export default function Chip({
	className,
	text,
}: {
	className: string;
	text: string;
}) {
	return (
		<div className={`py-[3px] px-[15px] rounded-[15px] w-fit text-sm ${className}`}>
			{text}
		</div>
	);
}

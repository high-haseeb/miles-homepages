export default function ShortRightArrow({
	size,
	className,
}: {
	size?: string;
	className?: string;
}) {
	return (
		<svg
			width={size || "24"}
			height={size || "24"}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<path
				d="M14.4299 5.92969L20.4999 11.9997L14.4299 18.0697"
				stroke="white"
				strokeWidth="1.5"
				strokeMiterlimit="10"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M3.5 12H20.33"
				stroke="white"
				strokeWidth="1.5"
				strokeMiterlimit="10"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

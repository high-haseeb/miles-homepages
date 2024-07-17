export default function Dot({
	color,
	className,
}: {
	color?: string;
	className?: string;
}) {
	return (
		<svg
			width="14"
			height="14"
			viewBox="0 0 14 14"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<rect
				x="2"
				y="2"
				width="10"
				height="10"
				rx="5"
				fill={color || "#71CB31"}
			/>
			<rect
				x="0.703125"
				y="0.689453"
				width="12.61"
				height="12.61"
				rx="6.305"
				fill={color || "#71CB31"}
				fill-opacity="0.6"
			/>
		</svg>
	);
}

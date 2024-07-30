export default function ListStyle({ color }: { color?: string }) {
	return (
		<svg
			width="15"
			height="15"
			viewBox="0 0 15 15"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle cx="7.5" cy="7.5" r="7.5" fill={color || "#019D45"} />
			<g clip-path="url(#clip0_2701_5404)">
				<path
					d="M5.01221 8.12109L6.10596 9.21484L9.38721 5.77734"
					stroke="white"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</g>
			<defs>
				<clipPath id="clip0_2701_5404">
					<rect
						width="7.5"
						height="7.5"
						fill="white"
						transform="translate(3.44995 3.75)"
					/>
				</clipPath>
			</defs>
		</svg>
	);
}

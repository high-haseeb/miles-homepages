"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HomepageAnimation() {
	const radiusX = 525;
	const radiusY = 350;
	const duration = 20;

	const createKeyframes = (angle: number) => {
		const frames = [];
		for (let i = 0; i <= 360; i++) {
			const rad = ((angle + i) * Math.PI) / 180;
			frames.push({
				x: radiusX * Math.cos(rad),
				y: radiusY * Math.sin(rad),
				rotate: i,
			});
		}
		return frames;
	};
	return (
		<div className="absolute inset-0 md:flex justify-center items-center hidden">
			{images.map((Icon, index) => {
				const angle = (360 / images.length) * index;
				const keyframes = createKeyframes(angle);
				const initialX = radiusX * Math.cos((angle * Math.PI) / 180);
				const initialY = radiusY * Math.sin((angle * Math.PI) / 180);
				return (
					<motion.div
						key={index}
						className="absolute"
						style={{
							top: "50%",
							left: "50%",
							width: "auto",
							height: "auto",
							transform: "translate(-50%, -50%)",
						}}
						initial={{ x: initialX, y: initialY, rotate: 0 }}
						animate={{
							x: keyframes.map((frame) => frame.x),
							y: keyframes.map((frame) => frame.y),
							rotate: keyframes.map((frame) => frame.rotate),
						}}
						transition={{
							duration,
							ease: "linear",
							repeat: Infinity,
						}}
					>
						<motion.div
							animate={{ rotate: 360 }}
							transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
						>
							{Icon.icon}
						</motion.div>
					</motion.div>
				);
			})}
		</div>
	);
}

const images: {
	key: string;
	icon: React.ReactNode;
}[] = [
	{
		key: "1",
		icon: (
			<Image
				src="/images/Camera.png"
				width={173.03}
				height={180.77}
				alt="Camera"
				key="1"
				className="object-contain hidden md:block"
			/>
		),
	},
	{
		key: "2",
		icon: (
			<Image
				src="/images/laptop.png"
				width={175.93}
				height={144.85}
				alt="laptop"
				key="2"
				className="object-contain hidden md:block"
			/>
		),
	},
	{
		key: "3",
		icon: (
			<Image
				src="/images/printer.png"
				width={236.73}
				height={156.67}
				alt="printer"
				key="3"
				className="object-contain hidden md:block"
			/>
		),
	},
	{
		key: "4",
		icon: (
			<Image
				src="/images/projector.png"
				width={160.11}
				height={142.04}
				alt="projector"
				key="4"
				className="object-contain hidden md:block"
			/>
		),
	},
	{
		key: "5",
		icon: (
			<Image
				src="/images/video-camera.png"
				width={92.88}
				height={146.35}
				alt="Camera"
				key="1"
				className="object-contain hidden md:block"
			/>
		),
	},
];

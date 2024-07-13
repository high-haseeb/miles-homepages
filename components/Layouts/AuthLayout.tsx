import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import AuthlayoutIcon1 from "../vectors/AuthlayoutIcon1";
import AuthlayoutIcon2 from "../vectors/AuthlayoutIcon2";
import AuthlayoutIcon3 from "../vectors/AuthlayoutIcon3";
import AuthlayoutIcon4 from "../vectors/AuthlayoutIcon4";
import AuthlayoutIcon5 from "../vectors/AuthlayoutIcon5";
import AuthlayoutIcon6 from "../vectors/AuthlayoutIcon6";
import React from "react";

const icons: {
	key: string;
	icon: React.ReactNode;
}[] = [
	{
		key: "1",
		icon: <AuthlayoutIcon1 />,
	},
	{
		key: "2",
		icon: <AuthlayoutIcon2 />,
	},
	{
		key: "3",
		icon: <AuthlayoutIcon3 />,
	},
	{
		key: "4",
		icon: <AuthlayoutIcon4 />,
	},
	{
		key: "5",
		icon: <AuthlayoutIcon5 />,
	},
	{
		key: "6",
		icon: <AuthlayoutIcon6 />,
	},
];

const radiusX = 650;
const radiusY = 400;
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

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<section className="overflow-hidden w-full h-screen flex max-md:flex-col md:justify-center md:items-center bg-cover bg-center bg-no-repeat bg-white md:bg-[url('/images/onboarding-bg.png')] md:px-5 relative">
			<div className="bg-white md:shadow-standard border-slate-50 rounded-[20px] py-[15px] md:py-[34px] px-[25px] md:px-[50px] flex md:divide-x md:gap-x-10 max-w-[1046px] w-full md:mx-auto">
				<div className="flex-1 max-md:flex-col z-10 bg-white/50 backdrop-blur-[5px]">
					<Link href="/" className="block md:hidden">
						<Image
							src="/images/logo.svg"
							width={45}
							height={12.32}
							alt="logo"
							className="object-contain mb-5"
						/>
					</Link>
					{children}
				</div>
				<div className="pl-11 hidden md:flex flex-col justify-center flex-1">
					<Link href="/">
						<Image
							src="/images/logo.svg"
							width={95}
							height={26}
							alt="logo"
							className="object-contain mb-10"
						/>
					</Link>
					<h3 className="text-slate-900 text-4xl font-bold mb-4.5">
						Make extra cash from your items you.
					</h3>
					<p className="text-slate-600 text-lg mb-4.5">
						Miles is a digital renting market built to encourage communal
						sharing while decluttering your space and helping you save.
					</p>
					<Image
						src="/icons/three-dots.svg"
						width={40}
						height={8}
						alt="miles 3 dots"
					/>
				</div>
			</div>

			<div className="absolute inset-0 hidden md:flex justify-center items-center">
				{icons.map((Icon, index) => {
					const angle = (360 / icons.length) * index;
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
		</section>
	);
};

export default AuthLayout;

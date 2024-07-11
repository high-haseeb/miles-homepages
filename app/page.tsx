import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Dot from "@/components/vectors/Dot";
import PlayIcon from "@/components/vectors/PlayIcon";
import LongRightArrow from "@/components/vectors/LongRightArrow";
import ShortRightArrow from "@/components/vectors/ShortRightArrow";
import ListStyle from "@/components/vectors/ListStyle";
import Footer from "@/components/Footer";

export default function Home() {
	return (
		<section className="min-h-screen flex flex-col overflow-x-hidden max-w-[100vw] w-full">
			<header className="min-h-screen bg-pearl-400 p-5 flex flex-col items-center justify-center relative">
				<Navbar />
				<div className="flex flex-col items-center text-center max-w-[578px]">
					<div className="bg-white rounded-[100px] mb-3.5 border border-gray-2 px-2 py-1 flex items-center gap-x-1 text-sm text-dark">
						<Dot />
						Free, fast, secure and easy to navigate
					</div>
					<h3 className="font-bold text-[52px] text-slate-900 leading-[62px] text-center mb-5">
						Get More Mileage Out of the Things You Own
					</h3>
					<p className="text-lg text-center text-slate-900 mb-[61px]">
						Buying stuff is easy. But what if there was a way to make renting
						out the things you already own just as simple and rewarding?.
					</p>
					<Link
						href="/list-items"
						className="flex items-center gap-x-3 px-[30px] py-3 rounded-[38px] bg-green-500 text-white"
					>
						Get started <PlayIcon />
					</Link>
				</div>
			</header>
			<main className="flex flex-col">
				<section className="bg-white flex flex-col pt-14 pb-[88px] px-[105px]">
					<div className="flex flex-col gap-y-5 self-center items-center text-center mb-[108px]">
						<div className="bg-slate-50 py-[5px] w-fit px-2.5 rounded-[30px] uppercase text-sm text-dark_2">
							EVERYTHING YOU NEED
						</div>
						<h4 className="font-bold text-[2rem] leading-[40px] text-black">
							Why List your stuff on Miles?
						</h4>
					</div>
					<div className="flex flex-col md:flex-row items-stretch justify-between">
						<MilesCard
							bgColor="bg-teal-50"
							titleColor="text-teal-500"
							title="Extra Cash"
							desc="Turn your idle possessions into a steady stream of revenue by renting them out on Miles"
							src="/icons/cash.svg"
							width={157.67}
							height={140.8}
							alt="cash"
						/>
						<MilesCard
							bgColor="bg-orange-50"
							titleColor="text-orange-500"
							title="Hassle-Free"
							desc="You control your capacity and availability. Miles takes care of everything, from notifications."
							src="/icons/box.svg"
							width={161.91}
							height={114.72}
							alt="box"
						/>
						<MilesCard
							bgColor="bg-green-50"
							titleColor="text-green-500"
							title="Trusted Community"
							desc="Join a vibrant community of listers and renters, built on transparency and trust"
							src="/icons/community.svg"
							width={126.8}
							height={160.07}
							alt="community"
						/>
					</div>
				</section>
				<section className="bg-white flex flex-col pt-[71px] pb-[123px] px-[105px]">
					<div className="flex flex-col gap-y-5 self-center items-center text-center mb-[108px]">
						<div className="bg-slate-50 py-[5px] w-fit px-2.5 rounded-[30px] uppercase text-sm text-dark_2">
							EVERYTHING YOU NEED
						</div>
						<h4 className="font-bold text-[2rem] leading-[40px] text-black">
							How it works
						</h4>
					</div>
					<div className="flex flex-col gap-y-[120px]">
						<div className="flex flex-col md:flex-row items-center gap-x-5 mx-[68px]">
							<Image
								src="/images/nikon-camera.png"
								width={510}
								height={463}
								alt="nikon-camera"
								className="object-contain rounded-3xl"
							/>
							<div className="flex justify-center ml-[120px] items-end">
								<div className="flex flex-col">
									<p className="font-bold text-slate-900 text-4xl mb-[26px]">
										List your Item
									</p>
									<p className="text-xl text-slate-800 mb-14">
										Tell us about your item and how much you would like to earn
										from it
									</p>
									<Link
										href="#"
										className="flex items-center gap-x-3.5 text-2xl text-orange-500"
									>
										Explore Product
										<LongRightArrow />
									</Link>
								</div>
							</div>
						</div>
						<div className="flex flex-col md:flex-row-reverse items-center gap-x-5 mx-[68px]">
							<Image
								src="/images/handshake.png"
								width={510}
								height={463}
								alt="handshake"
								className="object-contain rounded-3xl"
							/>
							<div className="flex justify-center mr-[120px] items-end">
								<div className="flex flex-col">
									<p className="font-bold text-slate-900 text-4xl mb-[26px]">
										Approve who rents it
									</p>
									<p className="text-xl text-slate-800 mb-14">
										Tell us about your item and how much you would like to earn
										from it
									</p>
									<Link
										href="#"
										className="flex items-center gap-x-3.5 text-2xl text-orange-500"
									>
										Explore Product
										<LongRightArrow />
									</Link>
								</div>
							</div>
						</div>
						<div className="flex flex-col md:flex-row items-center gap-x-5 mx-[68px]">
							<Image
								src="/images/money-display.png"
								width={510}
								height={463}
								alt="money-display"
								className="object-contain rounded-3xl"
							/>
							<div className="flex justify-center ml-[120px] items-end">
								<div className="flex flex-col">
									<p className="font-bold text-slate-900 text-4xl mb-[26px]">
										Start earning
									</p>
									<p className="text-xl text-slate-800 mb-14">
										Tell us about your item and how much you would like to earn
										from it
									</p>
									<Link
										href="#"
										className="flex items-center gap-x-4 text-white rounded-[38px] bg-green-500 p-4 pl-6 w-fit"
									>
										Get started
										<ShortRightArrow />
									</Link>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className="bg-white flex flex-col py-14 px-[226px]">
					<div className="flex flex-col gap-y-5 self-center items-center text-center mb-[70px]">
						<div className="bg-slate-50 py-[5px] w-fit px-2.5 rounded-[30px] uppercase text-sm text-dark_2">
							EVERYTHING YOU NEED
						</div>
						<h4 className="font-bold text-[2rem] leading-[40px] text-black">
							We&apos;ve thought of everything
						</h4>
					</div>
					<div className="flex flex-col gap-y-9">
						<div className="flex flex-col max-md:gap-y-9 md:flex-row items-center justify-between">
							<div className="flex flex-col items-center gap-y-2.5 text-center max-w-[294px]">
								<p className="text-2xl text-slate-900 font-medium">
									Verified Community
								</p>
								<Image
									src="/icons/verified-badge.svg"
									alt="verified-badge"
									width={100}
									height={100}
									className="object-contain"
								/>
								<p className="text-slate-900">
									All renters on Miles undergo a rigorous verification process,
									fostering a trustworthy and reliable community
								</p>
							</div>
							<div className="flex flex-col items-center gap-y-2.5 text-center max-w-[294px]">
								<p className="text-2xl text-slate-900 font-medium">
									Peace of mind
								</p>
								<Image
									src="/icons/peace-badge.svg"
									alt="peace-badge"
									width={100}
									height={100}
									className="object-contain"
								/>
								<p className="text-slate-900">
									Every item that you accept a renal request for is insured for
									its full value from the moment it leaves your hand.
								</p>
							</div>
						</div>
						<div className="flex flex-col items-center gap-y-2.5 text-center max-w-[294px] md:self-center">
							<p className="text-2xl text-slate-900 font-medium">
								Instant Payments
							</p>
							<Image
								src="/icons/payment-badge.svg"
								alt="payment-badge"
								width={100}
								height={100}
								className="object-contain"
							/>
							<p className="text-slate-900">
								Every item that you accept a renal request for is insured for
								its full value from the moment it leaves your hand.
							</p>
						</div>
					</div>
				</section>
				<section className="bg-white flex flex-col pt-[140px] pb-[232px] px-[200px] relative">
					<div className="flex flex-col gap-y-5 self-center items-center text-center mb-[97px] max-w-[650px]">
						<div className="bg-slate-50 py-[5px] w-fit px-2.5 rounded-[30px] uppercase text-sm text-dark_2">
							EVERYTHING YOU NEED
						</div>
						<h4 className="font-semibold text-[42px] leading-[52.5px] text-slate-900">
							Explore our categories
						</h4>
						<p className="text-lg text-dark_2 -mt-[5px] mb-[33px]">
							We’re focused on first, but we’re expanding our catalog to a more
							diverse range of items soon. Please check back often to see what
							we offer
						</p>
						<Link
							href="#"
							className="flex items-center gap-x-4 text-white rounded-[38px] bg-green-500 p-4 pl-6 w-fit"
						>
							Explore now
							<ShortRightArrow />
						</Link>
					</div>
					<div className="flex flex-col md:flex-row items-center gap-5 mb-[55px]">
						<div className="pb-[30px] px-6 flex items-end justify-center md:w-[312px] md:h-[375px] rounded-[21.31px] bg-[url('/images/film.png')] bg-center bg-cover bg-no-repeat">
							<div className="rounded-[18px] bg-white max-w-[264px] w-full h-[71px] flex items-center justify-center">
								<p className="font-medium text-black">Film</p>
							</div>
						</div>
						<div className="pb-[30px] px-6 flex items-end justify-center md:w-[366px] md:h-[441px] rounded-[25px] bg-[url('/images/electronics.png')] bg-center bg-cover bg-no-repeat">
							<div className="rounded-[18px] bg-white max-w-[264px] w-full h-[71px] flex items-center justify-center">
								<p className="font-medium text-black">Electronics</p>
							</div>
						</div>
						<div className="pb-[30px] px-6 flex items-end justify-center md:w-[312px] md:h-[375px] rounded-[21.31px] bg-[url('/images/photography.png')] bg-center bg-cover bg-no-repeat">
							<div className="rounded-[18px] bg-white max-w-[264px] w-full h-[71px] flex items-center justify-center">
								<p className="font-medium text-black">Photography</p>
							</div>
						</div>
					</div>
					<div className="relative rounded-[37.82px] max-w-[876px] w-full self-center pt-[54px] pb-[48.64px] flex flex-col items-center text-center bg-[url('/images/our-mission-bg.png')] bg-center bg-cover bg-no-repeat">
						<h4 className="font-semibold text-slate-900 text-[42px] leading-[52.5px] mb-[21px]">
							Our Mission
						</h4>
						<p className="text-dark_2 max-w-[558px] mb-[21px]">
							We’re focused on first, but we’re expanding our catalog to a more
							diverse range of items soon. Please check back often to see what
							we offer
						</p>
						<div className="flex flex-col gap-y-2 mb-[30px]">
							<div className="flex items-center gap-x-4">
								<ListStyle />
								<p className="text-sm text-slate-900">
									Build a highly engaged audience
								</p>
							</div>
							<div className="flex items-center gap-x-4">
								<ListStyle color="#003F32" />
								<p className="text-sm text-slate-900">Get more leads</p>
							</div>
							<div className="flex items-center gap-x-4">
								<ListStyle color="#E87F2B" />
								<p className="text-sm text-slate-900">Close more clients</p>
							</div>
						</div>
						<Link
							href="#"
							className="flex items-center gap-x-[12.1px] text-xs text-white rounded-[28.75px] bg-green-500 p-[12.1px] w-fit"
						>
							Explore now
							<ShortRightArrow size="18.6" />
						</Link>
					</div>
				</section>
			</main>
			<Footer />
		</section>
	);
}

function MilesCard({
	bgColor,
	title,
	titleColor,
	desc,
	src,
	alt,
	width,
	height,
}: {
	bgColor: string;
	title: string;
	titleColor: string;
	desc: string;
	src: string;
	alt: string;
	width: number;
	height: number;
}) {
	return (
		<div
			className={`flex flex-col py-[29px] px-[34px] h-[425px] max-w-[327px] rounded-[27.25px] ${bgColor}`}
		>
			<p className={`${titleColor} text-2xl font-bold mb-4`}>{title}</p>
			<p className="text-slate-900 mb-[68.62px]">{desc}</p>
			<div className="self-center">
				<Image
					src={src}
					alt={alt}
					width={width}
					height={height}
					className="object-contain"
				/>
			</div>
		</div>
	);
}

import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Dot from "@/components/vectors/Dot";
import PlayIcon from "@/components/vectors/PlayIcon";
import LongRightArrow from "@/components/vectors/LongRightArrow";
import ShortRightArrow from "@/components/vectors/ShortRightArrow";
import ListStyle from "@/components/vectors/ListStyle";
import Footer from "@/components/Footer";
import HomepageAnimation from "@/components/HomepageAnimation";

export default function Home() {
	return (
		<section className="min-h-screen flex flex-col overflow-x-hidden max-w-[100vw] w-full">
			<header className="min-h-screen bg-pearl-400 pt-[15px] px-[25px] md:p-5 flex flex-col md:items-center md:justify-center relative">
				<Navbar />
				<div className="flex flex-col items-center text-center max-w-[578px] z-10">
					<div className="bg-white rounded-[100px] mb-[30px] md:mb-3.5 border border-gray-2 px-2 py-1 flex items-center gap-x-1 text-xs md:text-sm text-dark">
						<Dot />
						Free, fast, secure and easy to navigate
					</div>
					<h3 className="font-bold text-xl md:text-[52px] text-slate-900 md:leading-[62px] text-center mb-5">
						Get More Mileage Out of the Things You Own
					</h3>
					<p className="text-xs md:text-lg text-center text-slate-900 mb-[33px] md:mb-[61px]">
						Buying stuff is easy. But what if there was a way to make renting
						out the things you already own just as simple and rewarding?.
					</p>
					<Link
						href="/listings"
						className="flex items-center gap-x-3 px-[30px] py-3 rounded-[38px] bg-green-500 text-sm md:text-base text-white"
					>
						Get started <PlayIcon />
					</Link>
				</div>
				<div className="md:hidden absolute bottom-14 left-0 flex justify-between w-full px-[25px]">
					<Image
						src="/images/laptop.png"
						width={79.08}
						height={96.05}
						alt="laptop"
						className="object-contain rotate-[225deg]"
					/>
					<Image
						src="/images/Camera.png"
						width={99.59}
						height={104.05}
						alt="Camera"
						className="object-contain rotate-[130deg]"
					/>

					<Image
						src="/images/projector.png"
						width={101.4}
						height={67.11}
						alt="projector"
						className="object-contain -rotate-45"
					/>
				</div>
				<HomepageAnimation />
			</header>
			<main className="flex flex-col">
				<section className="bg-white flex flex-col max-md:gap-y-[50px] py-10 px-[25px] md:pt-14 mb:pb-[88px] mb:px-[105px]">
					<div className="flex flex-col gap-y-[7px] md:gap-y-5 md:self-center md:items-center md:text-center md:mb-[108px]">
						<div className="md:bg-slate-50 md:py-[5px] font-medium w-fit md:px-2.5 rounded-[30px] uppercase text-sm text-dark_2">
							EVERYTHING YOU NEED
						</div>
						<h4 className="font-bold text-xl md:text-[2rem] md:leading-[40px] text-black">
							Why List your stuff on Miles?
						</h4>
						<p className="md:hidden text-xs text-slate-900">
							Buying stuff is easy. But what if there was a way to make renting
							out the things you already own just as simple and rewarding?.
						</p>
					</div>
					<div className="flex flex-col md:flex-row items-stretch justify-between max-md:gap-y-[50px]">
						<MilesCard
							bgColor="md:bg-teal-50 bg-transparent"
							titleColor="text-teal-500"
							title="Extra Cash"
							desc="Turn your idle possessions into a steady stream of revenue by renting them out on Miles"
							src="/icons/cash.svg"
							width="md:w-[157.67px] w-[76px]"
							height="md:h-[140.8px] h-[68px]"
							alt="cash"
						/>
						<MilesCard
							bgColor="md:bg-orange-50 bg-transparent"
							titleColor="text-orange-500"
							title="Hassle-Free"
							desc="You control your capacity and availability. Miles takes care of everything, from notifications."
							src="/icons/box.svg"
							width="md:w-[161.91px] w-[78px]"
							height="md:h-[114.72px] h-[55px]"
							alt="box"
						/>
						<MilesCard
							bgColor="md:bg-green-50 bg-transparent"
							titleColor="text-green-500"
							title="Trusted Community"
							desc="Join a vibrant community of listers and renters, built on transparency and trust"
							src="/icons/community.svg"
							width="md:w-[126.8px] w-[61px]"
							height="md:h-[160.07px] h-[77px]"
							alt="community"
						/>
					</div>
				</section>
				<section className="bg-white flex flex-col max-md:gap-y-[53px] py-10 px-[25px] md:pt-[71px] md:pb-[123px] md:px-[105px]">
					<div className="flex flex-col gap-y-[7px] md:gap-y-5 md:self-center md:items-center md:text-center md:mb-[108px]">
						<div className="md:bg-slate-50 md:py-[5px] font-medium w-fit md:px-2.5 rounded-[30px] uppercase text-sm text-dark_2">
							EVERYTHING YOU NEED
						</div>
						<h4 className="font-bold text-xl md:text-[2rem] md:leading-[40px] text-black">
							How it works
						</h4>
						<p className="md:hidden text-xs text-slate-900">
							Buying stuff is easy. But what if there was a way to make renting
							out the things you already own just as simple and rewarding?.
						</p>
					</div>
					<div className="flex flex-col gap-y-[53px] md:gap-y-[120px]">
						<div className="flex flex-col md:flex-row md:items-center gap-x-5 md:mx-[68px]">
							<Image
								src="/images/nikon-camera.jpg"
								width={510}
								height={463}
								alt="nikon-camera"
								className="object-contain rounded-[5.84px] md:rounded-3xl max-md:mb-5"
							/>
							<div className="flex md:justify-center md:ml-[120px] md:items-end">
								<div className="flex flex-col">
									<p className="font-bold text-slate-900 md:text-4xl mb-2.5 md:mb-[26px]">
										List your Item
									</p>
									<p className="text-xs md:text-xl text-slate-800 mb-1 md:mb-14">
										Tell us about your item and how much you would like to earn
										from it
									</p>
									<Link
										href="#"
										className="flex items-center gap-x-2.5 md:gap-x-3.5 text-xs md:text-2xl text-orange-500"
									>
										Explore Product
										<LongRightArrow />
									</Link>
								</div>
							</div>
						</div>
						<div className="flex flex-col md:flex-row-reverse md:items-center gap-x-5 md:mx-[68px]">
							<Image
								src="/images/handshake.jpg"
								width={510}
								height={463}
								alt="handshake"
								className="object-contain rounded-[5.84px] md:rounded-3xl max-md:mb-5"
							/>
							<div className="flex md:justify-center md:mr-[120px] md:items-end">
								<div className="flex flex-col">
									<p className="font-bold text-slate-900 md:text-4xl mb-2.5 md:mb-[26px]">
										Approve who rents it
									</p>
									<p className="text-xs md:text-xl text-slate-800 mb-1 md:mb-14">
										Tell us about your item and how much you would like to earn
										from it
									</p>
									<Link
										href="#"
										className="flex items-center gap-x-2.5 md:gap-x-3.5 text-xs md:text-2xl text-orange-500"
									>
										Explore Product
										<LongRightArrow />
									</Link>
								</div>
							</div>
						</div>
						<div className="flex flex-col md:flex-row md:items-center gap-x-5 md:mx-[68px]">
							<Image
								src="/images/money-display.jpg"
								width={510}
								height={463}
								alt="money-display"
								className="object-contain rounded-[5.84px] md:rounded-3xl max-md:mb-5"
							/>
							<div className="flex md:justify-center md:ml-[120px] md:items-end">
								<div className="flex flex-col">
									<p className="font-bold text-slate-900 md:text-4xl mb-2.5 md:mb-[26px]">
										Start earning
									</p>
									<p className="text-xs md:text-xl text-slate-800 mb-1 md:mb-14">
										Tell us about your item and how much you would like to earn
										from it
									</p>
									<Link
										href="#"
										className="md:hidden mb-[30px] flex items-center gap-x-2.5 md:gap-x-3.5 text-xs md:text-2xl text-orange-500"
									>
										Explore Product
										<LongRightArrow />
									</Link>
									<Link
										href="#"
										className="max-md:self-center flex items-center gap-x-4 text-white rounded-[38px] bg-green-500 p-4 pl-6 w-fit"
									>
										Get started <PlayIcon className="md:hidden" />
										<ShortRightArrow className="hidden md:block" />
									</Link>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className="bg-white flex flex-col py-10 px-[25px] md:py-14 md:px-[226px]">
					<div className="flex flex-col gap-y-[7px] md:gap-y-5 self-center items-center text-center mb-[50px] md:mb-[70px]">
						<div className="md:bg-slate-50 md:py-[5px] font-medium w-fit md:px-2.5 rounded-[30px] uppercase text-sm text-dark_2">
							EVERYTHING YOU NEED
						</div>
						<h4 className="font-bold text-xl md:text-[2rem] md:leading-[40px] text-black">
							We&apos;ve thought of everything
						</h4>
						<p className="md:hidden text-xs text-slate-900">
							Buying stuff is easy. But what if there was a way to make renting
							out the things you already own just as simple and rewarding?.
						</p>
					</div>
					<div className="flex flex-col gap-y-[30px] md:gap-y-9">
						<div className="flex flex-col max-md:gap-y-9 md:flex-row items-center justify-between">
							<div className="flex flex-col items-center gap-y-[7px] md:gap-y-2.5 text-center max-w-[294px]">
								<p className="md:text-2xl text-slate-900 font-medium">
									Verified Community
								</p>
								<div className="w-[66px] h-[66px] md:w-[100px] md:h-[100px] relative">
									<Image
										src="/icons/verified-badge.svg"
										alt="verified-badge"
										layout="fill"
										fill
										className="object-contain"
									/>
								</div>
								<p className="text-slate-900 text-xs md:text-base">
									All renters on Miles undergo a rigorous verification process,
									fostering a trustworthy and reliable community
								</p>
							</div>
							<div className="flex flex-col items-center gap-y-[7px] md:gap-y-2.5 text-center max-w-[294px]">
								<p className="md:text-2xl text-slate-900 font-medium">
									Peace of mind
								</p>
								<div className="w-[66px] h-[66px] md:w-[100px] md:h-[100px] relative">
									<Image
										src="/icons/peace-badge.svg"
										alt="peace-badge"
										layout="fill"
										fill
										className="object-contain"
									/>
								</div>
								<p className="text-slate-900 text-xs md:text-base">
									Every item that you accept a renal request for is insured for
									its full value from the moment it leaves your hand.
								</p>
							</div>
						</div>
						<div className="flex self-center flex-col items-center gap-y-[7px] md:gap-y-2.5 text-center max-w-[294px]">
							<p className="md:text-2xl text-slate-900 font-medium">
								Instant Payments
							</p>
							<div className="w-[66px] h-[66px] md:w-[100px] md:h-[100px] relative">
								<Image
									src="/icons/payment-badge.svg"
									alt="payment-badge"
									layout="fill"
									fill
									className="object-contain"
								/>
							</div>
							<p className="text-slate-900 text-xs md:text-base">
								Every item that you accept a renal request for is insured for
								its full value from the moment it leaves your hand.
							</p>
						</div>
					</div>
				</section>
				<section className="bg-white flex flex-col md:pt-[140px] md:pb-[232px] md:px-[200px] px-[25px] py-10 relative">
					<div className="flex flex-col gap-y-[7px] md:gap-y-5 self-center items-center text-center mb-[50px] md:mb-[70px]">
						<div className="md:bg-slate-50 md:py-[5px] font-medium w-fit md:px-2.5 rounded-[30px] uppercase text-sm text-dark_2">
							EVERYTHING YOU NEED
						</div>
						<h4 className="font-bold text-xl md:text-[2rem] md:leading-[40px] text-black">
							Explore our categories
						</h4>
						<p className="text-xs md:text-lg text-dark_2 md:-mt-[5px] mb-5 md:mb-[33px]">
							We’re focused on first, but we’re expanding our catalog to a more
							diverse range of items soon. Please check back often to see what
							we offer
						</p>
						<Link
							href="#"
							className="flex items-center gap-x-4 text-white rounded-[38px] bg-green-500 p-4 pl-6 w-fit"
						>
							Explore now
							<PlayIcon className="md:hidden" />
							<ShortRightArrow className="hidden md:block" />
						</Link>
					</div>
					<div className="flex items-center gap-x-2 md:gap-5 mb-[20.83px] md:mb-[55px]">
						<div className="md:pb-[30px] pb-2.5 md:px-6 px-[7.75px] flex items-end justify-center w-[100px] h-[121px] md:w-[312px] md:h-[375px] rounded-[8.28px] md:rounded-[21.31px] bg-[url('/images/film.jpg')] bg-center bg-cover bg-no-repeat">
							<div className="rounded-[5.82px] md:rounded-[18px] bg-white max-w-[264px] w-full max-md:py-[5.3px] md:h-[71px] flex items-center justify-center">
								<p className="font-normal md:font-medium text-black text-[10px] md:text-base">
									Film
								</p>
							</div>
						</div>
						<div className="md:pb-[30px] pb-[25.36px] md:px-6 px-[7.75px] flex items-end justify-center w-[131px] h-[157px] md:w-[366px] md:h-[441px] rounded-[8.97px] md:rounded-[25px] bg-[url('/images/electronics.png')] bg-center bg-cover bg-no-repeat">
							<div className="rounded-[5.82px] md:rounded-[18px] bg-white max-w-[264px] w-full max-md:py-[5.3px] md:h-[71px] flex items-center justify-center">
								<p className="font-normal md:font-medium text-black text-[10px] md:text-base">
									Electronics
								</p>
							</div>
						</div>
						<div className="md:pb-[30px] pb-2.5 md:px-6 px-[7.75px] flex items-end justify-center w-[100px] h-[121px] md:w-[312px] md:h-[375px] rounded-[8.28px] md:rounded-[21.31px] bg-[url('/images/photography.jpg')] bg-center bg-cover bg-no-repeat">
							<div className="rounded-[5.82px] md:rounded-[18px] bg-white max-w-[264px] w-full max-md:py-[5.3px] md:h-[71px] flex items-center justify-center">
								<p className="font-normal md:font-medium text-black text-[10px] md:text-base">
									Photography
								</p>
							</div>
						</div>
					</div>
					<div className="relative md:-mb-[467px] rounded-[14.03px] md:rounded-[37.82px] max-w-[876px] w-full self-center py-[25px] md:pt-[54px] md:pb-[48.64px] flex flex-col items-center text-center md:bg-[url('/images/our-mission-bg.png')] bg-[url('/images/our-mission-mobile.png')] bg-center bg-cover bg-no-repeat">
						<h4 className="font-semibold text-slate-900 md:text-[42px] md:leading-[52.5px] text-lg mb-[9px] md:mb-[21px]">
							Our Mission
						</h4>
						<p className="text-dark_2 max-w-[558px] mb-[19px] md:mb-[21px] text-xs md:text-base">
							We’re focused on first, but we’re expanding our catalog to a more
							diverse range of items soon. Please check back often to see what
							we offer
						</p>
						<div className="flex md:flex-col flex-wrap max-md:justify-center gap-2 mb-[23px] md:mb-[30px]">
							<div className="flex items-center gap-x-4 md:order-none order-3 ">
								<ListStyle />
								<p className="text-sm text-slate-900">
									Build a highly engaged audience
								</p>
							</div>
							<div className="flex items-center gap-x-4 md:order-none order-1 ">
								<ListStyle color="#003F32" />
								<p className="text-sm text-slate-900">Get more leads</p>
							</div>
							<div className="flex items-center gap-x-4 md:order-none order-2 ">
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
	width: string;
	height: string;
}) {
	return (
		<div
			className={`flex flex-col md:py-[29px] md:px-[34px] md:h-[425px] max-w-[327px] md:rounded-[27.25px] ${bgColor}`}
		>
			<p
				className={`${titleColor} text-base md:text-2xl font-bold mb-[7px] md:mb-4 order-2 md:order-none`}
			>
				{title}
			</p>
			<p className="text-slate-900 text-xs md:text-base md:mb-[68.62px] order-3 md:order-none">
				{desc}
			</p>
			<div
				className={`md:self-center ${width} ${height} order-1 md:order-none mb-5 md:mb-0 relative`}
			>
				<Image
					src={src}
					alt={alt}
					layout="fill"
					fill
					className="object-contain"
				/>
			</div>
		</div>
	);
}

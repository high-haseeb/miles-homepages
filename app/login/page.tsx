import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import AuthLayout from "@/components/Layouts/AuthLayout";

export default function LoginPage() {
	return (
		<AuthLayout>
			<div className="flex flex-col gap-y-6 overflow-x-hidden">
				<div className="flex flex-col gap-1 max-md:mb-[50px]">
					<h3 className="text-slate-900 text-base md:text-[2rem] md:leading-[40px] font-bold">
						Login into your account
					</h3>
					<p className="text-[10px] md:text-sm text-gray-1">
						Welcome back, select a login method
					</p>
				</div>
				<div className="flex flex-col gap-y-6">
					<Button className="py-2 px-4 rounded-[38px] text-black text-sm font-bold relative bg-gray-2">
						<Image
							src="/icons/google-icon.svg"
							width={24}
							height={24}
							alt="google-icon"
							className="object-contain md:absolute md:left-4 max-md:mr-2.5"
						/>
						Continue with Google
					</Button>
					<Button className="py-2 px-4 rounded-[38px] text-black text-sm font-bold relative bg-gray-2">
						<Image
							src="/icons/facebook-icon.svg"
							width={24}
							height={24}
							alt="facebook-icon"
							className="object-contain md:absolute md:left-4 max-md:mr-2.5"
						/>
						Continue with Facebook
					</Button>
				</div>
				<div className="flex items-center gap-x-3">
					<div className="h-[1px] bg-gray-2 w-full" />
					<p className="text-slate-200 text-xs">Or</p>
					<div className="h-[1px] bg-gray-2 w-full" />
				</div>
				<div className="flex flex-col gap-y-3">
					<Input
						type="email"
						placeholder="E-mail address"
						className="p-4 rounded-xl outline-none ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
					/>
					<Input
						type="password"
						placeholder="Password"
						className="p-4 rounded-xl outline-none ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
					/>
				</div>
				<Button
					type="submit"
					className="mb-[25px] disabled:bg-green-200 text-teal-50 font-medium bg-green-500 py-3 px-4 rounded-[38px]"
				>
					Proceed
				</Button>
				<p className="text-sm text-center text-dark">
					Don’t have an account?{" "}
					<Link href="/signup" className="font-bold text-green-500">
						Sign Up
					</Link>
				</p>
			</div>
		</AuthLayout>
	);
}

"use client";
import { useState, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";

import AppContextProvider from "@/context/AppContext";

export default function ClientProviders({ children }: { children: ReactNode }) {
	const [queryClient] = useState(() => new QueryClient());
	return (
		<AppContextProvider>
			<QueryClientProvider client={queryClient}>
				{children}
				<Toaster />
			</QueryClientProvider>
		</AppContextProvider>
	);
}

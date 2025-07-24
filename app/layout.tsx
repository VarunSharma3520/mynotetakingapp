import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import TrafficLightButton from "@/components/shared/TrafficLightButton";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "MyNoteTakingApp",
	description: "A simple note-taking application",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 flex justify-center py-12 max-h-screen`}
			>
				<div className="w-full max-w-7xl bg-white rounded-xl shadow-xl border border-gray-300 overflow-hidden">
					<TrafficLightButton />

					{/* Main Content */}
					<div className="">
						<Navbar />
						{children}
						<Footer />
					</div>
				</div>
			</body>
		</html>
	);
}

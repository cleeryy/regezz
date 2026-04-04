import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Providers } from "./providers"
import { getAllLessons } from "@/data/lessons"
import "./globals.css"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

export const metadata: Metadata = {
	title: "Regezz - Master Regular Expressions",
	description: "Learn and practice regular expressions through interactive lessons",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const lessons = getAllLessons()
	return (
		<html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
			<body className="min-h-full bg-black text-white">
				<Providers lessons={lessons}>{children}</Providers>
			</body>
		</html>
	)
}

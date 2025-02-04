import "./globals.css"
import { Inter } from "next/font/google"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata = {
  title: "Система управління персоналом",
  description: "Веб-застосунок для автоматизації управління персоналом, проектами та доступами",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uk">
      <body className={inter.className}>
        <div className="flex h-screen bg-gray-100">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  )
}


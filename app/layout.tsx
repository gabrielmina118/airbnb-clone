import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Nunito } from "next/font/google";
import "./globals.css";
import NavBar from "./components/navbar/NavBar";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./components/modals/RentModal";
import SearchModal from "./components/modals/SearchModal";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Airbnb",
    description: "Airbnb clone",
};

const font = Nunito({
    subsets: ["latin"],
});

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const currentUser = await getCurrentUser();
    return (
        <html lang="pt-br">
            <body className={font.className}>
                <Suspense fallback>
                    <RegisterModal />
                    <LoginModal />
                    <RentModal />
                    <SearchModal />
                    <NavBar currentUser={currentUser} />
                    <ToasterProvider />
                    <div className="pb-20 pt-28">{children}</div>
                </Suspense>
            </body>
        </html>
    );
}

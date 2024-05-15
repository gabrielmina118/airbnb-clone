import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Nunito } from "next/font/google";
import "./globals.css";
import NavBar from "./components/navbar/NavBar";
import Modal from "./components/modals/Modal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Airbnb",
    description: "Airbnb clone",
};

const font = Nunito({
    subsets: ["latin"],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-br">
            <body className={font.className}>
                <Modal isOpen title="Login component"/>
                <NavBar />
                {children}
            </body>
        </html>
    );
}

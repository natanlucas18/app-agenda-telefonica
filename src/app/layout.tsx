import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavBar } from "../components/nav-bar";
import { ClientSessionProvider } from "../components/client-session-provider";
import { ReactQueryProvider } from "../providers/react-query-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MailConecta",
  description: "Gerencie seus contatos e envie emails de forma simple e prática",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientSessionProvider>
          <ReactQueryProvider>
            <NavBar />
            {children}
            <Toaster 
              position="top-center"
              richColors={false}
              toastOptions={{
                duration: 3000,
              }}
            />
          </ReactQueryProvider>
        </ClientSessionProvider>
      </body>
    </html>
  );
}

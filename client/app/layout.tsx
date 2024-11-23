import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar, { AuthProvider } from "@/components/global/Navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SWE Society",
  description:
    "Official website of SWE Society, Shahjalal University of Science and Technology (SUST)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
   
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
               <AuthProvider>
               <Navbar/>
          {children}
          </AuthProvider>
        </ThemeProvider>
        <Toaster />
        
      </body>
    </html>
  );
}

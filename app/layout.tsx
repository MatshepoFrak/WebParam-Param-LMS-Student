// "use client";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import BootstrapClient from "@/ui/bootstrapclient/bootstrap-client";
import Navbar from "@/ui/navbar/navbar";
import { usePathname } from "next/navigation";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/scss/bootstrap.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-quill/dist/quill.snow.css";
import "react-responsive-modal/styles.css";

import "@/app/globals.css";

/// Plugin CSS
import "@/public/css/plugins/fontawesome.min.css";
import "@/public/css/plugins/animation.css";
import "@/public/css/plugins/feather.css";
import "@/public/css/plugins/euclid-circulara.css";
import "@/public/scss/styles.scss";
import { UserProvider } from "@/context/user-context/user-context";
import { LessonProvider } from "@/context/lesson-context/lesson-context";

const inter = Inter({ subsets: ["latin"] });


const APP_NAME = "Thooto";
const APP_DESCRIPTION = "Supercharge your learning. 🚀🚀";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_NAME,
    template: "%s",
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_NAME,
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    shortcut: "/favicon.ico",
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
};


export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let pathname = null
 

  return (
    <html lang="en">
      <body >
        <UserProvider>
          <LessonProvider>
           <Navbar />
            {children}
            <BootstrapClient />
            <ToastContainer />
          </LessonProvider>
        </UserProvider>
      </body>
    </html>
  );
}
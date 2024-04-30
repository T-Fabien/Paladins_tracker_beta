import { Inter } from "next/font/google";
import "./styles/style.css";
import Provider from "@/util/Providers";
import Nav from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Paladins-Tracker",
  description: "Tracker for Paladins",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Nav/>
          {children}
        </Provider>
        </body>
    </html>
  );
}

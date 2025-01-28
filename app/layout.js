import "./globals.css";
import { Outfit } from "next/font/google";
import { ToastContainer } from "react-toastify";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={outfit.className}>
      <body className={`antialiased`} style={{ fontFamily: "Outfit" }}>
        {children}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          // transition={Bounce}
        />
      </body>
    </html>
  );
}

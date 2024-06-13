import { Footer, Navbar } from "./_components";
import {Lato} from "next/font/google"

const lato = Lato({
  weight: ['400','700'],
  subsets: ['latin'],
  display: 'swap',
})

function GlobalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className={`${lato.className} flex min-h-svh bg-light w-full flex-col`}>
        <Navbar />
        {children}
        <Footer />
      </div>
    </>
  );
}

export default GlobalLayout;

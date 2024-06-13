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
      <div className={lato.className}>
        <Navbar />
        {children}
        <Footer />
      </div>
    </>
  );
}

export default GlobalLayout;

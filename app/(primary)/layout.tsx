import { Footer, Navbar } from "./_components";

function GlobalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div></div>
      <div className="flex relative h-screen bg-black min-h-svh w-full flex-col items-center">
        <Navbar />
        {children}
        <Footer />
      </div>
    </>
  );
}

export default GlobalLayout;

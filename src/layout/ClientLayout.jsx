import TopNavbar from "../pages/layout/TopNavbar";

export default function ClientLayout({ children }) {
  return (
    <>
      <header>
        <nav className="container max-w-5xl mx-auto">
          <TopNavbar />
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
}

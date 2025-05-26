import TopNavbar from "../pages/layout/TopNavbar";

export default function ClientLayout({ children }) {
  return (
    <>
      <header>
        <nav>
          <TopNavbar />
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
}

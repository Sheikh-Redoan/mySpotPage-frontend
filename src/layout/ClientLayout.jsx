import TopNavbarClient from "../pages/layout/TopNavbarClient";

export default function ClientLayout({ children }) {
  return (
    <>
      <TopNavbarClient />
      <main>{children}</main>
    </>
  );
}

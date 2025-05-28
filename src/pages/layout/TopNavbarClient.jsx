import logo from "../../assets/images/logo.png";
import LanguageSelectModal from "../../components/modal/LanguageSelectModal";
import Container from "../client/Container";
export default function TopNavbarClient({ isLoggedIn = false }) {
  return (
    <header className="border-b border-black/5 sticky top-0 bg-white z-50">
      <nav>
        <Container>
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-2">
              <img
                className="w-20 h-8 object-contain"
                src={logo}
                alt="brand logo"
              />
            </div>

            <div className="cursor-pointer">
              {isLoggedIn ? (
                <img
                  className="w-10 h-10 rounded-full bg-white"
                  src="https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png"
                  alt=""
                />
              ) : (
                <LanguageSelectModal />
              )}
            </div>
          </div>
        </Container>
      </nav>
    </header>
  );
}

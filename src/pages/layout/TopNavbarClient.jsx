import logo from "../../assets/images/logo.png";
import LanguageSelectModal from "../../components/modal/LanguageSelectModal";
export default function TopNavbarClient({ isLoggedIn = false }) {
  return (
    <header className="border-b border-black/5 sticky top-0">
      <nav>
        <div className="container mx-auto">
          <div className="flex justify-between items-center px-6 py-4">
            <div className="flex items-center gap-2">
              <img
                className="w-20 h-8 rounded-full bg-white object-contain"
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
                <div className="relative">
                  <LanguageSelectModal />
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

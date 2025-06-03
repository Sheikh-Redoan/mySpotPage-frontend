import { useSelector } from "react-redux";
import { Link } from "react-router";
import logo from "../../assets/images/logo.png";
import UserMenuPopUp from "../../components/admin/UserMenuPopUp";
import LanguageSelectModal from "../../components/modal/LanguageSelectModal";
import Popup from "../../components/shared/Popup";
import { selectUser } from "../../redux/features/userSlice";
import Container from "../client/Container";

export default function TopNavbarClient() {
  const user = useSelector(selectUser);
  return (
    <header className="border-b border-black/5 sticky top-0 bg-white z-50">
      <nav>
        <Container>
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-2">
              <Link to="/">
                <img
                  className="w-20 h-8 object-contain"
                  src={logo}
                  alt="brand logo"
                />
              </Link>
            </div>

            {user ? (
              <Popup
                buttonComp={() => (
                  <div className="cursor-pointer">
                    <img
                      className="w-10 h-10 rounded-full bg-white"
                      src="https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png"
                      alt="User Avatar"
                    />
                  </div>
                )}
                className="-left-18 top-18 w-56">
                {(handlePopup) => <UserMenuPopUp handlePopup={handlePopup} />}
              </Popup>
            ) : (
              <LanguageSelectModal />
            )}
          </div>
        </Container>
      </nav>
    </header>
  );
}

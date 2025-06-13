import { Popover } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import logo from "../../assets/images/logo.png";
import UserMenuPopUp from "../../components/admin/UserMenuPopUp";
import LanguageSelectModal from "../../components/modal/LanguageSelectModal";
import { selectUser } from "../../redux/features/userSlice";
import Container from "../client/Container";

export default function TopNavbarClient() {
  const [isUserOpen, setIsUserOpen] = useState(false);
  const user = useSelector(selectUser);
  const handlePopup = () => {
    setIsUserOpen(!isUserOpen);
  };
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
              <Popover
                trigger={["click"]}
                placement="bottomRight"
                open={isUserOpen}
                onOpenChange={handlePopup}
                arrow={false}
                content={<UserMenuPopUp handlePopup={handlePopup} />}>
                <button className="cursor-pointer">
                  <img
                    className="w-10 h-10 rounded-full bg-white"
                    src="https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png"
                    alt="User Avatar"
                  />
                </button>
              </Popover>
            ) : (
              <LanguageSelectModal />
            )}
          </div>
        </Container>
      </nav>
    </header>
  );
}

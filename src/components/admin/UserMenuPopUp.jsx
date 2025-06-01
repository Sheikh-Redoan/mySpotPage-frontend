import { CircleUserRound } from "lucide-react";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router";
import { imageProvider } from "../../lib/imageProvider";

const UserMenuPopUp = ({ handlePopup }) => {
  return (
    <div className="font-golos">
      <ul
        className="p-5 flex flex-col items-start space-y-4"
        onClick={handlePopup}>
        <Link to="/profile-management/my-profile/basic-information">
          <li className="flex items-center gap-2 text-gray-700 cursor-pointer">
            <CircleUserRound size={20} strokeWidth={1.75} />
            My profile
          </li>
        </Link>
        <li className="flex items-center gap-2 text-gray-700 cursor-pointer">
          <img
            src={imageProvider.flag}
            alt="English"
            className="size-6 rounded-full"
          />
          English
        </li>
        <li className="flex items-center gap-2 text-red-500 cursor-pointer">
          <FiLogOut className="text-lg" />
          Sign out
        </li>
      </ul>
    </div>
  );
};

export default UserMenuPopUp;

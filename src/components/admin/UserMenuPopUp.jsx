import { CircleUserRound } from "lucide-react";
import { FiLogOut } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { Link } from "react-router";
import { imageProvider } from "../../lib/imageProvider";
import { clearUser } from "../../redux/features/userSlice";
import Translator from "../shared/Translator";

const UserMenuPopUp = ({ handlePopup }) => {
  const dispatch = useDispatch();
  return (
    <div className="font-golos">
      <ul
        className="p-5 flex flex-col items-start space-y-4"
        onClick={handlePopup}>
        <Link to="/my-profile/basic-information">
          <li className="flex items-center gap-2 text-gray-700 cursor-pointer">
            <CircleUserRound size={20} strokeWidth={1.75} />
            <Translator text={"My Profile"} />
          </li>
        </Link>
        <li className="flex items-center gap-2 text-gray-700 cursor-pointer">
          <img
            src={imageProvider.flag}
            alt="English"
            className="size-6 rounded-full"
          />

          <Translator text={"English"} />
        </li>
        <li
          className="flex items-center gap-2 text-red-500 cursor-pointer"
          onClick={() => dispatch(clearUser())}>
          <FiLogOut className="text-lg" />
          <Translator text={"Logout"} />
        </li>
      </ul>
    </div>
  );
};

export default UserMenuPopUp;

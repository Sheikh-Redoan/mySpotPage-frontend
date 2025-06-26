import { Button, Modal } from "antd";
import { Link, useNavigate } from "react-router";
import Translator from "../shared/Translator";
import notifiIcon from "/src/assets/icons/loginNotifi.png";
import { RxCross1 } from "react-icons/rx";
const LoginNotificationModal = ({ open, onCancel }) => {
  const navigate = useNavigate();
  return (
    <Modal open={open} onCancel={onCancel} footer={null}  centered closable={false}>
      <div className="flex items-center justify-between font-semibold text-lg p-5">
        <Translator text="Notification" />
        <RxCross1 onClick={onCancel} className="cursor-pointer"/>
      </div>
      <hr className="text-border " />
      <div className="flex flex-col items-center text-center font-golos p-5">
        <img className="mt-2 mb-4" src={notifiIcon} alt="login notification" />
        <div className="font-semibold mb-1">
          <Translator text="Let’s Get to Know Each Other!" />
        </div>
        <p className="text-description text-sm mb-2 max-w-xs">
          <Translator text="Hey there! We see this is your first time here, and we’re so excited to meet you! 🎉" />
        </p>
        <p className="text-description text-sm mb-6 max-w-xs">
          <Translator text="Before we get started, let’s set things up so we can offer you the best experience." />
        </p>
        <div className="flex items-center gap-3 w-full mt-2">
          <Link to="/signin" className="flex-1">
            <Button type="default" className="w-full" size="large">
              <Translator text="Sign In" />
            </Button>
          </Link>
          <Link to="/signup" className="flex-1">
            <Button
              type="default"
              className="!bg-black !text-white w-full"
              size="large"
            >
              <Translator text="Create Account" />
            </Button>
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default LoginNotificationModal;

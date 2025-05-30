import React from "react";
import { Modal } from "antd";
import { Link, useNavigate } from "react-router";
import notifiIcon from "/src/assets/icons/loginnotifi.png"


const LoginNotificationModal = ({ open, onCancel }) => {
    const navigate = useNavigate();
    return (
        <Modal
            open={open}
            onCancel={onCancel}
            footer={null}
            closable
            centered
            title={<span className="font-semibold text-lg">Notification</span>}
        >
            <hr className="text-border my-4" />
            <div className="flex flex-col items-center text-center font-golos">
                <img className="mt-2 mb-4" src={notifiIcon} alt="login notification" />
                <div className="font-semibold mb-1">
                    Let’s Get to Know Each Other!
                </div>
                <p className="text-description text-sm mb-2 max-w-xs">
                    Hey there! We see this is your first time here, and we’re so excited to meet you! 🎉
                </p>
                <p className="text-description text-sm mb-6 max-w-xs">
                    Before we get started, let’s set things up so we can offer you the best experience.
                </p>
                <div className="flex items-center gap-3 w-full mt-2">
                    <button
                        onClick={() => navigate("/signin")}
                        className="border border-gray-900 text-gray-900 py-2 rounded-lg hover:bg-gray-900 hover:text-white transition-colors w-1/2"
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => navigate("/signup")}
                        className="w-1/2 py-2 rounded-lg bg-gray-900 text-white "
                    >
                        Create Account
                    </button>
                </div>
            </div>

        </Modal>
    );
};

export default LoginNotificationModal;
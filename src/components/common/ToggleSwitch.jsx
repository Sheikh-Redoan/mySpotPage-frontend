import React, { useState } from "react";

const ToggleSwitch = ({ label, description, initialState }) => {
  const [isOn, setIsOn] = useState(initialState);

  const toggle = () => setIsOn(!isOn);

  return (
    <div className="flex items-start gap-3">
      <button
        type="button"
        onClick={toggle}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 ${
          isOn ? "bg-violet-500" : "bg-gray-200"
        }`}
        role="switch"
        aria-checked={isOn}
        aria-label={label}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            isOn ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
      <div className="flex-1">
        <p className="text-gray-950 text-base font-normal leading-normal">
          {label}
        </p>
        <p className="text-gray-400 text-sm font-normal leading-tight">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ToggleSwitch;
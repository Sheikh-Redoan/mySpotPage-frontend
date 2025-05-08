import { imageProvider } from "@/lib/imageProvider";
import React from "react";
import { Outlet } from "react-router";
import { Steps } from "antd";
import { Check } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { slideInFromLeft } from "@/animations/variants";

const OnboardLayout = () => {
  const currentStep = 2;

  const stepItems = [0, 1, 2].map((index) => {
    const isCompleted = index < currentStep;
    const isCurrent = index === currentStep;
    return {
      title: (
        <span
          style={{
            color: isCurrent ? "#866BE7" : "#000",
            fontWeight: 600,
          }}
        >
          {index === 0
            ? "Set Up Business Information"
            : index === 1
            ? "Set up Location"
            : "Set Up Services"}
        </span>
      ),
      description: (
        <span
          style={{
            color: isCurrent ? "#6b7280" : "#888",
            fontSize: "14px",
          }}
        >
          {index === 0
            ? "Tell us a bit about your business so we can personalize your experience."
            : index === 1
            ? "Choose where your business operates. This helps us show relevant settings."
            : "Select the services you offer so we can help you manage them more effectively."}
        </span>
      ),
      icon: (
        <div
          style={{
            backgroundColor: isCompleted ? "#866BE7" : "transparent",
            border: isCurrent
              ? "2px solid #866BE7"
              : !isCompleted
              ? "2px solid #d9d9d9"
              : "none",
            color: isCompleted ? "#fff" : isCurrent ? "#866BE7" : "#6c727f",
            borderRadius: "50%",
            width: 32,
            height: 32,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 14,
            fontWeight: 600,
            marginTop: 8,
          }}
        >
          {isCompleted ? <Check className="text-white" size={18} /> : index + 1}
        </div>
      ),
    };
  });

  return (
    <div className="flex flex-col font-golos">
      {/* Sticky Navbar */}
      <nav className="fixed top-0 z-50 bg-white sm:pl-16 px-5 py-3.5 w-full border-b">
        <motion.div
          variants={slideInFromLeft()}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-4"
        >
          <img src="/my_spot_page_favicon.png" alt="logo" />
          <img src={imageProvider.TextLogo} alt="logo" className="w-16" />
        </motion.div>
      </nav>

      {/* Sidebar */}
      <div className="flex flex-col md:flex-row h-screen overflow-hidden relative">
        <motion.aside
          variants={slideInFromLeft()}
          initial="hidden"
          animate="visible"
          className="w-full sm:max-w-[420px] bg-[#F9FAFC] py-10 sm:pl-16 px-5 h-screen pt-[108px]"
        >
          <Steps
            direction="vertical"
            current={currentStep}
            items={stepItems}
            style={{ gap: "24px" }}
          />
        </motion.aside>

        {/* Outlet Content */}
        <main className="w-full sm:w-3/4 p-4  pt-[60px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default OnboardLayout;

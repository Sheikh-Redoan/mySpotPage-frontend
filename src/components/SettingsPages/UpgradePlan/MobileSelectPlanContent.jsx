import { ChevronDown, ChevronUp, X } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { imageProvider } from "../../../lib/imageProvider";

const MobileSelectPlanContent = ({
  currentPlan,
  plans,
  visibleCards,
  isMobile,
  showAll,
  setShowAll,
}) => {
  const foundPlan = plans.find((plan) => plan.name === currentPlan);

  return (
    <>
      <div className="flex justify-between items-center p-2">
        <p className="text-lg font-semibold"> Select Plan</p>
        <Link
          className="hover:scale-105"
          to={"/dashboard/settings/subscription"}
        >
          <X />
        </Link>
      </div>
      <hr className="text-[#E7E7E7]" />
      {/* Plan card */}
      <div className="flex overflow-x-auto gap-4 my-3 w-[97%] md:w-full pb-2 p-2">
        {plans.map((plan, index) => {
          return (
            <div
              key={index}
              className={`min-w-[340px] md:min-h-[180px] border rounded-xl md:p-4 pb-3 px-3 transform transition-all duration-300 ease-in-out ${
                currentPlan === plan.name
                  ? "bg-[#F5F4FE] border-[#866BE7] hover:scale-105"
                  : "hover:scale-95 border-[#D1D1D1]"
              }`}
            >
              <div className="mt-4 flex gap-3 items-start">
                <img src={plan.image} alt="icon" />
                <div className="mt-[-2px]">
                  <p className="text-lg font-semibold"> {plan.name}</p>
                  <p className="text-[#262626] font-medium text-sm mt-1">
                    {plan.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* ........... */}
      <div className="min-h-full border border-[#ECEBFC] rounded-lg my-4 mx-2 p-3">
        <p className="text-[#797979] px-2">
          Starting your own business can feel overwhelming, but it doesn’t have
          to. Spark is here to give you the foundation you need to grow without
          the stress.
        </p>

        <div className="p-3 my-2">
          {currentPlan === "Glow" ? (
            <p>
              Everything is{" "}
              <span className="text-[#744CDB] font-medium">Spark</span> , Plus
            </p>
          ) : (
            ""
          )}
          {currentPlan === "Bloom" ? (
            <p>
              Everything is{" "}
              <span className="text-[#744CDB] font-medium">Glow</span>, Plus
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-4">
          {visibleCards.map((card, index) => (
            <div key={index} className="px-2">
              <img
                className="my-2"
                src={imageProvider.upgradeIcon}
                alt="icon"
              />
              <p className="text-[#3D3D3D]">
                <span className="font-bold">{card.title} :</span> {card.desc}
              </p>
              <hr className="mt-7 text-[#E7E7E7]" />
            </div>
          ))}
          <div className="text-center mt-6 mx-2">
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-[#744CDB] font-medium underline flex items-center justify-center gap-2 cursor-pointer"
            >
              {showAll ? "Show Less" : "Show More"}
              <span>
                {showAll ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </span>
            </button>
          </div>
        </div>
      </div>
      <p className="px-4 text-[#242528] pt-2 pb-8 font-semibold underline mb-32">
        Compare plans and pricing options
      </p>

      <div className="fixed pb-7 bottom-0 flex items-center justify-between gap-2 w-full bg-[#FFFFFF] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4">
        <div>
          <div className="text-[#866BE7] font-semibold text-xl flex items-end gap-1 mt-3.5">
            <p className="uppercase">{foundPlan.price}</p>
            <span className="text-[#888888] text-sm font-normal">
              {foundPlan.subtext}
            </span>
          </div>
          <p className="text-xs text-[#744CDB] my-3">*The prices do not include VAT</p>
        </div>
        <Link
          to={
            currentPlan === foundPlan.name
              ? foundPlan.name === "Spark"
                ? "#"
                : "/cancel-subscription"
              : (currentPlan === "Glow" && foundPlan.name === "Spark") ||
                (currentPlan === "Bloom" &&
                  (foundPlan.name === "Glow" || foundPlan.name === "Spark"))
              ? "/success-downgrade"
              : "/checkout"
          }
          state={{ isMobile, currentPlan }}
          className={` block text-center p-2 px-7 rounded-lg my-2 font-medium hover:scale-95 transform transition-all duration-300 ease-in-out
                        ${
                          currentPlan === foundPlan.name
                            ? foundPlan.name === "Spark"
                              ? "!bg-[#E4E3FD] !text-[#A496EF] !text-base !py-3"
                              : "border border-[#ED4245] bg-[#FFFFFF] !text-[#ED4245]"
                            : "bg-[#744CDB] text-[#FFFFFF]"
                        }
                       `}
        >
          {currentPlan === foundPlan.name
            ? foundPlan.name === "Spark"
              ? "Current Plan"
              : "Cancel"
            : (currentPlan === "Glow" && foundPlan.name === "Spark") ||
              (currentPlan === "Bloom" &&
                (foundPlan.name === "Glow" || foundPlan.name === "Spark"))
            ? "Downgrade"
            : "Upgrade"}
        </Link>
      </div>
    </>
  );
};

export default MobileSelectPlanContent;

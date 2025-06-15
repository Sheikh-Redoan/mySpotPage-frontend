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
  return (
    <>
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold"> Select Plan</p>
        <Link
          className="hover:scale-105"
          to={"/dashboard/settings/subscription"}
        >
          <X />
        </Link>
      </div>
      <hr className="text-[#E7E7E7] mt-2" />
      {/* Plan card */}
      <div className="flex overflow-x-auto gap-4 my-3 w-[97%] md:w-full pb-2">
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
      <div className="min-h-full border border-[#ECEBFC] rounded-lg my-4 p-3">
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
      <p className="px-4 text-[#242528] pt-2 pb-8 font-semibold underline">
        Compare plans and pricing options
      </p>

      {plans && plans.map((plan, index) => (
          <div className="" key={index}>
            <div className="text-[#866BE7] font-medium text-2xl flex items-end gap-1 mt-3.5">
              <p>{plan.price}</p>
              <span className="text-[#888888] text-sm font-normal">
                {plan.subtext}
              </span>
            </div>
            <p className="text-center text-[#744CDB] my-5">
              *The prices do not include VAT
            </p>
            <Link
              to={
                currentPlan === plan.name
                  ? plan.name === "Spark"
                    ? "#"
                    : "/cancel-subscription"
                  : (currentPlan === "Glow" && plan.name === "Spark") ||
                    (currentPlan === "Bloom" &&
                      (plan.name === "Glow" || plan.name === "Spark"))
                  ? "/success-downgrade"
                  : "/checkout"
              }
              state={{ isMobile, currentPlan }}
              className={`w-full block text-center p-2 rounded-lg my-2 font-medium hover:scale-95 transform transition-all duration-300 ease-in-out
                        ${
                          currentPlan === plan.name
                            ? plan.name === "Spark"
                              ? "bg-[#E4E3FD] text-[#A496EF]"
                              : "border border-[#ED4245] bg-[#FFFFFF] text-[#ED4245]"
                            : "bg-[#744CDB] text-[#FFFFFF]"
                        }
                       `}
            >
              {currentPlan === plan.name
                ? plan.name === "Spark"
                  ? "Current Plan"
                  : "Cancel Subscription"
                : (currentPlan === "Glow" && plan.name === "Spark") ||
                  (currentPlan === "Bloom" &&
                    (plan.name === "Glow" || plan.name === "Spark"))
                ? "Downgrade"
                : "Upgrade"}
            </Link>
          </div>
        ))}
    </>
  );
};

export default MobileSelectPlanContent;

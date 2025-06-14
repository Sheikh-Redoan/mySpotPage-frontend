import { ChevronDown, ChevronUp, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { imageProvider } from "../../../lib/imageProvider";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { slideInFromBottom } from "./../../../animations/variants";

const Upgradeplan = () => {
  const [showAll, setShowAll] = useState(false);
  const location = useLocation();
  const currentPlan = location.state?.currentPlan || "Spark";
  const UpgradeCard = useRef(null);
  const navigate = useNavigate();
  const [planeName, setPlanName] = useState("Spark")
  const [planePrice, setPlanPrice] = useState("")
  const [planeDes, setPlanDes] = useState("")
  console.log(planeName, planePrice, planeDes)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (UpgradeCard.current && !UpgradeCard.current.contains(event.target)) {
        navigate("/dashboard/settings/subscription");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navigate]);

  const cards = [
    {
      title: "Appointment Scheduling",
      desc: "No more endless texts—your clients can book directly.",
    },
    {
      title: "Customer Reviews",
      desc: "Verified client reviews help you stand out and build trust.",
    },
    {
      title: "Hidden Address Feature",
      desc: "Share your location only with confirmed clients.",
    },
    {
      title: "Service Listings",
      desc: "Present your services with clear pricing and durations.",
    },
    {
      title: "Booking Reminders",
      desc: "With automated reminders, you’ll reduce no-shows and save time.",
    },
    {
      title: "Digital Calendar Management",
      desc: "Keep track of every appointment with ease.",
    },
    {
      title: "Professional Profile",
      desc: "Create a professional profile that reflects who you are.",
    },
    {
      title: "Dashboard Overview",
      desc: "See all your bookings in one place.",
    },
    {
      title: "Calendar Rules",
      desc: "Control your time with blackout dates, buffers, and custom availability.",
    },
    {
      title: "Manual Adjustments",
      desc: "Reschedule or modify bookings flexibly.",
    },
  ];

  const plans = [
    {
      name: "Spark",
      price: "Free",
      subtext: "/ 10 Bookings",
      desc: "Start Smart , Dream Big",
      image: imageProvider.spark,
    },
    {
      name: "Glow",
      price: "$79",
      subtext: "/ Month",
      desc: "For the Professional You are",
      image: imageProvider.glow,
    },
    {
      name: "Bloom",
      price: "$149",
      subtext: "/ Month",
      desc: "Lead The Team With Confidence",
      image: imageProvider.bloom,
    },
  ];

  const visibleCards = showAll ? cards : cards.slice(0, 4);

  return (
    <div className="relative">
      <div className="bg-[#24252880] py-8 min-h-screen flex items-center justify-center font-golos">
        <motion.div
          variants={slideInFromBottom()}
          initial="hidden"
          animate="visible"
          ref={UpgradeCard}
          className="bg-[#ffffff] min-h-screen w-[90%] md:w-[66%] rounded-lg">
          <div className="flex justify-between items-center my-2 py-3 px-4">
            <p className="text-lg font-semibold"> Select Plan</p>
            <Link
              className="hover:scale-105"
              to={"/dashboard/settings/subscription"}>
              <X />
            </Link>
          </div>
          <hr className="text-[#E7E7E7]" />
          <p className="text-center text-[#744CDB] my-5 hidden md:block">
            *The prices do not include VAT
          </p>
          {/* Plan card */}
          <div className="flex overflow-x-auto gap-4 my-3 px-4 w-[97%] md:w-full pb-2">
            {plans.map((plan, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    setPlanName(plan.name)
                    setPlanPrice(plan.price)
                    setPlanDes(plan.subtext)
                  }
                  }
                  className={`min-w-[340px] md:min-h-[180px] border rounded-xl md:p-4 pb-3 px-3 transform transition-all duration-300 ease-in-out ${currentPlan === plan.name
                    ? "bg-[#F5F4FE] border-[#866BE7] hover:scale-105"
                    : "hover:scale-95 border-[#D1D1D1]"
                    }`}>
                  <div className="mt-4">
                    <div className="flex items-center gap-3">
                      <img src={plan.image} alt="icon" />
                      <p className="text-lg font-semibold"> {plan.name}</p>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="text-[#866BE7] font-medium text-2xl flex items-end gap-1 mt-3.5">
                      <p>{plan.price}</p>
                      <span className="text-[#888888] text-sm font-normal">
                        {plan.subtext}
                      </span>
                    </div>
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
                      className={`w-full block text-center p-2 rounded-lg my-2 font-medium hover:scale-95 transform transition-all duration-300 ease-in-out
                        ${currentPlan === plan.name
                          ? plan.name === "Spark"
                            ? "bg-[#E4E3FD] text-[#A496EF]"
                            : "border border-[#ED4245] bg-[#FFFFFF] text-[#ED4245]"
                          : "bg-[#744CDB] text-[#FFFFFF]"
                        }
                       `}>
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
                  <p className="text-[#262626] font-medium text-sm mt-2">
                    {plan.desc}
                  </p>
                </div>
              );
            })}
          </div>
          {/* ........... */}
          <div className="min-h-full border border-[#ECEBFC] rounded-lg my-4 mx-4 p-3">
            <p className="text-[#797979] px-2">
              Starting your own business can feel overwhelming, but it doesn’t
              have to. Spark is here to give you the foundation you need to grow
              without the stress.
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
                  className="text-[#744CDB] font-medium underline flex items-center justify-center gap-2 cursor-pointer">
                  {showAll ? "Show Less" : "Show More"}
                  <span>
                    {showAll ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </span>
                </button>
              </div>
            </div>
          </div>
          <p className="px-4 text-[#242528] pt-2 pb-8 font-semibold underline">
            Compare plans and pricing options
          </p>
        </motion.div>
      </div>
      <div className="fixed bottom-0 bg-white w-full z-50 shadow-2xl py-5 md:hidden">
        {planeName === "Spark" &&
          <div className="flex justify-between items-center px-2">
            <div className="space-y-3">
              <div className="text-[#866BE7] font-medium text-2xl flex items-end gap-1 mt-3.5">
                <p>{planePrice}</p>
                <span className="text-[#888888] text-sm font-normal">
                  {planeDes}
                </span>
              </div>
              <p className="text-[#744CDB] text-sm">
                *The prices do not include VAT
              </p>
            </div>
            <button className="text-primary01 bg-highlight01 py-2 px-6 rounded-md mt-7">
              <Link>Current Plan</Link>
            </button>
          </div>
        }
        {planeName === "Bloom" &&
          <div className="flex justify-between items-center px-2">
            <div className="space-y-3">
              <div className="text-[#866BE7] font-medium text-2xl flex items-end gap-1 mt-3.5">
                <p>{planePrice}</p>
                <span className="text-[#888888] text-sm font-normal">
                  {planeDes}
                </span>
              </div>
              <p className="text-[#744CDB] text-sm">
                *The prices do not include VAT
              </p>
            </div>
            <button className="text-white bg-primary01 py-2 px-6 rounded-md mt-7"><Link>
              Upgrade
            </Link></button>
          </div>
        }
        {planeName === "Glow" &&
          <div className="flex justify-between items-center px-2">
            <div className="space-y-3">
              <div className="text-[#866BE7] font-medium text-2xl flex items-end gap-1 mt-3.5">
                <p>{planePrice}</p>
                <span className="text-[#888888] text-sm font-normal">
                  {planeDes}
                </span>
              </div>
              <p className="text-[#744CDB] text-sm">
                *The prices do not include VAT
              </p>
            </div>
            <button className="text-white bg-primary01 py-2 px-6 rounded-md mt-7">
              <Link>
              Upgrade
            </Link></button>
          </div>
        }
      </div>
    </div>
  );
};

export default Upgradeplan;

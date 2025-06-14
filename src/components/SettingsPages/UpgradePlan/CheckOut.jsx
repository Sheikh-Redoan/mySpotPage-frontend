import { X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  ErrorIcon,
  MastardIcon,
  PaymentSecure,
  VisaIcon,
} from "../../../assets/icons/icons2";
import { imageProvider } from "../../../lib/imageProvider";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { slideInFromLeft } from "../../../animations/variants";
import { Drawer } from "antd";

const CheckOut = () => {
  const navigate = useNavigate();
  const UpgradeCard = useRef(null);
  const isSubmitting = useRef(false);

  const [open, setOpen] = useState(true);
  const location = useLocation();
  const isMobile = location.state?.isMobile || false;

  // for modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (UpgradeCard.current && !UpgradeCard.current.contains(event.target)) {
        navigate("/upgrade-plan");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navigate]);

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      phone: "",
      cardNumber: "",
      nameOnCard: "",
      idNumber: "",
      expiryDate: "",
      cvv: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Submitted Data:", data);
    navigate("/success-upgrade");
  };

  const handleExternalSubmit = () => {
    if (isSubmitting.current) {
      isSubmitting.current.requestSubmit();
    }
  };

  if (isMobile) {
    return (
      <Drawer
        placement={"bottom"}
        closable={false}
        height="90%"
        onClose={() => setOpen(false)}
        open={open}
      >
        <motion.div
          variants={slideInFromLeft()}
          initial="hidden"
          animate="visible"
          ref={UpgradeCard}
          className="bg-[#ffffff] w-full rounded-lg"
        >
          <div className="flex justify-between items-center mb-1">
            <p className="text-lg font-semibold"> Check Out</p>
            <Link className="hover:scale-105" to={"/upgrade-plan"} state={{ isMobile }}>
              <X />
            </Link>
          </div>
          <hr className="text-[#E7E7E7]" />

          <div className="flex flex-col lg:flex-row gap-8 mt-4 mb-4 w-full">
            <div className="w-full lg:w-[55%] space-y-2">
              <div>
                <h2 className="text-lg font-semibold mb-4">
                  Contact Information
                </h2>
                <label className="block mb-2 text-[#3A3B3F]">
                  Phone Number <span className="text-orange-600">*</span>
                </label>
                <input
                  type="text"
                  {...register("phone", { required: true })}
                  placeholder="Phone number"
                  className="w-full px-3 py-2 border border-[#E5E7E8] rounded-lg "
                />
              </div>

              <div>
                <div className="flex justify-between items-center my-4">
                  <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
                  <p className="text-[#3BA55C] flex items-center gap-1">
                    <PaymentSecure /> Secure Payment
                  </p>
                </div>

                <form
                  ref={isSubmitting}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="relative w-full">
                    <label className="block mb-2 text-[#3A3B3F]">
                      Card Number <span className="text-orange-600">*</span>
                    </label>

                    <div className="relative">
                      <input
                        {...register("cardNumber", { required: true })}
                        type="text"
                        placeholder="0000-0000-0000-0000"
                        className="w-full px-3 py-2 pr-24 border border-[#E5E7E8] rounded-lg"
                      />

                      <div className="absolute top-1/2 right-3 transform -translate-y-1/2 flex items-center gap-2">
                        <VisaIcon className="w-8 h-8" />
                        <MastardIcon className="w-6 h-6" />
                        <img
                          className="w-5 h-5"
                          src={imageProvider.amrican}
                          alt="icon"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <label className="block mb-2 text-[#3A3B3F]">
                        Name on Card <span className="text-orange-600">*</span>
                      </label>
                      <input
                        type="text"
                        {...register("name", { required: true })}
                        placeholder="Name"
                        className="w-full px-3 py-2 border border-[#E5E7E8] rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block mb-2 text-[#3A3B3F]">
                        ID Number <span className="text-orange-600">*</span>
                      </label>
                      <input
                        type="text"
                        {...register("idNumber", { required: true })}
                        placeholder="ID Number"
                        className="w-full px-3 py-2 border border-[#E5E7E8] rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <label className="block mb-2 text-[#3A3B3F]">
                        Expiry Date <span className="text-orange-600">*</span>
                      </label>
                      <input
                        type="text"
                        {...register("date", { required: true })}
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 border border-[#E5E7E8] rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block mb-2 text-[#3A3B3F]">
                        CVV <span className="text-orange-600">*</span>
                      </label>
                      <input
                        type="text"
                        {...register("cvv", { required: true })}
                        placeholder="CVV"
                        className="w-full px-3 py-2 border border-[#E5E7E8] rounded-lg"
                      />
                    </div>
                  </div>
                </form>
                <div className="px-1.5 py-4 flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-[#866BE7] border-[2px] border-[#CED0D3] rounded-md"
                  />
                  <label
                    htmlFor="setDefault"
                    className="text-[#262626] cursor-pointer"
                  >
                    Set as Default
                  </label>
                </div>
              </div>
            </div>

            {/* Right: Summary Section*/}
            <div className="w-full lg:w-[40%] space-y-2">
              <div className="space-y-2">
                <div className="flex justify-between text-lg rounded-xl p-4.5 bg-[#F5F4FE] mb-6">
                  <p className="font-semibold">Glow</p>
                  <p className="text-sm">
                    <span className="text-xl font-semibold text-[#866BE7]">
                      $79
                    </span>{" "}
                    / Month
                  </p>
                </div>
                <div className="flex justify-between mt-6 px-3">
                  <p className="text-[#888888]">Subtotal</p>
                  <p className="text-[#262626]">$79 .00</p>
                </div>
                <div className="flex justify-between mt-4 pb-6 px-3 border-b border-dotted border-gray-400">
                  <p className="text-[#888888] flex gap-1 items-center ">
                    VAT
                    <ErrorIcon className=" text-[#b5aeae]" />
                  </p>
                  <p className="text-[#262626]">$14.32</p>
                </div>

                <div className="flex justify-between text-lg my-6 px-3">
                  <p className="text-[#262626] font-semibold">Total</p>
                  <p className="text-[#262626 text-[#866BE7] font-semibold text-xl">
                    $140.32
                  </p>
                </div>
              </div>

              <button
                onClick={handleExternalSubmit}
                type="submit"
                className={`w-full py-3 rounded-xl font-semibold transition duration-300 ${
                  isValid
                    ? "bg-[#242528] text-white"
                    : "bg-[#E5E7E8] text-[#82868E] cursor-not-allowed"
                }`}
                disabled={!isValid}
              >
                Complete
              </button>

              <p className="my-2 text-sm text-[#7D828B] leading-normal">
                By clicking ‘Complete’, you agree to our{" "}
                <span className="underline cursor-pointer font-medium text-[#866BE7]">
                  Terms of Service
                </span>{" "}
                and our{" "}
                <span className="underline cursor-pointer font-medium text-[#866BE7]">
                  Privacy Policy
                </span>
                .
              </p>
            </div>
          </div>
        </motion.div>
      </Drawer>
    );
  }

  return (
    <div className="bg-[#24252880] min-h-[100vh] py-8  flex items-center justify-center font-golos">
      <motion.div
        variants={slideInFromLeft()}
        initial="hidden"
        animate="visible"
        ref={UpgradeCard}
        className="bg-[#ffffff] min-h-[580px] w-[960px] rounded-lg"
      >
        <div className="flex justify-between items-center my-2 py-3 px-6">
          <p className="text-lg font-semibold"> Check Out</p>
          <Link className="hover:scale-105" to={"/upgrade-plan"}>
            <X />
          </Link>
        </div>
        <hr className="text-[#E7E7E7]" />

        <div className="flex flex-col lg:flex-row gap-8 mt-8 mb-4 w-full px-6">
          <div className="w-full lg:w-[55%] space-y-2">
            <div>
              <h2 className="text-lg font-semibold mb-4">
                Contact Information
              </h2>
              <label className="block mb-2 text-[#3A3B3F]">
                Phone Number <span className="text-orange-600">*</span>
              </label>
              <input
                type="text"
                {...register("phone", { required: true })}
                placeholder="Phone number"
                className="w-full px-3 py-2 border border-[#E5E7E8] rounded-lg "
              />
            </div>

            <div>
              <div className="flex justify-between items-center my-4">
                <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
                <p className="text-[#3BA55C] flex items-center gap-1">
                  <PaymentSecure /> Secure Payment
                </p>
              </div>

              <form
                ref={isSubmitting}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="relative w-full">
                  <label className="block mb-2 text-[#3A3B3F]">
                    Card Number <span className="text-orange-600">*</span>
                  </label>

                  <div className="relative">
                    <input
                      {...register("cardNumber", { required: true })}
                      type="text"
                      placeholder="0000-0000-0000-0000"
                      className="w-full px-3 py-2 pr-24 border border-[#E5E7E8] rounded-lg"
                    />

                    <div className="absolute top-1/2 right-3 transform -translate-y-1/2 flex items-center gap-2">
                      <VisaIcon className="w-8 h-8" />
                      <MastardIcon className="w-6 h-6" />
                      <img
                        className="w-5 h-5"
                        src={imageProvider.amrican}
                        alt="icon"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block mb-2 text-[#3A3B3F]">
                      Name on Card <span className="text-orange-600">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("name", { required: true })}
                      placeholder="Name"
                      className="w-full px-3 py-2 border border-[#E5E7E8] rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block mb-2 text-[#3A3B3F]">
                      ID Number <span className="text-orange-600">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("idNumber", { required: true })}
                      placeholder="ID Number"
                      className="w-full px-3 py-2 border border-[#E5E7E8] rounded-lg"
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block mb-2 text-[#3A3B3F]">
                      Expiry Date <span className="text-orange-600">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("date", { required: true })}
                      placeholder="MM/YY"
                      className="w-full px-3 py-2 border border-[#E5E7E8] rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block mb-2 text-[#3A3B3F]">
                      CVV <span className="text-orange-600">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("cvv", { required: true })}
                      placeholder="CVV"
                      className="w-full px-3 py-2 border border-[#E5E7E8] rounded-lg"
                    />
                  </div>
                </div>
              </form>
              <div className="px-1.5 py-4 flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-[#866BE7] border-[2px] border-[#CED0D3] rounded-md"
                />
                <label
                  htmlFor="setDefault"
                  className="text-[#262626] cursor-pointer"
                >
                  Set as Default
                </label>
              </div>
            </div>
          </div>

          {/* Right: Summary Section*/}
          <div className="w-full lg:w-[40%] space-y-2">
            <div className="space-y-2">
              <div className="flex justify-between text-lg rounded-xl p-4.5 bg-[#F5F4FE] mb-6">
                <p className="font-semibold">Glow</p>
                <p className="text-sm">
                  <span className="text-xl font-semibold text-[#866BE7]">
                    $79
                  </span>{" "}
                  / Month
                </p>
              </div>
              <div className="flex justify-between mt-6 px-3">
                <p className="text-[#888888]">Subtotal</p>
                <p className="text-[#262626]">$79 .00</p>
              </div>
              <div className="flex justify-between mt-4 pb-6 px-3 border-b border-dotted border-gray-400">
                <p className="text-[#888888] flex gap-1 items-center ">
                  VAT
                  <ErrorIcon className=" text-[#b5aeae]" />
                </p>
                <p className="text-[#262626]">$14.32</p>
              </div>

              <div className="flex justify-between text-lg my-6 px-3">
                <p className="text-[#262626] font-semibold">Total</p>
                <p className="text-[#262626 text-[#866BE7] font-semibold text-xl">
                  $140.32
                </p>
              </div>
            </div>

            <button
              onClick={handleExternalSubmit}
              type="submit"
              className={`w-full py-3 rounded-xl font-semibold transition duration-300 ${
                isValid
                  ? "bg-[#242528] text-white"
                  : "bg-[#E5E7E8] text-[#82868E] cursor-not-allowed"
              }`}
              disabled={!isValid}
            >
              Complete
            </button>

            <p className="my-2 text-sm text-[#7D828B] leading-normal">
              By clicking ‘Complete’, you agree to our{" "}
              <span className="underline cursor-pointer font-medium text-[#866BE7]">
                Terms of Service
              </span>{" "}
              and our{" "}
              <span className="underline cursor-pointer font-medium text-[#866BE7]">
                Privacy Policy
              </span>
              .
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CheckOut;

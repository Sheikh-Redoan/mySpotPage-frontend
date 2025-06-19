import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { MastardIcon, VisaIcon } from "../../../assets/icons/icons2";
import { imageProvider } from "../../../lib/imageProvider";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { slideInFromBottom } from "../../../animations/variants";
import { Drawer } from "antd";
import { useState } from "react";
import { X } from "lucide-react";
import { MoveLeft } from "lucide-react";

const AddCard = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const loacation = useLocation();
  const isMobile = loacation.state?.isMobile || false;

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

    navigate("/dashboard/settings/subscription");
  };

  if (isMobile) {
    return (
      <>
        <Drawer
          placement={"bottom"}
          closable={false}
          height="72%"
          onClose={() => setOpen(false)}
          open={open}
          className="rounded-t-lg"
        >
          <motion.div
            variants={slideInFromBottom()}
            initial="hidden"
            animate="visible"
            className="bg-[#ffffff] w-full rounded-lg"
          >
            <div className="flex justify-between items-center py-2.5 px-4">
              <div className="flex items-center gap-2">
                <Link to={"/dashboard/settings/subscription"}>
                  <MoveLeft className="text-description" />
                </Link>
                <p className="text-xl font-semibold"> Add Card</p>
              </div>
              <Link
                className="hover:scale-105"
                to={"/dashboard/settings/subscription"}
              >
                <X className="text-description" />
              </Link>
            </div>

            <hr className="text-[#E7E7E7] py-3" />
            <div className="">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="p-2">
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

                <div className="fixed bottom-0 gap-4 bg-white py-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] w-full flex justify-center">
                  <button
                    type="submit"
                    className={`py-2 rounded-lg bg-gray-900 w-[95%] text-white text-xl`}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </Drawer>
        <style>
          {`
          .ant-drawer-body {
            padding: 0 !important;
          }
        `}
        </style>
      </>
    );
  }

  return (
    <div className="bg-[#24252880] min-h-[100vh] py-8  flex items-center justify-center font-golos">
      <motion.div
        variants={slideInFromBottom()}
        initial="hidden"
        animate="visible"
        className="bg-[#ffffff] min-h-[430px] w-[490px] rounded-lg"
      >
        <div className=" my-2 py-3 px-6">
          <p className="text-xl font-semibold"> Add Card</p>
        </div>
        <hr className="text-[#E7E7E7] py-3" />
        <div className="p-5">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

            <div className="flex items-center justify-end gap-4 py-2">
              <Link to={"/dashboard/settings/subscription"}>
                <button className="text-[#242528] font-semibold">Cancel</button>
              </Link>
              <button
                type="submit"
                className={`py-2 px-3 rounded-lg ${isValid
                  ? "bg-[#242528] text-white"
                  : "bg-gray-300 text-gray-500"
                  }`}
                disabled={!isValid}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AddCard;

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { MastardIcon, VisaIcon } from "../../../assets/icons/icons2";
import { imageProvider } from "../../../lib/imageProvider";

const AddCard = () => {
  const navigate = useNavigate();
  const [isDefault, setIsDefault] = useState(false);

  //   for all input
  const defaultData = {
    phone: "9876543210",
    cardNumber: "1234-5678-9012-3456",
    nameOnCard: "Visa Card",
    idNumber: "ID987654",
    expiryDate: "12/28",
    cvv: "123",
  };

  const {
    register,
    handleSubmit,
    setValue,
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
    const newCard = {
      id: 1,
      image: imageProvider.mastard,
      number: "**********72872",
      expiry: "5/06/25",
      isDefault: false,
    };
    navigate("/settings/subscription", { state: { newCard } });
  };

  const handleCheckboxChange = () => {
    setIsDefault((prev) => !prev);
  };

  useEffect(() => {
    if (isDefault) {
      Object.entries(defaultData).forEach(([key, value]) => {
        setValue(key, value);
      });
    } else {
      Object.keys(defaultData).forEach((key) => setValue(key, ""));
    }
  }, [isDefault, setValue]);

  return (
    <div className="bg-[#24252880] min-h-[100vh] py-8  flex items-center justify-center font-golos">
      <div className="bg-[#ffffff] min-h-[430px] w-[490px] rounded-lg">
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
                id="setDefault"
                checked={isDefault}
                onChange={handleCheckboxChange}
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
              <Link to={"/settings/subscription"}>
                <button className="text-[#242528] font-semibold">Cancel</button>
              </Link>
              <button
                type="submit"
                className={`py-2 px-3 rounded-lg ${
                  isValid
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
      </div>
    </div>
  );
};

export default AddCard;

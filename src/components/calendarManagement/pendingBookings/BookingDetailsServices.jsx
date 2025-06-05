import { Trash2 } from "lucide-react";
import { IoIosArrowDown } from "react-icons/io";
import React from "react";

const BookingDetailsServices = ({ services }) => {
  // console.log("services", services);

  return (
    <div>
      <div className="w-full mt-4 border-b-[2px] border-dashed border-b-gray-300">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex items-center rounded-lg mb-2 p-2 border-[1px] border-[#F6F6F6] shadow-md"
          >
            <div className="mr-4">
              {(service.name.includes("Ombre") ||
                service.name.includes("Balayage")) && (
                <img
                  src="https://placehold.co/80x80/png"
                  alt={service.name}
                  className="w-20 h-20 rounded-md object-cover"
                />
              )}
            </div>
            <div className="flex-grow">
              <div className="flex justify-between items-center mb-1">
                <h3 className="m-0 text-sm font-medium text-[#262626]">
                  {service.name}
                </h3>
                <span className="cursor-pointer text-red-600 flex items-center">
                  <Trash2 size={16} />
                </span>
              </div>
              {service.tags.length > 0 && (
                <div className="mb-2">
                  {service.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="border-[1px] border-[#866BE7] rounded-full px-2 py-1 text-[#866BE7] text-xs font-normal"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-[#888888] font-normal text-sm">
                  {service.duration}
                </span>
                <span className="text-sm font-normal text-[#262626]">
                  ₪{service.price}
                </span>
              </div>
            </div>
          </div>
        ))}
        <div className="my-5 text-[#9F9F9F] cursor-pointer text-sm flex gap-2 items-center">
          Show less <IoIosArrowDown size={14} />
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-[#242528] font-semibold text-lg">
          Service Output{" "}
          <span className="text-[#B0B0B0] text-sm font-normal">
            (No required)
          </span>
        </h3>
      </div>
    </div>
  );
};

export default BookingDetailsServices;

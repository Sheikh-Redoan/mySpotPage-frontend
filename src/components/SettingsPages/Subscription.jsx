import { Button, DatePicker } from "antd";
import { imageProvider } from "../../lib/imageProvider";
import { Plus } from "lucide-react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Table } from "antd";
import { useState } from "react";
import PlanCard from "../reuseableComponent/PlanCard";
import { Link } from "react-router";
import BillingHistoryTableByProvider from "./BillingHistoryTableByProvider";

dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;

const dateFormat = "YYYY/MM/DD";

const Subscription = () => {
  const [selectedDates, setSelectedDates] = useState(null);
  const [currentPlan] = useState("Glow");
  const currentBookings = 5;
  const bookingLimit = 10;

  const handleDateChange = (dates) => {
    if (dates && dates[0] && dates[1]) {
      setSelectedDates(dates);
    } else {
      setSelectedDates(null);
    }
  };

  return (
    <div className="min-h-full">
      {currentPlan === "Spark" && currentBookings >= 8 && (
        <div className="flex gap-4 bg-[#FFE6E6] rounded-md py-2 pl-2 md:pl-4 my-4">
          <img
            className="object-contain"
            src={imageProvider.subscriptionAlert}
            alt="icon"
          />
          <p className="text-[#ED4245]">
            Only {bookingLimit - currentBookings} bookings left before you reach
            your 10-booking limit. Upgrade now for no interruption.
          </p>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6 w-full my-2">
        {/* card */}
        {currentPlan === "Spark" && (
          <PlanCard
            planName="Spark"
            image={imageProvider.spark}
            price="Free"
            unit="/ 10 bookings"
            currentBookings={currentBookings}
            bookingLimit={bookingLimit}
          />
        )}
        {currentPlan === "Glow" && (
          <PlanCard
            planName="Glow"
            image={imageProvider.glow}
            price="$79"
            unit="/ month"
            startDate="2025/01/01"
            endDate="2025/12/31"
            showDates={true}
            showCancel={true}
          />
        )}
        {currentPlan === "Bloom" && (
          <PlanCard
            planName="Bloom"
            image={imageProvider.bloom}
            price="$149"
            unit="/ month"
            startDate="2025/01/01"
            endDate="2025/12/31"
            showDates={true}
            showCancel={true}
          />
        )}

        <div className="md:min-w-[660px] h-[260px] flex-[6] bg-[#FFFFFF] p-2 md:p-5 rounded-lg hover:scale-95 transform transition-all duration-300 ease-in-ou">
          <div className="flex flex-col md:flex-row justify-between items-start my-2 space-y-4">
            <div>
              <h2 className="text-[#262626] font-semibold text-base md:text-xl pb-2">
                Payment Method
              </h2>

              <p className="text-[#888888]">
                No payment method yet — add one to keep your plan running
                smoothly.
              </p>
            </div>
            <div>
              <Link to={"/add-card"} className="max-md:hidden">
                <Button color="primary" variant="outlined">
                  <Plus /> Add Card
                </Button>
              </Link>
              {/* Mobile View */}
              <Link
                to={"/add-card"}
                className="md:hidden"
                state={{ isMobile: true }}
              >
                <Button color="primary" variant="outlined">
                  <Plus /> Add Card
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="min-w-full min-h-[480px] bg-[#FFFFFF] p-2 md:p-5 my-6 rounded-lg flex flex-col justify-between">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between my-2">
          <h2 className="text-[#262626] font-semibold text-lg">
            Billing History
          </h2>
          <div className="flex flex-row sm:flex-col custom-range-picker-wrapper md:mx-4 border border-gray-300 rounded-lg md:py-2 px-1 mt-3 md:mt-0">
            <RangePicker
              format={dateFormat}
              defaultValue={[
                dayjs("2025/01/01", dateFormat),
                dayjs("2026/01/01", dateFormat),
              ]}
              bordered={false}
              className="custom-range-picker w-full"
              onChange={handleDateChange}
              dropdownClassName="vertical-range-picker"
            />
          </div>
        </div>

        {/* Bottom Section */}
        {!selectedDates ? (
          <div className="flex justify-center items-center flex-grow mt-10">
            <div className="text-center">
              <img
                src={imageProvider.emtyBilling}
                alt="icon"
                className="mx-auto"
              />
              <h2 className="text-lg font-semibold my-4">
                No Billing History Found
              </h2>
              <p className="text-gray-500 w-[80%] mx-auto ">
                You don’t have any billing records yet. Your transactions will
                appear here once you make a payment.
              </p>
            </div>
          </div>
        ) : (
          <BillingHistoryTableByProvider />
        )}
      </div>
    </div>
  );
};

export default Subscription;

import { Flex, Progress } from "antd";
import dayjs from "dayjs";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";

const PlanCard = ({
  planName,
  image,
  price,
  unit,
  currentBookings,
  bookingLimit,
  startDate,
  endDate,
  showDates = false,
  showCancel = false,
}) => {
  const progressPercent = showDates
    ? (dayjs().diff(dayjs(startDate), "day") /
        dayjs(endDate).diff(dayjs(startDate), "day")) *
      100
    : (currentBookings / bookingLimit) * 100;

  return (
    <div className="min-w-[460px] min-h-[210px] flex-[4] bg-white p-5 rounded-lg hover:scale-105 transform transition-all duration-300 ease-in-ou">
      <h3 className="text-[#262626] font-semibold text-lg my-2">Active Plan</h3>

      <div className="flex justify-between items-center my-4">
        <div className="flex items-center gap-3">
          <img src={image} alt="icon" />
          <p>{planName}</p>
        </div>
        <div className="text-[#866BE7] font-medium text-xl">
          {price}{" "}
          <span className="text-[#888888] text-sm font-normal">{unit}</span>
        </div>
      </div>

      <div className="my-3">
        {showDates ? (
          <p className="text-[#888888] text-sm pt-2">
            {startDate} to {endDate}
          </p>
        ) : (
          <p className="text-[#888888] text-sm pt-2">
            {currentBookings} / {bookingLimit} bookings
          </p>
        )}

        <Flex gap="small" vertical>
          <Progress
            percent={Math.round(progressPercent)}
            strokeColor="#001342"
            showInfo={false}
          />
        </Flex>
      </div>

      <hr className="text-gray-200 mt-3" />

      <div
        className={`pt-5 text-sm font-medium flex ${
          showCancel ? "justify-between" : "justify-end"
        }`}>
        <Link to={"/cancel-subscription"}>
          {showCancel && (
            <p className="text-red-500 underline cursor-pointer">
              Cancel Subscription
            </p>
          )}
        </Link>

        <Link to={"/upgrade-plan"} state={{ currentPlan: planName }}>
          <p className="text-[#744CDB] underline flex items-center gap-2">
            Upgrade Plan <ArrowUpRight size={20} />
          </p>
        </Link>
      </div>
    </div>
  );
};

export default PlanCard;

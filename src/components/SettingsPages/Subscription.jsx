import { DatePicker } from "antd";
import { imageProvider } from "../../lib/imageProvider";
import { Plus } from "lucide-react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Table } from "antd";
import { useState } from "react";
import PlanCard from "../reuseableComponent/PlanCard";
import { Link} from "react-router";

dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;

const dateFormat = "YYYY/MM/DD";

// table data
const columns = [
  {
    title: "Billing Time",
    dataIndex: "time",
    key: "time",
    sorter: (a, b) => {
      const toMinutes = (t) => {
        const [h, m] = t.split(":").map(Number);
        return h * 60 + m;
      };
      return toMinutes(a.time) - toMinutes(b.time);
    },
    defaultSortOrder: "descend",
  },
  {
    title: "Plan Name / Duration",
    dataIndex: "plan",
    key: "plan",
  },
  {
    title: "Payment Method",
    dataIndex: "payment",
    key: "payment",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    sorter: (a, b) => parseFloat(a.amount) - parseFloat(b.amount),
  },
  {
    title: "Plan Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: <span className="font-semibold text-white">Action</span>,
    dataIndex: "action",
    key: "action",
  },
];

const data = [
  {
    key: "1",
    time: "05:32",
    plan: "Bloom Plan",
    payment: "Visa ............. 2349",
    amount: 120,
    status: "Active",
    action: "Download Invoice",
  },
  {
    key: "2",
    time: "08:32",
    plan: "Bloom Plan",
    payment: "Visa ............. 2349",
    amount: 170,
    status: "Expired",
    action: "Download Invoice",
  },
  {
    key: "3",
    time: "08:35",
    plan: "Bloom Plan",
    payment: "Visa ............. 2349",
    amount: 190,
    status: "Active",
    action: "Download Invoice",
  },
  {
    key: "4",
    time: "10:32",
    plan: "Bloom Plan",
    payment: "Visa ............. 2349",
    amount: 110,
    status: "Canceled",
    action: "Download Invoice",
  },
  {
    key: "5",
    time: "09:32",
    plan: "Bloom Plan",
    payment: "Visa ............. 2349",
    amount: 180,
    status: "Active",
    action: "Download Invoice",
  },
  {
    key: "6",
    time: "03:32",
    plan: "Bloom Plan",
    payment: "Visa ............. 2349",
    amount: 140,
    status: "Canceled",
    action: "Download Invoice",
  },
  {
    key: "7",
    time: "02:32",
    plan: "Bloom Plan",
    payment: "Visa ............. 2349",
    amount: 120,
    status: "Canceled",
    action: "Download Invoice",
  },
  {
    key: "8",
    time: "06:32",
    plan: "Bloom Plan",
    payment: "Visa ............. 2349",
    amount: 150,
    status: "Active",
    action: "Download Invoice",
  },
];

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
        <div className="flex gap-4 bg-[#FFE6E6] rounded-md py-2 pl-4 my-4">
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

      <div className="flex gap-6 w-full my-2">
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

        <div className="min-w-[660px] h-[260px] flex-[6] bg-[#FFFFFF] p-5 rounded-lg hover:scale-95 transform transition-all duration-300 ease-in-ou">
          <div className="flex justify-between items-start my-2">
            <div>
              <h2 className="text-[#262626] font-semibold text-xl pb-2">
                Payment Method
              </h2>

              <p className="text-[#888888]">
                No payment method yet — add one to keep your plan running
                smoothly.
              </p>
            </div>
            <div>
              <Link to={"/add-card"}>
                <button className="flex gap-2 font-semibold border border-[#744CDB] text-[#744CDB] px-3.5 py-2 shadow-md rounded-md hover:scale-95 transform transition-all ease-in-out duration-300">
                  <Plus /> Add Card
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="min-w-full min-h-[480px] bg-[#FFFFFF] p-5 my-6 rounded-lg flex flex-col justify-between">
        {/* Top Section */}
        <div className="flex justify-between my-2">
          <h2 className="text-[#262626] font-semibold text-lg">
            Billing History
          </h2>
          <div className="custom-range-picker-wrapper mx-4 border border-gray-300 rounded-lg py-2 px-1">
            <RangePicker
              format={dateFormat}
              defaultValue={[
                dayjs("2025/01/01", dateFormat),
                dayjs("2026/01/01", dateFormat),
              ]}
              bordered={false}
              className="custom-range-picker"
              onChange={handleDateChange}
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
          <div className="overflow-x-auto my-4 rounded shadow-md">
            <Table
              columns={columns}
              dataSource={data}
              pagination={{ pageSize: 5 }}
              scroll={{ x: 1000 }}
              className="custom-ant-table"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Subscription;

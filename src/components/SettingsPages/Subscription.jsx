import { DatePicker, Flex, Progress, Space } from "antd";
import { imageProvider } from "../../lib/imageProvider";
import { ArrowUpRight, Plus } from "lucide-react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Table } from "antd";

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

const onChange = (pagination, sorter) => {
  console.log("params", pagination, sorter);
};

const Subscription = () => {
  const bookingLimit = 10;
  const currentBookings = 9;
  const progressPercent = (currentBookings / bookingLimit) * 100;

  return (
    <div className="min-h-full">
      {currentBookings >= 8 && (
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
        <div className="min-w-[460px] min-h-[210px] flex-[4] bg-[#FFFFFF] p-5 rounded-md shadow-md">
          <h3 className="text-[#262626] font-semibold text-lg my-2">
            Active Plan
          </h3>
          <div className="flex justify-between items-center my-4">
            <div className="flex items-center gap-3">
              <img src={imageProvider.activePlan} alt="icon" />
              <p>Spark</p>
            </div>
            <div className="text-[#866BE7] font-medium text-xl">
              Free{" "}
              <span className="text-[#888888] text-sm font-normal">
                / 10 bookings
              </span>
            </div>
          </div>
          <div className="my-3">
            <p className="text-[#888888] text-sm pt-2">
              {currentBookings} / {bookingLimit} bookings
            </p>
            <Flex gap="small" vertical>
              <Progress
                percent={progressPercent}
                strokeColor="#001342"
                showInfo={false}
              />
            </Flex>
          </div>
          <hr className="text-gray-200 mt-3" />
          <div className="flex justify-end pt-5 text-[#744CDB] underline text-sm font-medium">
            <p className="flex gap-2">
              Upgrade Plan <ArrowUpRight />
            </p>
          </div>
        </div>

        <div className="min-w-[660px] min-h-[210px] flex-[6] bg-[#FFFFFF] p-5 rounded-md shadow-md">
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
              <button className="flex gap-2 font-semibold border border-[#744CDB] text-[#744CDB] px-4 py-2.5 rounded-md hover:scale-95 transform transition-all ease-in-out duration-300">
                <Plus /> Add Card
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="min-w-full min-h-[460px] bg-[#FFFFFF] p-5 my-6 rounded-md shadow-md flex flex-col justify-between">
        {/* Top Section */}
        <div className="flex justify-between my-2">
          <h2 className="text-[#262626] font-semibold text-lg">
            Billing History
          </h2>
          <div className="border border-gray-300 rounded-lg py-2.5 px-1 mx-4">
            <RangePicker
              format={dateFormat}
              defaultValue={[
                dayjs("2015/01/01", dateFormat),
                dayjs("2015/01/01", dateFormat),
              ]}
              bordered={false}
            />
          </div>
        </div>

        {/* Bottom Section */}
        {/* <div className="flex justify-center items-center flex-grow">
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
        </div> */}

        <div className="overflow-x-auto my-4 rounded shadow-md">
          <Table
            columns={columns}
            dataSource={data}
            onChange={onChange}
            pagination={{ pageSize: 5 }}
            scroll={{ x: 1000 }}
            className="custom-ant-table"
          />
        </div>
      </div>
    </div>
  );
};

export default Subscription;

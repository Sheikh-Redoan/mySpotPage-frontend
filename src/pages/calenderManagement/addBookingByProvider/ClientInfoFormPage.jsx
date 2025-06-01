import { Input } from "antd";
import { AutoComplete } from "antd";

const options = [
  { value: "Burns Bay Road" },
  { value: "Downing Street" },
  { value: "Wall Street" },
];

const ClientInfoFormPage = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
      <div className="p-5 rounded-xl bg-[#FFFFFF] shadow-md space-y-3 flex-1">
        <h3 className="text-[#262626] text-[16px] fonnt-semibold">
          Client Information
        </h3>
        <div className="flex items-center gap-2">
          <div className="w-1/2 flex flex-col gap-1">
            <label htmlFor="name">Name</label>
            <AutoComplete
              style={{ width: "100%" }}
              options={options}
              placeholder="try to type `b`"
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
              }
              size="medium"
            />
          </div>
          <div className="w-1/2 flex flex-col gap-1">
            <label htmlFor="phone">Phone Number</label>
            <Input placeholder="Your Phone Number" />
          </div>
        </div>
      </div>
      <div>booking checkout summary</div>
    </div>
  );
};

export default ClientInfoFormPage;

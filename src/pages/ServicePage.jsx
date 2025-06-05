import { Input } from "antd";
import { SearchOutlined } from "../assets/icons/icons";
import { PlusIcon } from "lucide-react";
import { PhotoIcon } from "../assets/icons/icons2";
import ServiceTable from "../components/DashboardPageComponents/shared/ServiceTable";
import AddNewService from "../components/DashboardPageComponents/shared/AddNewService";
import { useState } from "react";
import React from "react";
import { Button, Popover, Space, Radio } from "antd";

function ServicePage() {
  const [beforeAfter, setBeforeAfter] = useState("");
  const [addNewService, setAddNewService] = useState(false);
  const [selectedOption, setSelectedOption] = useState(2);
  const [popoverVisible, setPopoverVisible] = useState(false);

  const handleSearch = (value) => {
    console.log(value);
  };

  const content = (
    <div className="-right-[80px] top-24 bg-white rounded-lg">
      <Radio.Group
        name="radiogroup"
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
        className="!flex flex-col gap-2 !mt-4"
      >
        <Radio value={1}>Before & After</Radio>
        <Radio value={2}>Only Outcome</Radio>
      </Radio.Group>

      <div className="!flex gap-4 mt-4 w-full">
        <Button
          onClick={() => setPopoverVisible(false)} // Close on Cancel
          className="!border !border-gray-900 !text-black !px-5 !py-5 !w-full !text-sm !font-semibold"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            const selectedLabel =
              selectedOption === 1 ? "Before & After" : "Only Outcome";
            setBeforeAfter(selectedLabel);
            setPopoverVisible(false); // Close on Save
            setAddNewService(true);  // Go to Add New Service screen
          }}
          className="!bg-gray-900 !text-white !px-7 !py-5 !w-full !text-sm !font-semibold !border-none"
        >
          Save
        </Button>
      </div>
    </div>
  );

  return (
    <div className="w-full p-5 relative">
      {!addNewService ? (
        <>
          <div className="flex justify-between items-center">
            <div className="relative w-[280px]">
              <Input
                placeholder="Search"
                prefix={<SearchOutlined />}
                onChange={(e) => handleSearch(e.target.value)}
                className="custom-client-input"
              />
            </div>
            <div className="flex items-center gap-5">
              <button
                type="button"
                onClick={() => setAddNewService(true)}
                className="inline-flex items-center px-3 py-2 gap-2 text-white bg-[#744CDB] border border-[#744CDB] rounded-lg hover:bg-primary01 focus:outline-none focus:ring-2 focus:ring-primary01 focus:ring-offset-2"
              >
                <PlusIcon className="text-[#FFF]" />
                Add Service
              </button>

              <Space wrap>
                <Popover
                  content={content}
                  title="Service photo format"
                  trigger="click"
                  placement="topRight"
                  arrow={false}
                  open={popoverVisible}
                  onOpenChange={(visible) => setPopoverVisible(visible)}
                >
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-2 gap-2 border border-[#242528] rounded-lg"
                  >
                    <PhotoIcon />
                    <p className="font-semibold text-[15px]">Photo Style</p>
                  </button>
                </Popover>
              </Space>
            </div>
          </div>

          <ServiceTable />
        </>
      ) : (
        <AddNewService setAddNewService={setAddNewService} beforeAfter={beforeAfter} />
      )}
    </div>
  );
}

export default ServicePage;

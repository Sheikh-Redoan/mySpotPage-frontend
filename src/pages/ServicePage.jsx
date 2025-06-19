import { Input, Button, Popover, Space, Radio } from "antd";
import { SearchOutlined } from "../assets/icons/icons";
import { PlusIcon } from "lucide-react";
import { PhotoIcon } from "../assets/icons/icons2";
import ServiceTable from "../components/DashboardPageComponents/shared/ServiceTable";
import AddNewService from "./seller/AddNewServicePage";
import { useState } from "react";
import React from "react";
import ConfirmFormatChangeModal from "../components/modal/ConfirmFormatChangeModal ";
import { useNavigate } from "react-router";

function ServicePage() {
  const navigate = useNavigate();

  const [beforeAfter, setBeforeAfter] = useState("Only Outcome");
  const [selectedOption, setSelectedOption] = useState(2);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSearch = (value) => {
    console.log(value);
  };

  const popoverContent = (
    <div className="w-[200px]">
      <Radio.Group
        name="radiogroup"
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
        className="!flex flex-col gap-2 !mt-4"
      >
        <Radio value={1}>Before & After</Radio>
        <Radio value={2}>Only Outcome</Radio>
      </Radio.Group>

      <div className="flex gap-4 mt-4 w-full">
        <Button
          onClick={() => setPopoverVisible(false)}
          className="!border !border-gray-900 !text-black !px-5 !py-1 !w-full !text-sm !font-semibold"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            const selectedLabel =
              selectedOption === 1 ? "Before & After" : "Only Outcome";
            setBeforeAfter(selectedLabel);
            setPopoverVisible(false);
          }}
          className="!bg-gray-900 !text-white !px-5 !py-1 !w-full !text-sm !font-semibold !border-none"
        >
          Save
        </Button>
      </div>
    </div>
  );

  return (
    <div className="w-full p-0 md:p-5 relative">
        <div className="px-3">
          <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
            <div className="relative w-full md:w-[280px]">
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
                onClick={() => navigate("/dashboard/service-menu/create", { beforeAfter: beforeAfter })}
                className="inline-flex items-center px-3 py-2 gap-2 text-white bg-[#744CDB] border border-[#744CDB] rounded-lg hover:bg-primary01 focus:outline-none focus:ring-2 focus:ring-primary01 focus:ring-offset-2"
              >
                <PlusIcon className="text-[#FFF]" />
                Add Service
              </button>

              <Space wrap>
                <Popover
                  content={popoverContent}
                  title="Service photo format"
                  placement="topRight"
                  arrow={false}
                  open={popoverVisible}
                  onOpenChange={(visible) => {
                    // allow closing from outside click
                    if (!modalOpen && !visible) {
                      setPopoverVisible(false);
                    }
                  }}
                >
                  <div>
                    <button
                      type="button"
                      onClick={() => setModalOpen(true)} // open modal only
                      className="inline-flex items-center px-3 py-2 gap-2 border border-[#242528] rounded-lg"
                    >
                      <PhotoIcon />
                      <p className="font-semibold text-[15px]">Photo Style</p>
                    </button>
                  </div>
                </Popover>
              </Space>
            </div>
          </div>

          <ServiceTable />
        </div>

      <ConfirmFormatChangeModal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onProceed={() => {
          setModalOpen(false);       // close modal
          setPopoverVisible(true);   // open popover
        }}
      />
    </div>
  );
}

export default ServicePage;

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
import useResponsive from "../hooks/useResponsive";
import { Drawer } from "antd";
import { X } from "lucide-react";

function ServicePage() {
  const navigate = useNavigate();

  const [beforeAfter, setBeforeAfter] = useState("Only Outcome");
  const [selectedOption, setSelectedOption] = useState(2);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const { xs, sm, md, lg } = useResponsive();
  const [open, setOpen] = useState(false);

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
              onClick={() => navigate("/dashboard/service-menu/create", { state: { beforeAfter: beforeAfter } })}
              className="inline-flex items-center px-3 py-2 gap-2 text-white bg-[#744CDB] border border-[#744CDB] rounded-lg hover:bg-primary01 focus:outline-none focus:ring-2 focus:ring-primary01 focus:ring-offset-2"
            >
              <PlusIcon className="text-[#FFF]" />
              Add Service
            </button>

            {(!md || !lg )&& (
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
            )}



            {(md || lg) ?
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
              : (
                <>
                  <Drawer
                    placement={"bottom"}
                    closable={false}
                    title="Service photo format"
                    extra={
                      <Button
                        type="text"
                        onClick={() => setOpen(false)}
                        className="!px-0"
                      >
                        <X size={24} className="text-description" />
                      </Button>
                    }
                    // height="38%"
                    onClose={() => setOpen(false)}
                    open={open}
                    className="rounded-t-xl"
                  >
                    <div className="">
                      <Radio.Group
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 10,
                          padding: 20,
                          fontSize: "14px",
                        }}
                        onChange={(e) => setSelectedOption(e.target.value)}
                        value={selectedOption}
                        options={[
                          { value: 1, label: "Before & After" },
                          { value: 2, label: "Only Outcome" },
                        ]}
                      />
                    </div>
                    <div className="bg-white pt-5 pb-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex justify-center fixed bottom-0 w-full">
                      <button
                        onClick={() => {
                          const selectedLabel =
                            selectedOption === 1 ? "Before & After" : "Only Outcome";
                          setBeforeAfter(selectedLabel);
                          setPopoverVisible(false);
                          setOpen(false)
                        }}
                        className="bg-black text-white w-[95%] flex justify-center py-2.5 rounded-md"
                      >
                        Apply
                      </button>
                    </div>
                  </Drawer>
                  <style>
                    {`
          .ant-drawer-body {
            padding: 0 !important;
          }
        `}
                  </style>
                </>
              )}
          </div>
        </div>

        <ServiceTable />
      </div>

      <ConfirmFormatChangeModal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onProceed={() => {
          setModalOpen(false);
          setOpen(true);
          setPopoverVisible(true);
        }}
      />
    </div>
  );
}

export default ServicePage;

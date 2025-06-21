import { Button, Modal, Radio } from "antd";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const TreatmentModal = ({ open, onCancel, onContinue, services }) => {
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(0);
  const [selectedTreatments, setSelectedTreatments] = useState({});

  const selectedService = services[selectedServiceIndex];

  // Set default treatment for all services on modal open
  useEffect(() => {
    if (open) {
      const defaultSelections = {};
      services.forEach((service) => {
        defaultSelections[service.id] = service.treatments[0];
      });
      setSelectedTreatments(defaultSelections);
      setSelectedServiceIndex(0);
    }
  }, [open, services]);

  const handleTreatmentChange = (e) => {
    const selectedTreatmentName = e.target.value;
    const treatment = selectedService.treatments.find(
      (t) => t.name === selectedTreatmentName
    );
    setSelectedTreatments({
      ...selectedTreatments,
      [selectedService.id]: treatment,
    });
  };

  const getSelectedTreatment = (serviceId) => {
    return selectedTreatments[serviceId];
  };

  const handleContinue = () => {
    const selectedData = services.map((service) => ({
      serviceId: service.id,
      serviceName: service.title,
      treatment: selectedTreatments[service.id],
    }));
    onContinue(selectedData);
  };

  return (
    <>
      <Modal
        open={open}
        onCancel={onCancel}
        closable={false}
        footer={null}
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "50%",
          xxl: "40%",
        }}
        centered
      >
        <div className="flex justify-between items-center p-2 md:p-4">
          <h3 className="text-[16px] font-semibold text-[#262626]">Choose options</h3>
          <button onClick={onCancel}>
            <X size={20}/>
          </button>
        </div>
        <hr className=" text-border max-md:mb-1" />

        <div className="md:grid grid-cols-6 font-golos p-3 md:p-4 ">
          {/* Sidebar */}
          <div className="flex flex-row md:flex-col max-md:gap-2 col-span-2 border-r border-border pr-4 overflow-x-auto md:overflow-x-visible whitespace-nowrap md:whitespace-normal">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`p-4 rounded-lg cursor-pointer mb-2 shrink-0 md:shrink  ${
                  selectedServiceIndex === index
                    ? "bg-highlight01"
                    : "max-md:border max-md:border-gray-200"
                }`}
                onClick={() => setSelectedServiceIndex(index)}
              >
                <div
                  className={`font-semibold ${
                    selectedServiceIndex === index
                      ? "text-primary01"
                      : "text-gray-800"
                  }`}
                >
                  {service.title}
                </div>
                <div className="text-sm text-description mt-1">
                  {getSelectedTreatment(service.id)?.name}
                </div>
              </div>
            ))}
          </div>

          {/* Treatments */}
          <div className="col-span-4 pl-0 md:pl-4 max-md:mt-3">
            <Radio.Group
              onChange={handleTreatmentChange}
              value={getSelectedTreatment(selectedService?.id)?.name}
              className="w-full border-1 border-border rounded-lg"
            >
              {selectedService?.treatments.map((treatment, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-dashed border-border px-3 max-md:py-3"
                >
                  <Radio value={treatment.name}>{treatment.name}</Radio>
                  <div className="text-start md:w-[14%]">
                    <div className="flex flex-row md:flex-col items-center md:items-start gap-2 md:gap-0 text-sm md:py-3 ml-6 md:ml-0">
                      <p className="text-description">{treatment?.duration}</p>
                      <div>
                        <span className="font-semibold text-lg text-primary01">
                          &#8362;
                        </span>
                        <span className="text-primary01 font-semibold md:mt-2">
                          {treatment?.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Radio.Group>

            <div className="flex justify-center md:justify-end mt-6 gap-4 md:gap-6">
              <Button
                color="default"
                variant="outlined"
                className="w-full"
                onClick={onCancel}
              >
                Cancel
              </Button>

              <Button
                color="default"
                variant="solid"
                disabled={!getSelectedTreatment(selectedService?.id)}
                onClick={handleContinue}
                className="w-full"
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      <style>
        {`
          .ant-modal-content {
            padding: 0 !important;
          }
        `}
      </style>
    </>
  );
};

export default TreatmentModal;

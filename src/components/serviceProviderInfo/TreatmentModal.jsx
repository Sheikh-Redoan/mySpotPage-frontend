import { Modal, Radio } from "antd";
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
    console.log("Selected Treatments:", selectedData);
  };

  return (
    <Modal
      title="Choose options"
      open={open}
      onCancel={onCancel}
      footer={null}
      width={800}
      centered>
      <hr className="my-6 text-border" />
      <div className="md:grid grid-cols-6 font-golos">
        {/* Sidebar */}
        <div className="flex flex-row md:flex-col col-span-2 border-r border-border pr-4 overflow-x-auto md:overflow-x-visible whitespace-nowrap md:whitespace-normal">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`p-4 rounded-lg cursor-pointer mb-2 shrink-0 md:shrink ${
                selectedServiceIndex === index ? "bg-highlight01" : ""
              }`}
              onClick={() => setSelectedServiceIndex(index)}>
              <div
                className={`font-semibold ${
                  selectedServiceIndex === index
                    ? "text-primary01"
                    : "text-gray-800"
                }`}>
                {service.title}
              </div>
              <div className="text-sm text-description mt-1">
                {getSelectedTreatment(service.id)?.name}
              </div>
            </div>
          ))}
        </div>

        {/* Treatments */}
        <div className="col-span-4 pl-4 mt-5 md:mt-0">
          <Radio.Group
            onChange={handleTreatmentChange}
            value={getSelectedTreatment(selectedService?.id)?.name}
            className="w-full border-1 border-border rounded-lg">
            {selectedService?.treatments.map((treatment, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-dashed border-border mx-4">
                <Radio value={treatment.name}>{treatment.name}</Radio>
                <div className="text-start md:w-[14%]">
                  <div className="flex flex-row md:flex-col items-center md:items-start gap-2 md:gap-0 text-sm py-3 ml-6 md:ml-0">
                    <p className="text-description">{treatment?.duration}</p>
                    <p className="text-primary01 font-semibold md:mt-2">
                      {treatment?.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Radio.Group>

          <div className="flex justify-center md:justify-end mt-6 gap-6">
            <button
              className="text-gray-900 text-sm font-semibold border border-gray-900 py-2 px-8 rounded-lg hover:bg-gray-900 hover:text-white transition duration-300 ease-in-out cursor-pointer"
              onClick={onCancel}>
              Cancel
            </button>
            <Link to="service-provider-info">
              <button
                className="bg-gray-900 text-white py-2 px-6 rounded-lg text-sm font-semibold cursor-pointer"
                disabled={!getSelectedTreatment(selectedService?.id)}
                onClick={handleContinue}>
                Continue
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TreatmentModal;

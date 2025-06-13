import React, { useState } from "react";
import { Modal, Checkbox } from "antd";
import { FaArrowLeft } from "react-icons/fa";

const cityList = [
  "All cities",
  "Karmiel",
  "Migdal HaEmek",
  "Nazareth (Nazerat)",
  "Ma'alot-Tarshiha",
  "Yokneam Illit",
  "Sakhnin",
  "Acre (Akko)",
  "Kiryat Shmona",
];

const CitySelectionModal = ({ openCitySelectionModal, onClose, selectedDistrict, handleCityChange, selectedCities }) => {

  const handleSave = () => {
    // You can pass selectedCities to parent here if needed
    onClose();
  };

  return (
    <Modal
      open={openCitySelectionModal}
      footer={null}
      onCancel={onClose}
      closable={false}
      centered
      width={600}
      className="p-0"
    >
      <div className="bg-white text-black rounded-md w-full">
        <div className="flex items-center gap-3 my-2 p-6">
          <FaArrowLeft
            className="cursor-pointer"
            onClick={onClose}
          />
          <p className="text-[#262626] font-semibold">{selectedDistrict}</p>
        </div>

        <hr className="text-[#E5E7E8]" />

        <h2 className="text-sm my-4 px-6 text-[#797979]">
          All cities within the district:
        </h2>

        <div className="px-6 py-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cityList.map((city) =>
            city === "Ma'alot-Tarshiha" || city === "Yokneam Illit" ? (
              <div key={city} className="flex gap-2 items-center">
                <Checkbox
                  onChange={() => handleCityChange(city)}
                />
                <p className="text-sm">{city}</p>
              </div>
            ) : (
              <Checkbox
                key={city}
                onChange={() => handleCityChange(city)}
              >
                {city}
              </Checkbox>
            )
          )}
        </div>

        <div className="flex justify-end items-center gap-6 px-6 py-3">
          <button
            onClick={onClose}
            className="text-[#242528] text-sm hover:scale-95 transform transition-all ease-in-out duration-300 hidden md:block"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-[#242528] text-white text-sm py-2 px-3 rounded-lg hover:scale-95 transform transition-all ease-in-out duration-300 w-full md:w-fit"
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CitySelectionModal;

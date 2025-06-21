import { Button } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Plus } from "lucide-react";
import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import CitySelectionModal from "../modal/CitySelectionModal";
import DeleteLocationModal from "../modal/DeleteLocationModal";
import FixedLocationModal from "../modal/FixedLocationModal";
import LocationList from "./LocationList";
import MobileServiceLocationList from "./MobileServiceLocationList";
import { MobileServiceSetupModal } from "./mobileServiceSetup/MobileServiceSetupModal";

dayjs.extend(customParseFormat);

const SoloLocation = () => {
  const [mobileServiceEnabled, setMobileServiceEnabled] = useState(false);
  const [fixedLocationModalOpen, setFixedLocationModalOpen] = useState(false);
  const [mobileModalOpen, setMobileModalOpen] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCities, setSelectedCities] = useState({});
  const [deleteLocationModalOpen, setDeleteLocationModalOpen] = useState(false);
  const [openCitySelectionModal, setOpenCitySelectionModal] = useState(false);

  const handleCityChange = (city) => {
    console.log("city", city);
    setSelectedCities((prev) => {
      const district = selectedDistrict;

      const current = prev[district] || [];

      const updated = current.includes(city)
        ? current.filter((c) => c !== city)
        : [...current, city];

      return {
        ...prev,
        [district]: updated,
      };
    });
  };

  const onChanges = (checked) => {
    console.log(`switch to ${checked}`);
    if (checked) setMobileModalOpen(true);
  };

  const handleSwitchChange = (checked) => {
    setMobileServiceEnabled(checked);
    onChanges?.(checked);
  };

  return (
    <div className="min-h-full">
      <div className="p-6 rounded-md mt-4 bg-[#FFFFFF]">
        <div className="xl:flex justify-between items-start my-2">
          <div>
            <h2 className="text-xl text-[#242528] font-semibold">
              Fixed Location Services
            </h2>
            <p className="text-[#797979] mt-1 text-sm">
              Your service is based at a specific location. Ensure your address
              settings are correct for customers to find you easily.
            </p>
          </div>

          <div className="hidden md:block">
            <Button
              onClick={() => setFixedLocationModalOpen(true)}
              className="!text-primary01 !border-primary01 "
            >
              <Plus size={20} /> Add Location
            </Button>
          </div>
        </div>
        <hr className="my-6 text-[#F6F6F6]" />

        {/* location List */}
        <LocationList
          locationData={locationData}
          setFixedLocationModalOpen={setFixedLocationModalOpen}
          setDeleteLocationModalOpen={setDeleteLocationModalOpen}
        />

        <hr className="my-6 text-[#F6F6F6]" />

        {/* mobile service location list */}
        <MobileServiceLocationList
          setMobileModalOpen={setMobileModalOpen}
          mobileServiceEnabled={mobileServiceEnabled}
          handleSwitchChange={handleSwitchChange}
        />
      </div>

      {/* Fixed Location Setup Modal */}
      {fixedLocationModalOpen && (
        <FixedLocationModal
          isOpen={fixedLocationModalOpen}
          onClose={() => setFixedLocationModalOpen(false)}
          onSave={() => setFixedLocationModalOpen(false)}
        />
      )}

      {/* Mobile Service Setup Modal */}
      {mobileModalOpen && (
        <MobileServiceSetupModal
          setMobileModalOpen={setMobileModalOpen}
          isOpen={mobileModalOpen}
          onClose={() => setMobileModalOpen(false)}
          selectedCities ={selectedCities}
          setSelectedDistrict={setSelectedDistrict}
          setOpenCitySelectionModal={setOpenCitySelectionModal}
          handleCityChange={handleCityChange}
        />
      )}

      {openCitySelectionModal && (
        <CitySelectionModal
          openCitySelectionModal={openCitySelectionModal}
          onClose={() => setOpenCitySelectionModal(false)}
          selectedDistrict={selectedDistrict}
          handleCityChange={handleCityChange}
          selectedCities={selectedCities}
        />
      )}

      {/* delete location modal */}
      {deleteLocationModalOpen && (
        <DeleteLocationModal
          isOpen={deleteLocationModalOpen}
          onClose={() => setDeleteLocationModalOpen(false)}
          setDeleteLocationModalOpen={setDeleteLocationModalOpen}
          onDeleteConfirm={() => setDeleteLocationModalOpen(false)}
        />
      )}
    </div>
  );
};

export default SoloLocation;

const locationData = [
  {
    id: 1,
    name: "TCL Beauty Studio 01",
    address: "15 Rothschild Boulevard, Tel Aviv-Yafo, Israel",
    isActive: true,
  },
  {
    id: 2,
    name: "TCL Beauty Studio 02",
    address: "15 Rothschild Boulevard, Tel Aviv-Yafo, Israel",
    isActive: false,
  },
];

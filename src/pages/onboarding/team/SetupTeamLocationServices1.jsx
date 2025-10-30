import { Plus } from "lucide-react";
import { Link } from "react-router";
import FixedLocationModal from "../../../components/modal/FixedLocationModal";
import { useState } from "react";
import { Button } from "antd";
import LocationList from "../../../components/SettingsPages/LocationList";
import DeleteLocationModal from "../../../components/modal/DeleteLocationModal";

const SetupTeamLocationServices1 = () => {
  const [fixedLocationModalOpen, setFixedLocationModalOpen] = useState(false);
  const [deleteLocationModalOpen, setDeleteLocationModalOpen] = useState(false);

  return (
    <div className="px-2 py-[20px] lg:px-[20px] lg:py-[30px] xl:p-[40px]">
      <p className="text-[#866BE7] mb-2 font-medium">Step 2 of 3</p>
      <h1 className="text-[22px] md:text-[28px] font-semibold my-1">
        Set Up Location
      </h1>
      <p className="text-[#888888]  pb-2.5">
        Choose where your business operates. This helps us show relevant
        settings.
      </p>
      <div className="p-[16px] border-[1px] border-[#DDDAFA] rounded-md mt-4 min-h-[520px]">
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
              disabled={locationData?.length >= 1}
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
      </div>

      <div className="sm:w-auto flex items-center justify-end gap-4 my-6 mx-2 sm:mx-5">
        <Link to={"/onboard/setup-location"} className="w-full sm:w-auto">
          <button className="w-full sm:w-auto px-[18px] py-[8px] border font-medium border-[#242528] rounded-lg hover:scale-95 transform transition-all duration-300 ease-in-out hover:bg-[#f3f3f3] hover:shadow-md">
            Previous
          </button>
        </Link>

        <Link to={"/onboard/service"} className="w-full sm:w-auto">
          <Button color="default" variant="solid" size="large">
            Continue
          </Button>
        </Link>
      </div>

      {/* Fixed Location Setup Modal */}
      {fixedLocationModalOpen && (
        <FixedLocationModal
          isOpen={fixedLocationModalOpen}
          onClose={() => setFixedLocationModalOpen(false)}
          onSave={() => setFixedLocationModalOpen(false)}
        />
      )}

      {/* delete location modal */}
      {deleteLocationModalOpen && (
        <DeleteLocationModal
          isOpen={deleteLocationModalOpen}
          onClose={() => setDeleteLocationModalOpen(false)}
          setDeleteLocationModalOpen={setDeleteLocationModalOpen}
          onDeleteConfirm={() => setDeleteLocationModalOpen(false)}
          title="This location"
        />
      )}
    </div>
  );
};

export default SetupTeamLocationServices1;

const locationData = [
  {
    id: 1,
    name: "TCL Beauty Studio 01",
    address: "15 Rothschild Boulevard, Tel Aviv-Yafo, Israel",
    isActive: true,
  },
];

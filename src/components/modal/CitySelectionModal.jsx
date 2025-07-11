import { Checkbox, Drawer, Grid, Modal } from "antd";
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

const CitySelectionModal = ({
  openCitySelectionModal,
  onClose,
  selectedDistrict,
  handleCityChange,
  selectedCities,
}) => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const handleSave = () => {
    // You can pass selectedCities to parent here if needed
    onClose();
  };

  if (screens.xs || (screens.sm && !screens.md && !screens.lg && !screens.xl)) {
    return (
      <>
        <Drawer
          placement={"bottom"}
          closable={false}
          height="70%"
          onClose={onClose}
          open={openCitySelectionModal}
          className="rounded-t-xl"
          title={
            <div className="flex items-center gap-3 my-2">
              <FaArrowLeft className="cursor-pointer" onClick={onClose} />
              <p className="!text-[#262626] !font-semibold !text-sm !whitespace-nowrap">{selectedDistrict}</p>
            </div>
          }
        >
          <div className="bg-white text-black rounded-md w-full">

            <div className="pb-24">
              <h2 className="text-sm my-4 px-6 text-[#797979]">
                All cities within the district:
              </h2>

              <div className="px-6 py-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cityList.map((city) =>
                  city === "Ma'alot-Tarshiha" || city === "Yokneam Illit" ? (
                    <div key={city} className="flex gap-2 items-center">
                      <Checkbox onChange={() => handleCityChange(city)} />
                      <p className="text-sm">{city}</p>
                    </div>
                  ) : (
                    <Checkbox key={city} onChange={() => handleCityChange(city)}>
                      {city}
                    </Checkbox>
                  )
                )}
              </div>
            </div>

            <div className="flex justify-end items-center gap-6 px-6 pt-5 pb-10 fixed bottom-0 w-full bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] ">
              <button
                onClick={handleSave}
                className="bg-[#242528] text-white text-sm py-2 px-3 rounded-lg hover:scale-95 transform transition-all ease-in-out duration-300 w-full md:w-fit"
              >
                Save
              </button>
            </div>
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
    );
  } else {
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
            <FaArrowLeft className="cursor-pointer" onClick={onClose} />
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
                  <Checkbox onChange={() => handleCityChange(city)} />
                  <p className="text-sm">{city}</p>
                </div>
              ) : (
                <Checkbox key={city} onChange={() => handleCityChange(city)}>
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
  }
};

export default CitySelectionModal;

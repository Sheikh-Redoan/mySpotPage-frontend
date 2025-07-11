import {
  Button,
  Drawer,
  Grid,
  Modal
} from "antd";
import { X } from "lucide-react";
import { MobileServiceSetupContent } from "./MobileServiceSetupContent";

const cityOptions = [
  {
    value: "Afula",
    label: "Afula",
  },
  {
    value: "Alfei Menashe",
    label: "Alfei Menashe",
  },
  {
    value: "Ashkelon",
    label: "Ashkelon",
  },
  {
    value: "Baqa al-Gharbiyye",
    label: "Baqa al-Gharbiyye",
  },
  {
    value: "Beit Shemesh",
    label: "Beit Shemesh",
  },
  {
    value: "Dimona",
    label: "Dimona",
  },
  {
    value: "Even Yehuda",
    label: "Even Yehuda",
  },
  {
    value: "Hod HaSharon",
    label: "Hod HaSharon",
  },
];

const format = "hh:mm A";

export const MobileServiceSetupModal = ({
  setMobileModalOpen,
  isOpen,
  onClose,
  setSelectedDistrict,
  selectedCities,
  setOpenCitySelectionModal,
  handleCityChange
}) => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  if (screens.xs || (screens.sm && !screens.md && !screens.lg && !screens.xl)) {
    return (
      <>
        <Drawer
          placement={"bottom"}
          closable={false}
          height="90%"
          onClose={onClose}
          open={isOpen}
          className="rounded-t-xl"
          title="Mobile service setup"
          extra={
            <Button
              type="text"
              onClick={onClose}
              className="!px-0"
            >
              <X size={24} className="text-description" />
            </Button>
          }
        >
          <MobileServiceSetupContent
            setMobileModalOpen={setMobileModalOpen}
            isOpen={isOpen}
            onClose={onClose}
            setSelectedDistrict={setSelectedDistrict}
            selectedCities={selectedCities}
            setOpenCitySelectionModal={setOpenCitySelectionModal}
            cityOptions={cityOptions}
            drowar={true}
            handleCityChange={handleCityChange}
          />
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
        open={isOpen}
        onCancel={onClose}
        footer={null}
        closable={true}
        closeIcon={<X className="w-6 h-6" />}
        className="!w-[95%] !max-w-3xl rounded-lg max-h-[80vh] overflow-y-auto"
        centered
      >
        <MobileServiceSetupContent
          setMobileModalOpen={setMobileModalOpen}
          isOpen={isOpen}
          onClose={onClose}
          setSelectedDistrict={setSelectedDistrict}
          selectedCities={selectedCities}
          setOpenCitySelectionModal={setOpenCitySelectionModal}
          cityOptions={cityOptions}
        />
      </Modal>
    );
  }
};

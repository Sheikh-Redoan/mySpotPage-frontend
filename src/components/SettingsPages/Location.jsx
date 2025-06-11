import { useState } from "react";
import SoloLocation from "./SoloLocation";
import TeamLocation from "./TeamLocation";
import BusinessStructureModal from "../modal/BusinessStructureModal";

const Location = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selected, setSelected] = useState('solo');
  const [tempSelectedValue, setTempSelectedValue] = useState(selected);

  const handleOk = () => {
    setSelected(tempSelectedValue);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setTempSelectedValue(selected);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div>
        <BusinessStructureModal isModalOpen={isModalOpen} tempSelectedValue={tempSelectedValue} setTempSelectedValue={setTempSelectedValue} handleOk={handleOk} handleCancel={handleCancel} />
      </div>
      {
        selected === "solo" && <SoloLocation />
      }
      {
        selected === "team" && <TeamLocation />
      }
    </div>
  );
};

export default Location;

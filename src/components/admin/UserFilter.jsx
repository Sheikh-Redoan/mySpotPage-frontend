import { Button, Checkbox, Collapse } from "antd";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const { Panel } = Collapse;

const genderOptions = ["All genders", "Male", "Female", "Other"];
const planOptions = [
  "All plans",
  "Spark plan",
  "Glow plan",
  "Bloom plan",
  "Radiance plan",
];

export default function UserFilter({ closePopup }) {
  const [selectedGenders, setSelectedGenders] = useState(genderOptions);
  const [selectedPlans, setSelectedPlans] = useState(planOptions);

  const handleGenderChange = (checkedValues) => {
    setSelectedGenders(checkedValues);
  };

  const handlePlanChange = (checkedValues) => {
    setSelectedPlans(checkedValues);
  };

  const handleReset = () => {
    setSelectedGenders(genderOptions);
    setSelectedPlans(planOptions);
  };

  const handleApply = () => {
    console.log("Apply filters:", { selectedGenders, selectedPlans });
    closePopup();
  };

  return (
    <div className="w-full">
      <Collapse
        defaultActiveKey={["1", "2"]}
        ghost
        expandIcon={({ isActive }) => (
          // <CaretRightOutlined

          // />

          <ChevronDown
            strokeWidth={1}
            rotate={isActive ? 90 : 0}
            style={{ transition: "transform 0.3s" }}
          />
        )}>
        <Panel header="Gender" key="1">
          <Checkbox.Group
            options={genderOptions}
            value={selectedGenders}
            onChange={handleGenderChange}
            className="flex flex-col gap-2 text-violet-600"
          />
        </Panel>
        <Panel header="Plan" key="2">
          <Checkbox.Group
            options={planOptions}
            value={selectedPlans}
            onChange={handlePlanChange}
            className="flex flex-col gap-2 text-violet-600"
          />
        </Panel>
      </Collapse>

      <div className="flex justify-between px-4 py-2 w-full gap-1">
        <Button
          onClick={handleReset}
          type="default"
          size="large"
          className="flex-1">
          Reset
        </Button>
        <Button
          type="primary"
          onClick={handleApply}
          size="large"
          className="flex-1">
          Apply
        </Button>
      </div>
    </div>
  );
}

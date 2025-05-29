import { Button, Checkbox, Collapse, Drawer } from "antd";
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

export default function UserFilter({ open, onClose }) {
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
    onClose();
  };

  return (
    <Drawer
      title="Filter"
      placement="right"
      onClose={onClose}
      open={open}
      width={320}
      className="rounded-l-xl"
      closeIcon={false}
      footer={
        <div className="flex justify-between px-4 py-2 border-t">
          <Button onClick={handleReset} className="border-black text-black">
            Reset
          </Button>
          <Button type="primary" className="bg-black" onClick={handleApply}>
            Apply
          </Button>
        </div>
      }>
      <Collapse defaultActiveKey={["1", "2"]} ghost>
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
    </Drawer>
  );
}

const data = [
  {
    type: "Gender",
    data: [
      { value: "all_genders", label: "All genders" },
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
      { value: "others", label: "Others" },
    ],
  },
  {
    type: "Plan",
    data: [
      { value: "all_plans", label: "All plans" },
      { value: "spark_plan", label: "Spark Plan" },
      { value: "glow_plan", label: "Glow Plan" },
      { value: "bloom_plan", label: "Bloom Plan" },
      { value: "radiance_plan", label: "Radiance Plan" },
    ],
  },
];

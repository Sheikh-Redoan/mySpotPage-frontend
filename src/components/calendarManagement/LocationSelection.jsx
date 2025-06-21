import { Checkbox } from "antd";
import { useState } from "react";

export default function LocationSelection() {
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const checkAll = plainOptions.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < plainOptions.length;
  const onChange = (list) => {
    setCheckedList(list);
  };
  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
  };

  const CheckboxGroup = Checkbox.Group;
  return (
    <>
      <Checkbox
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkAll}>
        All locations
      </Checkbox>
      <CheckboxGroup
        value={checkedList}
        onChange={onChange}
        className="flex flex-col gap-2">
        {plainOptions.map((option) => (
          <Checkbox key={option.value} value={option}>
            {option.label}
          </Checkbox>
        ))}
      </CheckboxGroup>
    </>
  );
}

const plainOptions = [
  {
    label: "TCL Beauty Studio 01",
    value: "TCL Beauty Studio 01",
  },
  {
    label: "TCL Beauty Studio 02",
    value: "TCL Beauty Studio 02",
  },
];
const defaultCheckedList = [
  {
    label: "TCL Beauty Studio 01",
    value: "TCL Beauty Studio 01",
  },
  {
    label: "TCL Beauty Studio 02",
    value: "TCL Beauty Studio 02",
  },
];

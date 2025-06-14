import { Avatar, Checkbox } from "antd";
import { useState } from "react";

export default function StaffSelection() {
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
        All staffs
      </Checkbox>
      <CheckboxGroup
        value={checkedList}
        onChange={onChange}
        className="flex flex-col gap-2">
        {plainOptions.map((option) => (
          <Checkbox key={option.value} value={option}>
            <span>
              <Avatar src={<img src={option.image} alt="avatar" />} />
            </span>
            {option.label}
          </Checkbox>
        ))}
      </CheckboxGroup>
    </>
  );
}

const plainOptions = [
  {
    label: "Tran Huyen (You)",
    value: "Tran Huyen (You)",
    image: "/src/assets/images/avatars/avatar-1.png",
  },
  {
    label: "Pixel Nomad",
    value: "Pixel Nomad",
    image: "/src/assets/images/avatars/avatar-1.png",
  },
  {
    label: "Code Voyager",
    value: "Code Voyager",
    image: "/src/assets/images/avatars/avatar-1.png",
  },
  {
    label: "Echo Sage",
    value: "Echo Sage",
    image: "/src/assets/images/avatars/avatar-1.png",
  },
  {
    label: "Nebula Drift",
    value: "Nebula Drift",
    image: "/src/assets/images/avatars/avatar-1.png",
  },
  {
    label: "Shadow Quill",
    value: "Shadow Quill",
    image: "/src/assets/images/avatars/avatar-1.png",
  },
];
const defaultCheckedList = [
  {
    label: "Tran Huyen (You)",
    value: "Tran Huyen (You)",
    image: "/src/assets/images/avatars/avatar-1.png",
  },
];

import React from "react";
import { ForwardIcon } from "../../../assets/icons/icons";

const ClientDetailsBreadCrumb = () => {
  return (
    <div className="flex items-center gap-2 mb-6 text-[#888] text-sm">
      <p>Client Management</p>
      <ForwardIcon />
      <p>Tran Huyen</p>
      <ForwardIcon />
      <p className="text-[#262626]">Basic Information</p>
    </div>
  );
};

export default ClientDetailsBreadCrumb;

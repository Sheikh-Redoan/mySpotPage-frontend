// src/components/LocationList.jsx
import { useState } from "react";
import { Dropdown, Menu, Switch, Grid, Button  } from "antd";
import {
  Ellipsis ,
  Pencil,
  Trash2,
} from "lucide-react";
import { Plus } from "lucide-react";
const { useBreakpoint } = Grid;





export default function LocationList({locationData, setFixedLocationModalOpen, setDeleteLocationModalOpen}) {
  const [locations, setLocations] = useState(locationData);
  const [openMenus, setOpenMenus] = useState({});
  const screens = useBreakpoint();

  const toggleActive = (id) => {
    setLocations((prev) =>
      prev.map((loc) =>
        loc.id === id ? { ...loc, isActive: !loc.isActive } : loc
      )
    );
  };

  const handleMenuVisibleChange = (visible, id) => {
    setOpenMenus((prev) => ({ ...prev, [id]: visible }));
  };

  const actionMenu = (id) => (
     <Menu
    items={[
      {
        key: "edit",
        icon: <Pencil size={16} />,
        label: <span onClick={() => setFixedLocationModalOpen(true)}>Edit</span>,
      },
      {
        key: "delete",
        icon: <Trash2 size={16} className="text-red-500" />,
        label: <span onClick={() => setDeleteLocationModalOpen(true)} className="text-red-500">Delete</span>,
      },
    ]}
  />
  );

  return (
    <div className="space-y-6 py-4">
      {locations.map((loc) => (
        <div
          key={loc.id}
          className="flex items-start justify-between rounded-lg"
        >
          <div className="flex items-start gap-3">
            <Switch
              checked={loc.isActive}
              onChange={() => toggleActive(loc.id)}
              className="mt-1"
              size={screens.sm ? "default" : "small"  }
            />
            <div>
              <div className="flex items-center gap-2">
                <h3
                  className={`font-semibold text-sm md:text-base ${
                    loc.isActive ? "text-black" : "text-gray-400"
                  }`}
                >
                  {loc.name}
                </h3>
                {loc.isActive && (
                  <span className="text-xs bg-highlight01 text-primary01 px-2 py-0.5 rounded">
                    Hidden
                  </span>
                )}
              </div>
              <p
                className={`text-sm mt-2 ${
                  loc.isActive ? "text-gray-500" : "text-gray-300"
                }`}
              >
                {loc.address}
              </p>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center gap-3 text-lg">
            <Pencil className="cursor-pointer text-gray-700" size={18} onClick={() => setFixedLocationModalOpen(true)} />
            <Trash2 className="cursor-pointer text-red-500" size={18} onClick={() => setDeleteLocationModalOpen(true)} />
          </div>

          {/* Mobile Menu */}
          <div className="sm:hidden relative">
            <Dropdown
              overlay={actionMenu(loc.id)}
              trigger={["click"]}
              placement="bottomRight"
              onOpenChange={(visible) =>
                handleMenuVisibleChange(visible, loc.id)
              }
              open={openMenus[loc.id]}
            >
              <Ellipsis className="cursor-pointer text-gray-600" size={20} />
            </Dropdown>
          </div>
        </div>
      ))}
      <Button
            onClick={() => setFixedLocationModalOpen(true)}
            className="!text-primary01 !border-primary01 md:!hidden"
          >
            <Plus size={20} /> Add Location
          </Button>
    </div>
  );
}

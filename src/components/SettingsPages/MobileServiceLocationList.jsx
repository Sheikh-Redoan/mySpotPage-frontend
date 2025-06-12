import { Switch } from 'antd';
import { EditIcon } from 'lucide-react';
import React from 'react';
import { Grid } from "antd";

const MobileServiceLocationList = ({setMobileModalOpen, mobileServiceEnabled, handleSwitchChange}) => {
      const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

    return (
        <div>
            <div className="flex items-start justify-between">
                <div className="flex gap-5">
                    <Switch
                        checked={mobileServiceEnabled}
                        onChange={handleSwitchChange}
                        style={{
                            marginTop: "3px",
                        }}
                        size={screens.sm ? "default" : "small"}
                    />

                    <div className="flex flex-col justify-start">
                        <h4 className="text-[#242528] font-semibold text-base md:text-lg">
                            Mobile Service
                        </h4>
                        <p className="text-[#797979] my-2 text-sm">
                            Your mobile service is currently inactive. Please enable it to
                            offer on-location services to your clients.
                        </p>
                    </div>
                </div>
                {mobileServiceEnabled && (
                    <div className="pr-5">
                        <EditIcon onClick={() => setMobileModalOpen(true)} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default MobileServiceLocationList;
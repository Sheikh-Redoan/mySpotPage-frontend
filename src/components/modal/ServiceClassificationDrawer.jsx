import React, { useState } from 'react';
import useResponsive from '../../hooks/useResponsive';
import { Button, ConfigProvider, Drawer, Radio, Input } from 'antd';
import { X, ChevronDown } from 'lucide-react';
import SearchableDropdown from '../ui/SearchableDropdown';
import { SearchOutlined } from '../../assets/icons/icons';

const ServiceClassificationDrawer = ({
    openForClassification,
    setOpenForClassification,
    setLabelForClassification,
    selectValueForClassification,
    setSelectvalueForClassification,
    serviceOptions,
    labelForClassification,
    handleChange,
}) => {
    const { xs, sm, md, lg } = useResponsive();
    const [searchValue, setSearchValue] = useState("");

    // Filter based on search input
    const filteredOptions = serviceOptions.filter((option) =>
        option.label.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <div>
            {(lg || md) ? (
                <div>
                    <label className="block mb-2 text-[#888888]">
                        Service Classification <span className="text-orange-600">*</span>
                    </label>
                    <ConfigProvider
                        theme={{
                            token: {
                                colorPrimary: "#8B5CF6",
                                borderRadius: 8,
                            },
                            components: {
                                Select: {
                                    controlHeight: 38,
                                },
                            },
                        }}
                    >
                        <SearchableDropdown
                            options={serviceOptions}
                            placeholder="Select"
                            searchPlaceholder="Search"
                            onChange={handleChange}
                        />
                    </ConfigProvider>
                </div>
            ) : (
                <>
                    <label className="block mb-2 text-[#888888]">
                        Service Classification <span className="text-orange-600">*</span>
                    </label>
                    <Button
                        type="default"
                        className="w-full !flex !justify-between !py-5 !border !border-gray-300"
                        onClick={() => setOpenForClassification(true)}
                    >
                        {selectValueForClassification} <ChevronDown className="text-description" />
                    </Button>

                    <Drawer
                        placement="bottom"
                        closable={false}
                        title="Service Classification"
                        extra={
                            <Button
                                type="text"
                                onClick={() => setOpenForClassification(false)}
                                className="!px-0"
                            >
                                <X size={24} className="text-description" />
                            </Button>
                        }
                        height="75%"
                        onClose={() => setOpenForClassification(false)}
                        open={openForClassification}
                        className="rounded-t-xl"
                        styles={{ body: { paddingBottom: 200 } }}
                    >
                        <div className="rounded-lg px-3">
                            <div className="border border-[#E7E7E7] rounded-lg mt-5">
                                <Input
                                    prefix={searchValue ? null : <SearchOutlined />}
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    onClick={(e) => e.stopPropagation()}
                                    bordered={false}
                                    style={{
                                        fontSize: "18px",
                                        height: "36px",
                                    }}
                                />
                            </div>
                        </div>

                        <Radio.Group
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 10,
                                padding: 20,
                                fontSize: '14px',
                                paddingTop: 16
                            }}
                            onChange={(e) => setLabelForClassification(e.target.value)}
                            value={labelForClassification}
                            options={filteredOptions}
                        />

                        {/* Optional fallback message */}
                        {filteredOptions.length === 0 && (
                            <p className="text-center text-gray-400 mt-4">No results found</p>
                        )}

                        <div className="fixed bottom-0 left-0 w-full px-4 bg-white pt-5 pb-6 border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex justify-center z-50">
                            <button
                                onClick={() => {
                                    setOpenForClassification(false);
                                    setSelectvalueForClassification(labelForClassification);
                                }}
                                className="bg-black-button text-white w-full max-w-[95%] flex justify-center py-2.5 rounded-md font-semibold"
                            >
                                Apply
                            </button>
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
            )}
        </div>
    );
};

export default ServiceClassificationDrawer;

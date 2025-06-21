import { Button, Select, Space } from "antd";
import { X } from "lucide-react";
import { Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { languages } from "../../data/languages";
import {
  clearLanguageData,
  selectLanguage,
  setLanguageData,
} from "../../redux/features/languageSlice";
import Translate from "../shared/Translate";

export default function LanguageSelectDropdown({ hide }) {
  const currentLanguage = useSelector(selectLanguage);
  const dispatch = useDispatch();
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);

  const handleLanguageChange = (value) => {
    // Parse the JSON string back to an object
    setSelectedLanguage(JSON.parse(value));
  };

  const handleReset = () => {
    setSelectedLanguage(currentLanguage);
    dispatch(clearLanguageData()); // Added () to invoke the function
  };

  const handleTranslateClick = () => {
    // Dispatch the selected language to the store
    dispatch(setLanguageData(selectedLanguage));
    hide();
  };

  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-semibold text-gray-800">
          <Suspense fallback={<div>Loading...</div>}>
            <Translate text={"Language to Translate into"} />
          </Suspense>
        </div>
        <Button
          type="text"
          icon={<X size={18} className="text-gray-500 hover:text-gray-700" />}
          onClick={hide}
          className="p-1 -mr-2 rounded-full hover:bg-gray-100"
        />
      </div>
      <Select
        value={JSON.stringify(selectedLanguage)} // Use stringified object to match option values
        onChange={handleLanguageChange}
        className="w-full mb-6 rounded-lg"
        size="large"
        showSearch
        placeholder="Select a language"
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.children.toLowerCase().includes(input.toLowerCase())
        }>
        {languages.map((lang) => (
          <Select.Option key={lang.code} value={JSON.stringify(lang)}>
            {lang.language}
          </Select.Option>
        ))}
      </Select>

      <Space className="w-full flex justify-end gap-3 mt-3">
        <Button
          onClick={handleReset}
          className="px-5 py-2.5 rounded-lg text-gray-600 border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 transition duration-200 ease-in-out"
          size="middle">
          <Suspense fallback={<div>Loading...</div>}>
            <Translate text={"Reset"} />
          </Suspense>
        </Button>

        <Button
          type="primary"
          onClick={handleTranslateClick}
          className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-in-out transform hover:scale-105"
          size="middle">
          <Suspense fallback={<div>Loading...</div>}>
            <Translate text={"Translate"} />
          </Suspense>
        </Button>
      </Space>
    </div>
  );
}

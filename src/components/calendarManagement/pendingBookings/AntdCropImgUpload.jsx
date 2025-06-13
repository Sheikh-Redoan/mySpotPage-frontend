var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };

import React, { useState } from "react";
import { Avatar, Button, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { Upload as UploadImg, X } from "lucide-react";

const AntdCropImgUpload = () => {
  const [fileList, setFileList] = useState([
    // {
    //   uid: "-1",
    //   name: "image.png",
    //   status: "done",
    //   url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    // },
  ]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = (file) =>
    __awaiter(void 0, void 0, void 0, function* () {
      let src = file.url;
      if (!src) {
        src = yield new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file.originFileObj);
          reader.onload = () => resolve(reader.result);
        });
      }
      const image = new Image();
      image.src = src;
      const imgWindow = window.open(src);
      imgWindow === null || imgWindow === void 0
        ? void 0
        : imgWindow.document.write(image.outerHTML);
    });

  const onRemove = (file) => {
    setFileList(fileList.filter((item) => item.uid !== file.uid));
  };

  return (
    <ImgCrop rotationSlider>
      <Upload
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
        listType="text"
        showUploadList={false}
        maxCount={5}
      >
        {fileList.length < 5 && (
          <Button
            icon={<UploadImg size={16} />}
            className="py-2 px-3 rounded-md text-[#FFFFFF] mt-2"
          >
            Upload Your Image
          </Button>
        )}

        {fileList.length > 0 && (
          <div className="mt-4">
              {fileList.map((file) => (
                <div
                  key={file.uid}
                  className="relative"
                >
                  {console.log("file", file)}
                  <Avatar
                    src={file.url}
                    shape="square"
                    size={100}
                  />
                  <button
                    onClick={() => onRemove(file)}
                    className="text-red-500 text-sm absolute top-1 right-22 cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
          </div>
        )}
      </Upload>
    </ImgCrop>
  );
};

export default AntdCropImgUpload;

import React, { useState } from "react";
import { Avatar, Button, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { Upload as UploadImg, X } from "lucide-react";

const CropImgUploader = () => {
  const [fileList, setFileList] = useState([]);

  const onChange = ({ fileList: newFileList }) => {
    // Update fileList with processed files
    const updatedFileList = newFileList.map((file) => {
      if (file.originFileObj && !file.thumbUrl) {
        return {
          ...file,
          thumbUrl: URL.createObjectURL(file.originFileObj), // Generate thumbUrl for preview
          alt: "User-selected photo displayed as a square avatar thumbnail with a remove button in the top right corner. The image is shown in a modern web interface for uploading and cropping images. The surrounding environment includes upload and preview controls, and the overall tone is functional and user-friendly.",
        };
      }
      return file;
    });
    setFileList(updatedFileList);
  };

  const onPreview = async (file) => {
    let src = file.url || file.thumbUrl;
    if (!src && file.originFileObj) {
      src = URL.createObjectURL(file.originFileObj);
    }
    if (src) {
      const imgWindow = window.open("");
      if (imgWindow) {
        imgWindow.document.write(
          `<img src="${src}" style="max-width: 100%;" />`
        );
      }
    }
  };

  const onRemove = (file) => {
    const updatedFileList = fileList.filter((item) => {
      if (item.uid === file.uid && item.thumbUrl) {
        URL.revokeObjectURL(item.thumbUrl);
      }
      return item.uid !== file.uid;
    });
    setFileList(updatedFileList);
  };

  const handleBeforeUploadImage = (file) => {
    return new Promise((resolve, reject) => {
      let isImage = file.type.match("image") ? true : false;
      if (!isImage) {
        console.log("false");
        return reject(false);
      } else {
        console.log("true");
      }
      return resolve(true);
    });
  };

  return (
    <>
      <ImgCrop rotationSlider onModalOk={(file) => {console.log("on modal ok fiel", file)}} >
        <Upload
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
          onRemove={onRemove}
          listType="text"
          showUploadList={false}
          maxCount={5}
          beforeUpload={handleBeforeUploadImage}
        >
          {fileList.length < 5 && (
            <Button
              icon={<UploadImg size={16} />}
              className="py-2 px-3 rounded-md text-[#FFFFFF] mt-2 bg-blue-500 hover:bg-blue-600"
            >
              Upload Image
            </Button>
          )}
        </Upload>
      </ImgCrop>

      {fileList.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-4">
          {fileList.map((file) => (
            <div key={file.uid} className="relative">
              <Avatar
                src={file.thumbUrl || file.url}
                shape="square"
                size={100}
                alt={file.alt}
                onError={() => {
                  console.error("Failed to load image:", file);
                  return false;
                }}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onRemove(file);
                }}
                className="absolute top-1 right-1 text-red-500 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CropImgUploader;
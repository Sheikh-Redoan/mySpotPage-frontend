import { useRef, useEffect, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import { X } from "lucide-react";

const ImageCropModal = ({
  isOpen,
  onClose,
  image,
  onCropFinish,
  scale = 1.2,
  minScale = 0.5,
  maxScale = 3,
}) => {
  const editorRef = useRef(null);
  const [imgScaleValue, setImgScaleValue] = useState(scale);

  useEffect(() => {
    if (isOpen) {
      setImgScaleValue(scale);
    }
  }, [isOpen, scale]);

  if (!isOpen || !image) return null;

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY;
    setImgScaleValue((prev) => {
      let newScale = prev + (delta > 0 ? -0.05 : 0.05);
      newScale = Math.min(Math.max(newScale, minScale), maxScale);
      return newScale;
    });
  };

  const handleFinish = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      const croppedImage = canvas.toDataURL();
      onCropFinish(croppedImage);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#111113cc] flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-[95%] max-w-3xl">
        {/* Header */}
        <div className="flex justify-between items-center py-6 px-6">
          <h3 className="text-xl font-semibold text-[#242528]">Crop image</h3>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-[#52555B] hover:scale-105 hover:text-[#3c3e42]" />
          </button>
        </div>

        {/* Avatar Editor */}
        <div
          className="flex justify-center items-center py-2"
          onWheel={handleWheel}
        >
          <AvatarEditor
            ref={editorRef}
            image={image}
            width={480}
            height={250}
            scale={imgScaleValue}
            rotate={0}
            color={[255, 255, 255, 0.6]}
            className="object-contain w-full max-h-[70vh]"
          />
        </div>

        {/* Finish Button */}
        <div className="flex justify-end my-3 pr-6">
          <button
            onClick={handleFinish}
            className="text-[#242528] cursor-pointer hover:text-[#141516] hover:font-semibold font-medium text-lg py-2"
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropModal;

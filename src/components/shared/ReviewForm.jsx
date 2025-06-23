import { useState } from "react";
import { Upload, Button, Input, Rate } from "antd";
import { FaTrashAlt } from "react-icons/fa";
import { GrUpload } from "react-icons/gr";
import { Star } from "lucide-react";

const MAX_IMAGES = 2;

const ReviewForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState([]);

  const handleImageChange = ({ file }) => {
    const normalizedFile = {
      uid: file.uid,
      name: file.name,
      originFileObj: file.originFileObj || file,
      thumbUrl: file.thumbUrl || URL.createObjectURL(file.originFileObj || file),
    };

    setImages((prev) => {
      if (prev.length < MAX_IMAGES) {
        return [...prev, normalizedFile];
      } else {
        return [prev[0], normalizedFile];
      }
    });
  };

  const handleRemove = (file) => {
    setImages((prev) => prev.filter((item) => item.uid !== file.uid));
  };

const handleSubmit = () => {
  const review = { rating, comment, images };
  console.log(review)
  if (onSubmit && typeof onSubmit === "function") {
    onSubmit(review);
  }
};

  const isDisabled = rating === 0 || comment === "" || images.length === 0;

  return (
    <div className="max-w-sm w-full mx-auto px-3 pb-36">
      <div className="bg-white rounded-xl shadow-sm p-6 space-y-4 mt-4 ">
        <div className="text-center">
          <div className="text-3xl mb-1">😄</div>
          <h2 className="font-semibold text-lg">How was your experience?</h2>
          <p className="text-sm text-gray-500">Let us know your thoughts</p>
        </div>

        <div className="flex justify-center my-5">
          <Rate
            value={rating}
            onChange={setRating}
            character={({ index }) => (
              <span
                className={
                  index < rating ? "text-primary01 text-xl" : "text-gray-300 text-xl"
                }
              >
                <Star />
              </span>
            )}
          />
        </div>

        <Input.TextArea
          rows={6}
          placeholder="Type your comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="rounded-md"
        />

        <div className="text-sm font-medium text-gray-700 flex items-center justify-between my-4">
          <p>Service Provider’s Image</p>
          {images.length === 0 && (
            <p className="text-xs text-gray-400 mb-1">No image provided.</p>
          )}
        </div>

        <Upload
          multiple
          fileList={images}
          beforeUpload={() => false}
          onChange={handleImageChange}
          onRemove={handleRemove}
          listType="picture"
          showUploadList={false}
        >
          <Button icon={<GrUpload />} className="w-full justify-center flex">
            Upload Your Image (Max: 2)
          </Button>
        </Upload>

        <div className="space-y-4 mt-5">
          {images.map((file) => (
            <div
              key={file.uid}
              className="flex items-center justify-between border border-border px-2 py-2 rounded-md"
            >
              <div className="flex items-center gap-2">
                <img
                  src={file.thumbUrl || URL.createObjectURL(file.originFileObj)}
                  alt={file.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <span className="text-sm text-description">{file.name}</span>
              </div>
              <button onClick={() => handleRemove(file)}>
                <FaTrashAlt className="text-red-400 cursor-pointer" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed md:static bottom-0 w-full left-0 py-5 bg-white px-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <Button
          disabled={isDisabled}
          type="primary"
          block
          className={`!font-semibold !my-4 !py-5 ${
            isDisabled
              ? "!bg-highlight01 !text-primary01 !border-none"
              : "!bg-primary01 hover:!bg-primary01 !text-white"
          }`}
          onClick={handleSubmit}
        >
          Submit Review
        </Button>
      </div>
    </div>
  );
};

export default ReviewForm;

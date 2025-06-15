import { useState } from "react";
import { Upload, Button, Input, Rate } from "antd";
import { FaTrashAlt } from "react-icons/fa";
import { GrUpload } from "react-icons/gr";

const MAX_IMAGES = 2;

const ReviewForm = () => {
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
                // Replace the second image
                return [prev[0], normalizedFile];
            }
        });
    };


    const handleRemove = (file) => {
        setImages((prev) => prev.filter((item) => item.uid !== file.uid));
    };

    const handleSubmit = () => {
        console.log({ rating, comment, images });
    };

    return (
        <div className="max-w-sm w-full mx-auto ">
            <div className="max-w-sm w-full bg-white rounded-xl shadow-sm p-6 space-y-4 mx-auto mt-4 ">
                <div>
                    <div className="text-center mb-1">
                        <div className="text-3xl mb-1">😄</div>
                        <h2 className="font-semibold text-lg mb-2">How was your experience?</h2>
                        <p className="text-sm text-gray-500">Let us know your thoughts</p>
                    </div>

                    <div className="flex justify-center mb-4">
                        <Rate
                            value={rating}
                            onChange={setRating}
                            character={<span className="text-purple-400 text-xl">★</span>}
                        />
                    </div>

                    <Input.TextArea
                        rows={6}
                        placeholder="Type your comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="rounded-md"
                    />

                    <div className="text-sm font-medium  text-gray-700 flex items-center justify-between my-4">
                        <p>Service Provider’s Image</p>
                        {images.length === 0 && (
                            <p className="text-xs text-gray-400 mb-1">No image provided.</p>
                        )}
                    </div>


                    <div className="w-full mx-auto">
                        <Upload
                            multiple
                            fileList={images}
                            beforeUpload={() => false}
                            onChange={handleImageChange}
                            onRemove={handleRemove}
                            listType="picture"
                            showUploadList={false}
                            className="w-full"
                            style={{ width: '100%' }} // force width via inline style
                        >
                            <Button
                                icon={<GrUpload />}
                                className="w-full justify-center flex"
                                style={{ width: '100%' }} // force width via inline style
                            >
                                Upload Your Image (Max: 2)
                            </Button>
                        </Upload>
                    </div>


                    {/* Image preview list */}
                    <div className="space-y-2 mt-5">
                        {images.map((file) => (
                            <div
                                key={file.uid}
                                className="flex items-center justify-between bg-gray-100 p-2 rounded-md"
                            >
                                <div className="flex items-center gap-2">
                                    {file.thumbUrl || file.originFileObj ? (
                                        <img
                                            src={
                                                file.thumbUrl ||
                                                URL.createObjectURL(file.originFileObj)
                                            }
                                            alt={file.name}
                                            className="w-10 h-10 object-cover rounded"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 bg-gray-300 rounded" />
                                    )}
                                    <span className="text-sm">{file.name}</span>
                                </div>
                                <button onClick={() => handleRemove(file)}>
                                    <FaTrashAlt className="text-red-500 hover:text-red-700" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
            <div className="fixed md:static bottom-0 w-full left-0 py-5 bg-white px-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                <Button
                    type="primary"
                    block
                    className="bg-purple-400 hover:bg-purple-500 text-white font-semibold mt-4 "
                    onClick={handleSubmit}
                >
                    Submit Review
                </Button>
            </div>
        </div>
    );
};

export default ReviewForm;

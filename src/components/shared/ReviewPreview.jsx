import { Avatar } from "antd";
import { Star } from "lucide-react";
import { HeartIcon } from "lucide-react";

const ReviewPreview = ({ rating, comment, images, user = { name: "John D." } }) => {
  const date = new Date();

  return (
    <div className="max-w-sm mx-auto px-4 py-6 bg-gray-50 min-h-[calc-(100vh-80px)] flex flex-col items-center">
      <HeartIcon className="text-primary01 w-8 h-8 mb-4" />

      <h2 className="text-xl font-semibold text-center">Thank You for Your Review!</h2>
      <p className="text-sm text-description text-center mb-5 mt-2">
        Your feedback helps us improve and provide better service. We appreciate your time!
      </p>

      <div className="w-full bg-white rounded-xl p-4">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="!bg-testimonial-avatar !uppercase !text-xl !p-5 !font-bold">{user.name.charAt(0)}</Avatar>
          <div className="space-y-0.5">
            <p className="font-semibold text-sm">{user.name}</p>
            <p className="text-xs text-description">
              {date.toLocaleDateString()} • {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </p>
          </div>
        </div>

        <div className="flex items-center mt-6 mb-4">
          {Array.from({ length: rating }).map((_, idx) => (
            <Star key={idx} className="text-primary01 text-lg" />
          ))}
        </div>

        <p className="text-sm text-gray-700 mb-3 whitespace-pre-line">{comment}</p>

        {images.length > 0 && (
          <div className="flex gap-3 mt-5">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img.thumbUrl || URL.createObjectURL(img.originFileObj)}
                alt={`Uploaded ${idx}`}
                className="w-24 h-24 rounded-md object-cover"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewPreview;

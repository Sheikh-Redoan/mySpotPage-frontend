import { Star, Star as StarEmpty, StarHalf } from "lucide-react";
import Translator from "../shared/Translator";

const TestimonialCard = ({
  name,
  date,
  time,
  avatar,
  images,
  description,
  rating,
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.1 && rating - fullStars <= 0.9;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-4">
        {avatar ? (
          <img
            src={avatar}
            alt={`${name}'s avatar`}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="size-12 rounded-full bg-testimonial-avatar flex items-center justify-center text-white font-semibold text-xl">
            <Translator text={name.charAt(0)} />
          </div>
        )}
        <div>
          <div className="font-semibold">
            <Translator text={name} />
          </div>
          <div className="text-sm text-description">
            <Translator text={`${date} at ${time}`} />
          </div>
        </div>
      </div>

      {/* Stars */}
      <div className="flex text-yellow-400">
        {Array(fullStars)
          .fill(0)
          .map((_, i) => (
            <Star
              key={`full-${i}`}
              size={16}
              fill="currentColor"
              stroke="currentColor"
            />
          ))}
        {hasHalfStar && (
          <StarHalf size={16} fill="currentColor" stroke="currentColor" />
        )}
        {Array(emptyStars)
          .fill(0)
          .map((_, i) => (
            <StarEmpty
              key={`empty-${i}`}
              size={16}
              fill="none"
              stroke="currentColor"
            />
          ))}
      </div>

      {/* Description */}
      <p className="text-sm md:text-base text-description">
        <Translator text={description} />
      </p>

      {/* Images */}
      <div className="flex gap-2">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt="hair style"
            className="size-28 object-cover rounded-md"
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCard;

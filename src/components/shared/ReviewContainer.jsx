import { useState } from "react";
import ReviewPreview from "./ReviewPreview";
import ReviewForm from "./ReviewForm";

const ReviewContainer = () => {
    const [submitted, setSubmitted] = useState(false);
    const [reviewData, setReviewData] = useState(null);
    console.log(reviewData)

    const handleReviewSubmit = (data) => {
        setReviewData(data);
        setSubmitted(true);
    };

    return submitted ? (
        <ReviewPreview {...reviewData} />
    ) : (
        <ReviewForm onSubmit={handleReviewSubmit} />
    );
};

export default ReviewContainer;

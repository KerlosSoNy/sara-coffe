"use client";

import { useState, useEffect } from "react";
import { getProductReviews } from "@/lib/woocommerce";
import ReviewForm from "./ReviewForm";

export default function ProductReviews({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  const fetchReviews = async () => {
    try {
      const data = await getProductReviews(productId);
      setReviews(data);
    } catch (err) {
      setError(err.message || "Failed to load reviews.");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
      {error && <p className="text-red-500">{error}</p>}
      {reviews.length > 0 ? (
        <ul className="space-y-4">
          {reviews.map((review) => (
            <li key={review.id} className="border-b pb-4">
              <p className="text-sm text-gray-600">
                <strong>{review.reviewer}</strong> - {review.date_created}
              </p>
              <div className="text-yellow-500">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>
              <p className="text-gray-700">{review.review}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No reviews yet.</p>
      )}

      {/* Add Review Form */}
      <ReviewForm productId={productId} onReviewSubmitted={fetchReviews} />
    </div>
  );
}

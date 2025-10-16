import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import "../App.css";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  useEffect(() => {
    fetch("https://testimonial-reviews-1.onrender.com/api/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error("Error fetching reviews:", err));
  }, []);
  const reviewForm = useFormik({
    initialValues: { content: "" },
    onSubmit: async (values, { resetForm }) => {
      if (!user) {
        alert("Please log in to submit a review");
        return;
      }

      const newReview = {
        username: user.username.toUpperCase() || "Anonymous",
        content: values.content,
        profile:user.username.split(" ").map((w)=>w[0].toUpperCase()).join("")
      };

      try {
        const res = await fetch("https://testimonial-reviews-1.onrender.com/api/reviews", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newReview),
        });

        if (!res.ok) throw new Error("Failed to save review");

        const savedReview = await res.json();
        setReviews([savedReview, ...reviews]); // Update UI instantly
        resetForm();
      } catch (error) {
        console.error("Error submitting review:", error);
        alert("Something went wrong while saving your review");
      }
    },
  });

  return (
    <div className="reviews-container">
      <div className="review-form-card">
        <h1>Wall of Love for Edupoly ❤️</h1>
        <form onSubmit={reviewForm.handleSubmit}>
          <textarea
            placeholder="Write your testimonial..."
            {...reviewForm.getFieldProps("content")}
            className="review-textarea"
          />
          <button type="submit" className="submit-btn">
            Submit Your Testimonial
          </button>
        </form>
      </div>

      <div className="reviews-list">
        {reviews.length === 0 ? (
          <p className="no-reviews">No reviews yet. Be the first!</p>
        ) : (
          reviews.map((r) => (
            <div key={r._id} className="review-card">
              <div className="review-header">
             <div className="profile"> <h2>{r.profile}</h2></div>
                <strong>{r.username}</strong>
                <span className="review-date">
                  {new Date(r.date).toLocaleString()}
                </span>
              </div>
              <p className="review-content">{r.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Reviews;


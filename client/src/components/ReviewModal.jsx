import React, { useState, useEffect } from 'react';

const ReviewModal = ({ isOpen, onClose, onSubmit, colleges, initialCollegeId, availableTags }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedCollegeId, setSelectedCollegeId] = useState(initialCollegeId);

  const defaultTags = ["Good Vibes", "Great Food", "Friendly", "Strict", "Beautiful Campus"];
  const tagsToUse = availableTags || defaultTags;

  // Reset form when modal opens or college changes
  useEffect(() => {
    if (isOpen) {
      setRating(0);
      setReview('');
      setSelectedTags([]);
      setSelectedCollegeId(initialCollegeId);
    }
  }, [isOpen, initialCollegeId]);

  if (!isOpen) return null;

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      if (selectedTags.length < 3) {
        setSelectedTags([...selectedTags, tag]);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      collegeId: selectedCollegeId,
      rating,
      text: review,
      tags: selectedTags
    });
    setRating(0);
    setReview('');
    setSelectedTags([]);
  };

  return (
    <div className="modal-overlay">
      <style>{cssStyles}</style>
      <div className="modal-content">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="close-btn"
          aria-label="Close modal"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="modal-body">
          {/* Header */}
          <h2 className="modal-title">
            Log a <span className="highlight-text">College Visit</span>
          </h2>

          {/* College Selection Dropdown */}
          {colleges && colleges.length > 0 && (
            <div className="form-group">
              <label htmlFor="college-select" className="input-label">
                Select College
              </label>
              <select
                id="college-select"
                value={selectedCollegeId}
                onChange={(e) => setSelectedCollegeId(Number(e.target.value))}
                className="college-select"
              >
                {colleges.map((college) => (
                  <option key={college.id} value={college.id}>
                    {college.name} - {college.location}
                  </option>
                ))}
              </select>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            
            {/* Star Rating Section */}
            <div className="form-group">
              <label className="rating-label">Rating</label>
              <div className="star-container">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    className={`star-btn ${star <= (hover || rating) ? 'active' : ''}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            {/* Review Textarea */}
            <div className="form-group">
              <label htmlFor="review" className="input-label">
                Review <span className="optional-text">(Optional)</span>
              </label>
              <textarea
                id="review"
                rows="4"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="How were the vibes? Be honest."
                className="review-textarea"
              />
            </div>

            {/* Tags Section */}
            <div className="form-group">
              <div className="tags-header">
                <label className="input-label">Vibe Check</label>
                <span className="max-select-text">Select max 3</span>
              </div>
              <div className="tags-container">
                {tagsToUse.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`tag-btn ${selectedTags.includes(tag) ? 'selected' : ''}`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="modal-actions">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-cancel"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-save"
              >
                Save Log
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

// CSS Styles injected as a string to ensure single-file reliability
const cssStyles = `
/* Global Reset / Basics for the Modal */
* {
  box-sizing: border-box;
}

/* Page Background (for the demo button container) */
.page-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #030712; /* gray-950 */
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

.open-btn {
  padding: 12px 24px;
  background-color: #22c55e; /* green-500 */
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 10px 15px -3px rgba(34, 197, 94, 0.2);
  transition: background-color 0.2s;
  font-size: 1rem;
}

.open-btn:hover {
  background-color: #16a34a; /* green-600 */
}

/* Modal Overlay / Backdrop */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  animation: fadeIn 0.2s ease-out;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

/* Modal Content Container */
.modal-content {
  position: relative;
  width: 100%;
  max-width: 450px;
  background-color: #111827; /* gray-900 */
  border: 1px solid #1f2937; /* gray-800 */
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-body {
  padding: 32px;
}

/* Close Button */
.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  background: transparent;
  border: none;
  color: #9ca3af; /* gray-400 */
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.close-btn:hover {
  color: white;
  background-color: #1f2937; /* gray-800 */
}

/* Header */
.modal-title {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  color: white;
  margin-bottom: 32px;
  margin-top: 0;
}

.highlight-text {
  color: #22c55e; /* green-500 */
}

/* Form Groups */
.form-group {
  margin-bottom: 24px;
}

/* Star Rating */
.rating-label {
  display: block;
  text-align: center;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #9ca3af; /* gray-400 */
  margin-bottom: 12px;
}

.star-container {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.star-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  font-size: 2.25rem;
  line-height: 1;
  transition: transform 0.1s;
  color: #374151; /* gray-700 (inactive) */
}

.star-btn:hover {
  transform: scale(1.1);
}

.star-btn:active {
  transform: scale(0.95);
}

.star-btn.active {
  color: #22c55e; /* green-500 */
}

/* Text Area */
.input-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #d1d5db; /* gray-300 */
  margin-bottom: 8px;
}

.optional-text {
  font-weight: normal;
  color: #6b7280; /* gray-500 */
}

.review-textarea {
  width: 100%;
  padding: 16px;
  background-color: #1f2937; /* gray-800 */
  color: white;
  border: 1px solid #374151; /* gray-700 */
  border-radius: 12px;
  font-size: 0.875rem;
  resize: none;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  font-family: inherit;
}

.review-textarea:focus {
  border-color: #22c55e;
  box-shadow: 0 0 0 1px #22c55e;
}

.review-textarea::placeholder {
  color: #6b7280;
}

/* Tags */
.tags-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.max-select-text {
  font-size: 0.75rem;
  color: #6b7280;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-btn {
  padding: 6px 12px;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 8px;
  border: 1px solid transparent;
  cursor: pointer;
  background-color: #1f2937; /* gray-800 */
  color: #9ca3af; /* gray-400 */
  transition: all 0.2s;
}

.tag-btn:hover {
  border-color: #4b5563;
  color: #e5e7eb;
}

.tag-btn.selected {
  background-color: rgba(34, 197, 94, 0.1); /* green-500 with opacity */
  color: #4ade80; /* green-400 */
  border-color: #22c55e;
}

/* Action Buttons */
.modal-actions {
  display: flex;
  gap: 12px;
  padding-top: 16px;
}

.btn {
  flex: 1;
  padding: 12px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  font-size: 1rem;
  transition: background-color 0.2s;
}

.btn-cancel {
  background-color: #1f2937; /* gray-800 */
  color: #d1d5db; /* gray-300 */
}

.btn-cancel:hover {
  background-color: #374151; /* gray-700 */
  color: white;
}

.btn-save {
  background-color: #22c55e; /* green-500 */
  color: #111827; /* gray-900 */
  box-shadow: 0 10px 15px -3px rgba(34, 197, 94, 0.2);
}

.btn-save:hover {
  background-color: #4ade80; /* green-400 */
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleUp {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

/* College Select Dropdown */
.college-select {
  width: 100%;
  padding: 10px 12px;
  background-color: #1f2937; /* gray-800 */
  border: 1px solid #374151; /* gray-700 */
  color: #f3f4f6; /* gray-100 */
  border-radius: 8px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: border-color 0.2s, background-color 0.2s;
}

.college-select:hover {
  border-color: #4b5563; /* gray-600 */
}

.college-select:focus {
  outline: none;
  border-color: #22c55e; /* green-500 */
  background-color: #111827; /* gray-900 */
}

.college-select option {
  background-color: #111827; /* gray-900 */
  color: #f3f4f6; /* gray-100 */
}
`;

export default ReviewModal;
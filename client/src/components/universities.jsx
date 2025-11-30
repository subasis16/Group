import React, { useState, useMemo } from 'react';
import { MapPin, Filter, Search, Star, X } from 'lucide-react';


// --- EMBEDDED CSS ---
const STYLES = `
/* --- VARIABLES & RESET --- */
:root {
  --bg-color: #14181c;
  --card-bg: #1f252b;
  --border-color: #2c3440;
  --text-main: #ffffff;
  --text-muted: #99aabb;
  --accent-green: #00e054;
  --accent-blue: #40bcf4;
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

/* Wrapper to enforce dark theme locally */
.universities-wrapper {
  background-color: var(--bg-color);
  color: var(--text-main);
  font-family: var(--font-sans);
  min-height: 100vh;
  width: 100%;
  padding-bottom: 4rem;
}

/* --- UTILITIES --- */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: var(--bg-color); }
::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: #445566; }

/* --- MAIN LAYOUT --- */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 768px) {
  .container { grid-template-columns: 3fr 1fr; }
}

/* --- TYPOGRAPHY & BUTTONS --- */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid var(--accent-green);
  padding-bottom: 0.25rem;
}

.section-header h2 {
  font-size: 0.875rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.btn-primary {
  background-color: var(--accent-green);
  color: var(--bg-color);
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 4px;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}
.btn-primary:hover { background-color: white; transform: scale(1.05); }

/* --- GRID & CARDS --- */
.grid-layout {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 1rem;
}

.college-card { cursor: pointer; position: relative; }

.poster-wrapper {
  position: relative;
  aspect-ratio: 2 / 3;
  background-color: var(--card-bg);
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid transparent;
  transition: all 0.2s;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5);
}
.poster-wrapper:hover { border-color: var(--accent-green); transform: translateY(-4px); }

.poster-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.9;
  transition: opacity 0.3s;
}
.poster-wrapper:hover img { opacity: 1; }

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
  opacity: 0;
  transition: opacity 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0.75rem;
}
.poster-wrapper:hover .overlay { opacity: 1; }

.rating-badge {
  position: absolute;
  top: 8px; right: 8px;
  background: rgba(0,0,0,0.7);
  color: var(--accent-green);
  font-size: 0.75rem;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 4px;
}

.college-info h3 {
  font-size: 0.9rem;
  margin-top: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #e0e0e0;
}
.college-info p { font-size: 0.75rem; color: var(--text-muted); }

/* --- SIDEBAR --- */
.sidebar { color: var(--text-main); }
.form-label {
  font-size: 0.75rem;
  font-weight: bold;
  color: var(--text-muted);
  text-transform: uppercase;
}

/* --- REVIEW MODAL --- */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease-out;
}

.modal-content {
  background: var(--card-bg);
  width: 90%;
  max-width: 500px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.modal-header {
  background: var(--bg-color);
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 { color: white; font-size: 1.125rem; font-weight: bold; }
.close-btn { background: none; border: none; color: var(--text-muted); cursor: pointer; }
.close-btn:hover { color: white; }

.modal-body { padding: 1.5rem; }

.star-rating { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
.star-btn { background: none; border: none; cursor: pointer; transition: transform 0.1s; }
.star-btn:hover { transform: scale(1.1); }
.star-btn svg { width: 32px; height: 32px; fill: none; stroke: var(--border-color); stroke-width: 2; }
.star-btn.active svg { fill: var(--accent-green); stroke: var(--accent-green); }

.review-input {
  width: 100%;
  background: #14181c;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 0.75rem;
  color: white;
  font-family: var(--font-sans);
  font-size: 0.875rem;
  resize: none;
  margin-bottom: 1rem;
}
.review-input:focus { outline: 1px solid var(--accent-green); }

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}

.btn-secondary {
  background: none;
  border: none;
  color: var(--text-muted);
  font-weight: bold;
  cursor: pointer;
  font-size: 0.875rem;
}
.btn-secondary:hover { color: white; }

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
`;

// --- UPDATED MOCK DATA: ODISHA ONLY ---
const UNIVERSITY_DATA = [
  { id: 1, name: "IIT Bhubaneswar", state: "Odisha", location: "Bhubaneswar, OD", rating: 4.5, image: "https://digitallearning.eletsonline.com/wp-content/uploads/2024/11/IIT-Bhubaneswar-1.jpg" },
  { id: 2, name: "KIIT University", state: "Odisha", location: "Bhubaneswar, OD", rating: 4.2, image: "https://assets.telegraphindia.com/telegraph/2022/Jan/1641991907_kiit31.jpg" },
  { id: 3, name: "NIT Rourkela", state: "Odisha", location: "Rourkela, OD", rating: 4.6, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR3J1j5y_pe4rw-1xwqBLwr-ngQnS7n-dpfQ&s" },
  { id: 4, name: "Ravenshaw University", state: "Odisha", location: "Cuttack, OD", rating: 4.0, image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=400" },
  { id: 5, name: "SOA University", state: "Odisha", location: "Bhubaneswar, OD", rating: 4.1, image: "https://sefet.in/assets/img/soa_campus.jpeg" },
  { id: 6, name: "Utkal University", state: "Odisha", location: "Bhubaneswar, OD", rating: 3.9, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHffIc8NCsWQ8Ivw475PVTAdj41plKP2NL9Q&s" },
  { id: 7, name: "XIM University", state: "Odisha", location: "Bhubaneswar, OD", rating: 4.4, image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=400" },
  { id: 8, name: "DRIEMS University", state: "Odisha", location: "Tangi, OD", rating: 1.0, image: "https://www.driems.ac.in/wp-content/uploads/2024/09/Reasearch-Academics.jpg" },
];

const STATES = ["All", "Odisha"];

// --- REVIEW MODAL COMPONENT ---
const ReviewModal = ({ uni, onClose, onSubmit, reviewsLeft }) => {
  // Check if it's DRIEMS to auto-fill negative data
  const isDriems = uni.name.includes("DRIEMS");
  
  const [rating, setRating] = useState(isDriems ? 1 : 0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState(isDriems ? "The management is extremely unorganized and the campus facilities are outdated. Not a great experience for students." : "");

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Please give a star rating!");
      return;
    }
    onSubmit({ uniId: uni.id, rating, reviewText });
  };

  return (
    <div className="modal-overlay" onClick={(e) => { if(e.target === e.currentTarget) onClose(); }}>
      <div className="modal-content">
        <div className="modal-header">
          <h3>Log {uni.name}</h3>
          <button className="close-btn" onClick={onClose}><X size={24} /></button>
        </div>
        
        <div className="modal-body">
          <p style={{ color: '#99aabb', marginBottom: '1rem', fontSize: '0.875rem' }}>
            Reviews remaining: <span style={{ color: reviewsLeft > 0 ? '#00e054' : '#ff4444', fontWeight: 'bold' }}>{reviewsLeft}</span>
          </p>

          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <button 
                key={star}
                className={`star-btn ${star <= (hoverRating || rating) ? 'active' : ''}`}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              >
                <Star />
              </button>
            ))}
          </div>

          <textarea 
            className="review-input"
            rows="4"
            placeholder="Add a review..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />

          <div className="modal-footer">
            <button className="btn-secondary" onClick={onClose}>Cancel</button>
            <button className="btn-primary" onClick={handleSubmit}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Universities = () => {
  const [activeState, setActiveState] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Review Logic States
  const [reviewsWritten, setReviewsWritten] = useState(0);
  const [selectedUni, setSelectedUni] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter Logic
  const filteredUniversities = useMemo(() => {
    return UNIVERSITY_DATA.filter(uni => {
      const matchesState = activeState === "All" || uni.state === activeState;
      const matchesSearch = uni.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesState && matchesSearch;
    });
  }, [activeState, searchQuery]);

  const handleUniClick = (uni) => {
    setSelectedUni(uni);
    setIsModalOpen(true);
  };

  const handleReviewSubmit = (reviewData) => {
    if (reviewsWritten >= 2) {
      alert("Account Limit Reached: You can only review 2 colleges.");
      setIsModalOpen(false);
      return;
    }

    // Here you would typically save to backend
    console.log("Review Submitted:", reviewData);
    setReviewsWritten(prev => prev + 1);
    setIsModalOpen(false);
    alert("Review saved successfully!");
  };

  return (
    <>
      <style>{STYLES}</style>
      <div className="universities-wrapper">
        <div className="container">
          
          {/* LEFT COLUMN: The Grid */}
          <div className="main-content">
            <div className="section-header">
              <h2>
                Browsing <span style={{ color: '#ffffff' }}>{activeState}</span> Universities
              </h2>
              <span style={{ fontSize: '0.75rem', color: '#99aabb' }}>
                {filteredUniversities.length} found
              </span>
            </div>

            <div className="grid-layout">
              {filteredUniversities.length > 0 ? (
                filteredUniversities.map((uni) => (
                  <div key={uni.id} className="college-card" onClick={() => handleUniClick(uni)}>
                    <div className="poster-wrapper">
                      <img src={uni.image} alt={uni.name} />
                      <div className="rating-badge">{uni.rating}</div>
                      <div className="overlay">
                        <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                          Log / Review
                        </button>
                      </div>
                    </div>
                    <div className="college-info">
                      <h3>{uni.name}</h3>
                      <p><MapPin size={12} style={{ display: 'inline', marginRight: '4px' }} />{uni.location}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ color: '#99aabb', gridColumn: '1/-1', textAlign: 'center', padding: '4rem' }}>
                  No universities found in {activeState}.
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Sidebar Filters */}
          <div className="sidebar">
            <div style={{ marginBottom: '2rem' }}>
              <h2 className="form-label" style={{ borderBottom: '1px solid #2c3440', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                Find a Campus
              </h2>
              <div className="search-bar" style={{ width: '100%', position: 'relative' }}>
                <input 
                  type="text" 
                  placeholder="Search by name..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: '100%', backgroundColor: '#1f252b', border: '1px solid #2c3440', color: 'white', padding: '0.5rem 1rem 0.5rem 2.5rem', borderRadius: '9999px', fontSize: '0.875rem' }}
                />
                <Search size={16} color="#99aabb" style={{ position: 'absolute', left: '10px', top: '10px' }} />
              </div>
            </div>

            <div className="filter-panel">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #2c3440', paddingBottom: '0.5rem' }}>
                <h2 className="form-label" style={{ marginBottom: 0 }}>Filter by State</h2>
                <Filter size={14} color="#99aabb" />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {STATES.map(state => (
                  <button
                    key={state}
                    onClick={() => setActiveState(state)}
                    style={{
                      textAlign: 'left',
                      background: activeState === state ? '#2c3440' : 'transparent',
                      border: 'none',
                      color: activeState === state ? '#fff' : '#99aabb',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: activeState === state ? 'bold' : 'normal',
                      display: 'flex',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s'
                    }}
                  >
                    {state}
                    {activeState === state && <span style={{ color: '#00e054' }}>•</span>}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Account Status */}
            <div style={{ marginTop: '2rem', background: '#1f252b', padding: '1rem', borderRadius: '8px', border: '1px solid #2c3440' }}>
              <h3 style={{ fontSize: '0.875rem', color: '#fff', marginBottom: '0.5rem' }}>Your Account</h3>
              <p style={{ fontSize: '0.75rem', color: '#99aabb', marginBottom: '1rem' }}>
                You have reviewed {reviewsWritten} of 2 colleges.
              </p>
              <div style={{ height: '4px', background: '#2c3440', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${(reviewsWritten / 2) * 100}%`, background: '#00e054' }}></div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {isModalOpen && selectedUni && (
        <ReviewModal 
          uni={selectedUni} 
          onClose={() => setIsModalOpen(false)} 
          onSubmit={handleReviewSubmit}
          reviewsLeft={2 - reviewsWritten}
        />
      )}
    </>
  );
};

export default Universities;



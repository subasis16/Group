import React, { useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CollegeGrid from "./components/CollegeGrid";
import SidebarActivity from "./components/SidebarActivity";
import ReviewModal from "./components/ReviewModal";
import Footer from "./components/Footer";

// --- DATA ---
const INITIAL_COLLEGES = [
  { id: 1, name: "NYU", location: "New York, NY", image: "https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?auto=format&fit=crop&q=80&w=400", rating: 4.2, reviews: 1240 },
  { id: 2, name: "UCLA", location: "Los Angeles, CA", image: "https://images.unsplash.com/photo-1592419044706-39796d40f98c?auto=format&fit=crop&q=80&w=400", rating: 4.5, reviews: 3102 },
  { id: 3, name: "Harvard", location: "Cambridge, MA", image: "https://images.unsplash.com/photo-1559135197-8a45ea802319?auto=format&fit=crop&q=80&w=400", rating: 4.8, reviews: 580 },
  { id: 4, name: "UT Austin", location: "Austin, TX", image: "https://images.unsplash.com/photo-1532649538666-9304a453c6b3?auto=format&fit=crop&q=80&w=400", rating: 4.4, reviews: 2100 },
  { id: 5, name: "Stanford", location: "Stanford, CA", image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=400", rating: 4.9, reviews: 920 },
  { id: 6, name: "Columbia", location: "New York, NY", image: "https://images.unsplash.com/photo-1520962922320-2038eebab146?auto=format&fit=crop&q=80&w=400", rating: 4.1, reviews: 890 },
  { id: 7, name: "Yale", location: "New Haven, CT", image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&q=80&w=400", rating: 4.6, reviews: 650 },
  { id: 8, name: "Michigan", location: "Ann Arbor, MI", image: "https://images.unsplash.com/photo-1592280771884-1d42785608c5?auto=format&fit=crop&q=80&w=400", rating: 4.3, reviews: 1800 },
];

const INITIAL_REVIEWS = [
  { id: 101, user: "campus_king", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80", collegeId: 2, rating: 5, text: "Literally the best four years of my life. Food is S-tier.", tags: ["Party School", "Good Food"], time: "20m ago" },
  { id: 102, user: "studygirl_99", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80", collegeId: 3, rating: 4, text: "Hard work but worth it. The library smells like success.", tags: ["Study Grind"], time: "1h ago" },
  { id: 103, user: "gymbro_austin", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&q=80", collegeId: 4, rating: 5, text: "Tailgates are insane. Hook 'em!", tags: ["Sports Heavy", "Greek Life"], time: "3h ago" },
];

const AVAILABLE_TAGS = [
  "Party School",
  "Study Grind",
  "Sports Heavy",
  "Arts & Culture",
  "Commuter",
  "Greek Life",
  "Good Food",
];

export default function App() {
  const [colleges] = useState(INITIAL_COLLEGES);
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCollegeId, setSelectedCollegeId] = useState(null);

  const filteredColleges = useMemo(
    () =>
      colleges.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [colleges, searchQuery]
  );

  const handleOpenModal = (collegeId = null) => {
    setSelectedCollegeId(collegeId || colleges[0].id);
    setIsModalOpen(true);
  };

  const handleReviewSubmit = ({ collegeId, rating, text, tags }) => {
    const newReview = {
      id: Date.now(),
      user: "you",
      avatar:
        "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=150&q=80",
      collegeId,
      rating,
      text,
      tags,
      time: "Just now",
    };
    setReviews((prev) => [newReview, ...prev]);
    setIsModalOpen(false);
  };

  return (
    <>
      <Navbar
        onSearch={setSearchQuery}
        onOpenModal={() => handleOpenModal()}
      />
      <Hero />

      <main className="container">
        <CollegeGrid
          colleges={filteredColleges}
          searchQuery={searchQuery}
          onReview={handleOpenModal}
        />
        <SidebarActivity reviews={reviews} colleges={colleges} />
      </main>

      <Footer />

      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleReviewSubmit}
        colleges={colleges}
        initialCollegeId={selectedCollegeId}
        availableTags={AVAILABLE_TAGS}
      />
    </>
  );
}

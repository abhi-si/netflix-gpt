import React, { useRef, useState, useEffect } from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  const scrollContainerRef = useRef(null);
  const [showNext, setShowNext] = useState(false);
  const [showPrev, setShowPrev] = useState(false);

  // Function to check if we need to show scroll buttons
  const checkScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (container.scrollWidth > container.clientWidth) {
      setShowNext(true);
    } else {
      setShowNext(false);
    }
    if (container.scrollLeft > 0) {
      setShowPrev(true);
    } else {
      setShowPrev(false);
    }
  };

  // Function to scroll left
  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  // Function to scroll right
  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  // Check for button visibility after mount and on every scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    checkScrollButtons();
    container.addEventListener("scroll", checkScrollButtons);

    return () => {
      container.removeEventListener("scroll", checkScrollButtons);
    };
  }, []);

  return (
    <div className="p-6 relative">
      <h1 className="font-semibold text-white text-2xl md:text-3xl py-4">
        {title}
      </h1>
      <div className="relative flex items-center">
        {/* Previous Button (show only when needed) */}
        {showPrev && (
          <button
            className="absolute left-2 bg-opacity-90 bg-red-600 text-white animate-pulse p-3 text-3xl z-10"
            onClick={scrollLeft}
            style={{ top: "50%", transform: "translateY(-50%)" }} // Keep it vertically centered
          >
            &#8249;
          </button>
        )}

        {/* Movie List */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-scroll hide-scrollbar space-x-4"
          style={{ scrollBehavior: "smooth" }}
        >
          <div className="flex space-x-4 mt-5" style={{ width: "max-content" }}>
            {movies?.map((movie) => (
              <MovieCard key={movie.id} posterPath={movie?.poster_path} />
            ))}
          </div>
        </div>

        {/* Next Button (show only when needed) */}
        {showNext && (
          <button
            className="absolute right-2 bg-red-500 animate-pulse text-white p-3 bg-opacity-90 text-3xl z-10"
            onClick={scrollRight}
            style={{ top: "50%", transform: "translateY(-50%)" }} // Keep it vertically centered
          >
            &#8250;
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieList;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Dashboard = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

  // Initial fetch on component mount
  useEffect(() => {
    if (token) {
      fetchMovies("Avengers", 1); // Default search
    }
  }, [token]);

  const fetchMovies = async (searchTerm = "Avengers", pageNum = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }&query=${searchTerm}&page=${pageNum}`
      );
      setMovies(response.data.results);
      setTotalPages(response.data.total_pages);
      setPage(pageNum);
    } catch (err) {
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      fetchMovies(query, 1);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth");
  };

  const goToPage = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      fetchMovies(query || "Avengers", newPage);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-white">
        <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
        <p className="mb-4 text-gray-400">You must be logged in to view the dashboard.</p>
        <button
          onClick={() => navigate("/auth")}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="bg-gray-900 p-4 flex flex-col sm:flex-row justify-between items-center border-b border-gray-800">
        <div>
          <h1 className="text-2xl font-bold">🎬 Movie Dashboard</h1>
          {user && <p className="text-sm text-gray-400">Welcome, {user.name}</p>}
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded mt-3 sm:mt-0"
        >
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 max-w-7xl mx-auto">
        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies..."
            className="w-full sm:w-2/3 md:w-1/2 px-4 py-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded text-white"
          >
            Search
          </button>
        </form>

        {/* Loading State */}
        {loading ? (
          <div className="text-center text-gray-400 animate-pulse">Loading movies...</div>
        ) : movies.length > 0 ? (
          <>
            {/* Movie Grid */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {movies.map((movie) => (
                <motion.div
                  key={movie.id}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="bg-gray-800 rounded-lg overflow-hidden shadow-md cursor-pointer"
                  onClick={() => navigate(`/movie/${movie.id}`)}
                >
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                        : "https://via.placeholder.com/300x450?text=No+Image"
                    }
                    alt={movie.title}
                    className="w-full h-[250px] object-cover"
                  />
                  <div className="p-3">
                    <h2 className="text-base font-semibold truncate">{movie.title}</h2>
                    <p className="text-xs text-gray-400">{movie.release_date}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-8 gap-4">
              <button
                onClick={() => goToPage(page - 1)}
                disabled={page === 1}
                className="bg-gray-700 px-4 py-2 rounded disabled:opacity-50"
              >
                Prev
              </button>
              <span className="text-sm text-gray-400">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => goToPage(page + 1)}
                disabled={page === totalPages}
                className="bg-gray-700 px-4 py-2 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-400 text-lg">No movies found.</p>
        )}
      </main>
    </div>
  );
};

export default Dashboard;

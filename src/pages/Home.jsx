import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [difficulty, setDifficulty] = useState("easy");
  const [category, setCategory] = useState(9);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://opentdb.com/api_category.php");
        setCategories(response.data.trivia_categories);
      } catch (error) {
        if (error.response) {
          // Server responded with a status other than 2xx
          console.error("Error response:", error.response.data);
        } else if (error.request) {
          // Request was made but no response received
          console.error("Error request:", error.request);
        } else {
          // Something else happened
          console.error("Error message:", error.message);
        }
      }
    };
  
    fetchCategories();
  }, []);
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      {/* Quiz Container */}
      <div className="w-full max-w-md p-8 bg-gray-800 shadow-lg rounded-lg space-y-6 border border-blue-500/50 shadow-blue-500/30">
        {/* Title */}
        <h2 className="text-3xl font-bold text-blue-400 text-center animate-pulse">
          Select  Quiz 🎯
        </h2>

        {/* Category Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-blue-300">📚 Category</label>
          <select
            className="w-full px-4 py-3 border border-blue-500 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-md shadow-blue-500/20"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-blue-300">⚡ Difficulty</label>
          <select
            className="w-full px-4 py-3 border border-blue-500 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-md shadow-blue-500/20"
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {/* Start Quiz Button */}
        <Link
          to={`/quiz?category=${category}&difficulty=${difficulty}`}
          className="block w-full"
        >
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-md transition duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50">
            🚀 Start Quiz
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [difficulty, setDifficulty] = useState("easy");
  const [category, setCategory] = useState(9);

  useEffect(() => {
    axios.get("https://opentdb.com/api_category.php")
      .then((response) => {
        setCategories(response.data.trivia_categories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  return (
    <div className="max-w-lg mx-auto p-6 bg-white  shadow-lg rounded-lg text-center">
      <h2 className="text-3xl font-bold text-blue-600 mb-4">Select Your Quiz 🎯</h2>
        <div className="mb-5 relative">
          <label className="block text-gray-700 font-semibold mb-2">📚 Select Category</label>
          <select 
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 bg-gray-50 shadow-sm focus:ring-2 focus:ring-blue-500 transition"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

       
        <div className="mb-6 relative">
          <label className="block text-gray-700 font-semibold mb-2">⚡ Select Difficulty</label>
          <select 
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 bg-gray-50 shadow-sm focus:ring-2 focus:ring-blue-500 transition"
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="easy">Easy </option>
            <option value="medium">Medium </option>
            <option value="hard">Hard </option>
          </select>
        </div>

    
        <Link to={`/quiz?category=${category}&difficulty=${difficulty}`}>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300 transform hover:scale-105 hover:shadow-xl">
            🚀 Start Quiz
          </button>
        </Link>
      </div>
  
  );
};

export default Home;

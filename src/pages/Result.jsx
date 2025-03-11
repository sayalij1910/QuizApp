import { useLocation, useNavigate } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total } = location.state || { score: 0, total: 0 };

  
  const getPerformanceMessage = () => {
    const percentage = (score / total) * 100;
    if (percentage === 100) return "🏆 Perfect Score! You're a quiz master!";
    if (percentage >= 80) return "🎉 Great job! Almost perfect!";
    if (percentage >= 50) return "👍 Good effort! Keep practicing!";
    return "Better luck next time! Try again!";
  };

  return (
    <div className="max-w-lg bg-white p-8 rounded-xl shadow-lg text-center bg-green-100">
      <h2 className="text-3xl font-bold text-green-600 ">Quiz Completed! 🎉</h2>
      <p className="text-lg mt-3 text-gray-700">{getPerformanceMessage()}</p>

      <div className="mt-6 text-2xl font-bold text-gray-900">
        Your Score: <span className="text-green-500">{score}</span> / {total}
      </div>

      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg"
      >
        Start Again 🔄
      </button>
    </div>
  );
};

export default Result;

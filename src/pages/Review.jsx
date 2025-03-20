import { useLocation, useNavigate } from "react-router-dom";

const Review = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userAnswers = [] } = location.state || { userAnswers: [] };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      {/* Review Container */}
      <div className="max-w-2xl w-full p-8 bg-gray-800 shadow-lg rounded-lg text-white border border-blue-500/50 shadow-blue-500/30">
        <h2 className="text-3xl font-bold text-blue-400 mb-6 text-center animate-pulse">
          Review Your Answers 🔍
        </h2>

        <div className="space-y-6">
          {userAnswers.map((q, index) => (
            <div
              key={index}
              className="p-5 border border-gray-700 rounded-lg bg-gray-900 shadow-md shadow-gray-700/20"
            >
              <h3
                className="text-lg font-bold text-blue-300"
                dangerouslySetInnerHTML={{ __html: q.question }}
              />

              {/* Correct Answer */}
              <p className="text-green-400 mt-2 font-semibold">
                ✅ Correct Answer:{" "}
                <span dangerouslySetInnerHTML={{ __html: q.correct }} />
              </p>

              {/* User Answer with dynamic color */}
              <p
                className={`font-semibold mt-1 ${
                  q.selected === q.correct
                    ? "text-green-400 border border-green-500 px-3 py-1 rounded-md shadow-md shadow-green-500/30"
                    : "text-red-400 border border-red-500 px-3 py-1 rounded-md shadow-md shadow-red-500/30"
                }`}
              >
                📝 Your Answer:{" "}
                <span dangerouslySetInnerHTML={{ __html: q.selected || "No Answer" }} />
              </p>
            </div>
          ))}
        </div>

        {/* Back to Home Button */}
        <button
          onClick={() => navigate("/")}
          className="mt-6 w-full bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
        >
          Back to Home 🔄
        </button>
      </div>
    </div>
  );
};

export default Review;

import { useLocation, useNavigate } from 'react-router-dom';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total, userAnswers = [], totalTime } = location.state || { score: 0, total: 0, userAnswers: [], totalTime: 0 };

  // Convert totalTime from milliseconds to seconds
  const totalTimeInSeconds = (totalTime / 1000).toFixed(2);

  // Filter correct and incorrect answers
  const correctAnswers = userAnswers.filter(answer => answer.selected === answer.correct);
  const incorrectAnswers = userAnswers.filter(answer => answer.selected !== answer.correct);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-lg p-8 bg-gray-800 shadow-lg rounded-lg text-center text-white border border-blue-500/50 shadow-blue-500/30">
        <h2 className="text-3xl font-bold text-blue-400 mb-4 animate-pulse">Quiz Completed! 🎉</h2>
        <p className="text-lg text-gray-300 font-semibold mt-3">
          You scored <span className="text-yellow-400 font-bold">{score}</span> out of <span className="text-blue-300">{total}</span>!
        </p>
        <p className="text-lg text-gray-300 font-semibold mt-3">
          Total Time Taken: <span className="text-yellow-400 font-bold">{totalTimeInSeconds} seconds</span>
        </p>
        <div className="mt-6 flex justify-center space-x-6">
          <p className="text-green-400 font-bold text-lg border border-green-500 px-4 py-2 rounded-md shadow-md shadow-green-500/20">
            ✅ Correct: {correctAnswers.length}
          </p>
          <p className="text-red-400 font-bold text-lg border border-red-500 px-4 py-2 rounded-md shadow-md shadow-red-500/20">
            ❌ Incorrect: {incorrectAnswers.length}
          </p>
        </div>
        <button
          onClick={() => navigate('/review', { state: { userAnswers } })}
          className="mt-6 w-full bg-yellow-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition-all duration-300 shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50"
        >
          Review Answers 🔍
        </button>
        <button
          onClick={() => navigate('/')}
          className="mt-4 w-full bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
        >
          Start Again 🔄
        </button>
      </div>
    </div>
  );
};

export default Result;

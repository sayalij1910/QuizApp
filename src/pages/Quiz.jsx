import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category") || "9";
  const difficulty = queryParams.get("difficulty") || "easy";

  const [quizStartTime] = useState(Date.now()); // Store quiz start time
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [userAnswers, setUserAnswers] = useState([]);

  // Fetch questions from API
  useEffect(() => {
    axios
      .get(
        `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
      )
      .then((response) => {
        const formattedQuestions = response.data.results.map((q, index) => ({
          id: index,
          question: q.question,
          options: [...q.incorrect_answers, q.correct_answer].sort(
            () => Math.random() - 0.5
          ),
          correct: q.correct_answer,
        }));
        setQuestions(formattedQuestions);
      })
      .catch((error) => console.error("Error fetching quiz:", error));
  }, [category, difficulty]);

  // Timer effect for each question
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else {
      handleNext();
    }
  }, [timeLeft]);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      {
        question: questions[currentIndex].question,
        selected: answer,
        correct: questions[currentIndex].correct,
      },
    ]);
  };

  const handleNext = () => {
    if (selectedAnswer === null) {
      alert("Please select an answer before proceeding.");
      return;
    }

    if (currentIndex === questions.length - 1) {
      const totalTime = Math.floor((Date.now() - quizStartTime) / 1000); // Calculate total time in seconds
      navigate("/result", {
        state: { userAnswers, totalTime },
      });
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null);
      setTimeLeft(30);
    }
  };

  if (questions.length === 0)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0F172A] to-[#1E293B] overflow-hidden">
      {/* Quiz Container */}
      <div className="relative w-full max-w-2xl bg-[#161B22] p-8 min-h-[350px] rounded-xl shadow-2xl border border-blue-500 animate-glow">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">
            Question {currentIndex + 1} / {questions.length}
          </h2>
          <div
            className={`font-bold text-lg ${
              timeLeft <= 5 ? "text-red-500 animate-pulse" : "text-green-400"
            }`}
          >
            ⏳ {timeLeft}s
          </div>
        </div>

        {/* Question */}
        <h2
          className="text-2xl font-bold text-blue-400 mb-6 p-4 rounded-md border border-blue-500"
          dangerouslySetInnerHTML={{ __html: questions[currentIndex].question }}
        />

        {/* Options */}
        <div className="grid gap-4">
          {questions[currentIndex].options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(option)}
              className={`px-5 py-3 border-2 rounded-lg transition-all duration-300 font-semibold text-lg w-full
                ${
                  selectedAnswer === option
                    ? "bg-blue-500 text-black border-blue-500 shadow-glow-blue"
                    : "bg-transparent text-white border-blue-500 hover:bg-blue-500 hover:text-black shadow-glow-blue"
                }`}
              dangerouslySetInnerHTML={{ __html: option }}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg text-lg font-semibold hover:bg-blue-600 transition-all duration-300 shadow-glow-blue w-full"
        >
          {currentIndex === questions.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default Quiz;

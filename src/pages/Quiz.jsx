import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { difficulty, category } = location.state || { difficulty: "easy", category: "9" };

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [questionAnswered, setQuestionAnswered] = useState(false);

  useEffect(() => {
    axios.get(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`)
      .then(response => {
        const formattedQuestions = response.data.results.map((q, index) => ({
          id: index,
          question: q.question,
          options: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
          correct: q.correct_answer
        }));
        setQuestions(formattedQuestions);
      })
      .catch(error => console.error("Error fetching quiz:", error));
  }, [difficulty, category]);

  useEffect(() => {
    if (!questionAnswered && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setQuestionAnswered(true);
    }
  }, [timeLeft, questionAnswered]);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setQuestionAnswered(true);
    if (answer === questions[currentIndex].correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex === questions.length - 1) {
      navigate("/result", { state: { score, total: questions.length } });
    } else {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setTimeLeft(30);
      setQuestionAnswered(false);
    }
  };

  if (questions.length === 0) return <div className="text-xl font-bold text-center animate-spin">Loading Quiz...</div>;

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg text-center text-black">
     
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Question {currentIndex + 1} / {questions.length}</h2>
        <div className={`font-bold ${timeLeft <= 5 ? "text-red-500" : "text-gray-700"}`}>⏳ {timeLeft}s</div>
      </div>

  
      <h2 className="text-xl font-bold text-blue-600 mb-4" dangerouslySetInnerHTML={{ __html: questions[currentIndex].question }} />

     
      <div className="grid gap-3">
        {questions[currentIndex].options.map((option, i) => (
          <button 
            key={i}
            onClick={() => handleAnswer(option)}
            disabled={questionAnswered}
            className={`px-4 py-3 border rounded-lg transition-all duration-300 font-semibold ${
              questionAnswered
                ? option === questions[currentIndex].correct
                  ? "bg-green-500 text-white"  
                  : option === selectedAnswer
                  ? "bg-red-500 text-white"    
                  : "bg-gray-300 text-black"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            dangerouslySetInnerHTML={{ __html: option }}
          />
        ))}
      </div>


     
        <button 
          onClick={handleNext} 
          className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg text-lg font-semibold hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          {currentIndex === questions.length - 1 ? "Finish" : "Next"}
        </button>
      
    </div>
  );
};

export default Quiz;

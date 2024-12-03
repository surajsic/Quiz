import { decode } from "html-entities";
import React, { useState } from "react";

const Quiz = ({ questions, onFinishQuiz }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [userAnswers, setUserAnswers] = useState([]);

    const currentQuestion = questions[currentQuestionIndex];

    const handleAnswerSelection = (answer) => {
        setSelectedAnswer(answer);
    };

    const handleNextQuestion = () => {
        if (selectedAnswer) {
            setUserAnswers([...userAnswers, { question: currentQuestion, answer: selectedAnswer }]);
            setSelectedAnswer(null);
            if (currentQuestionIndex === questions.length - 1) {
                let score = userAnswers.filter((item) => item.answer === item.question.correct_answer).length;
                onFinishQuiz(score);
            } else {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            }
        }
    };


    // Clean text function to remove special characters
    decode('&lt; &gt; &quot; &apos; &amp; &#169; &#8710;');



    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">{decode(currentQuestion?.question)}</h2>
            <div className="mb-4">
                {currentQuestion?.incorrect_answers.concat(currentQuestion.correct_answer).map((answer, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswerSelection(answer)}
                        className={`w-full p-2 border border-gray-300 rounded-md mb-2 ${selectedAnswer === answer ? "bg-blue-500 text-white" : "bg-white"
                            }`}
                    >
                        {decode(answer)}
                    </button>
                ))}
            </div>
            <button
                onClick={handleNextQuestion}
                className="w-full p-2 bg-blue-500 text-white rounded-md"
            >
                {currentQuestionIndex === questions.length - 1 ? "Finish Quiz" : "Next Question"}
            </button>
        </div>
    );
};

export default Quiz;

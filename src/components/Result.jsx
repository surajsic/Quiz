import React from "react";

const Result = ({ score, totalQuestions }) => {
    
    const handleReset = () => {
        // Reload the page to reset everything
        window.location.reload();
      };

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4">Quiz Finished!</h2>
      <p className="text-xl">Your score: {score} / {totalQuestions}</p>
    
      <button
        onClick={handleReset}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Restart Quiz
      </button>

    </div>

  );
};

export default Result;

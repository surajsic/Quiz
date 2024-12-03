import React, { useState, useEffect } from "react";
import axios from "axios";
import CategoryDropdown from "./components/CategoryDropdown";
import Quiz from "./components/Quiz";
import Result from "./components/Result";


const App = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);

  // Fetch categories
  useEffect(() => {
    axios.get("https://opentdb.com/api_category.php")
      .then((response) => {
        setCategories(response.data.trivia_categories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  // Fetch quiz data based on selected category
  const fetchQuizData = (categoryId) => {
    axios.get(`https://opentdb.com/api.php?amount=10&category=${categoryId}&type=multiple`)
      .then((response) => {
        setQuizData(response.data.results);
        setQuizFinished(false);
        setScore(0);
      })
      .catch((error) => {
        console.error("Error fetching quiz data:", error);
      });
  };


  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    fetchQuizData(categoryId);
  };

  const handleQuizFinish = (finalScore) => {
    setQuizFinished(true);
    setScore(finalScore);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-6 text-emerald-700">Quiz App</h1>
      <CategoryDropdown categories={categories} onSelectCategory={handleCategorySelect} />
      {quizFinished ? (
        <Result score={score} totalQuestions={quizData?.length} setCategories={setCategories} categories={categories}/>
      ) : (
        quizData && (
          <Quiz
            questions={quizData}
            onFinishQuiz={handleQuizFinish}
          />
        )
      )}
    </div>
  );
};

export default App;

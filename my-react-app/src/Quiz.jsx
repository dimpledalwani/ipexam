// src/Quiz.js
import React, { useState, useEffect } from 'react';
import './Quiz.css';
import axios from 'axios';

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  // Fetch quiz questions from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/quiz-questions')
      .then((response) => {
        setQuestions(response.data);
        setAnswers(Array(response.data.length).fill(null)); // Initialize answers array
      })
      .catch((error) => console.error('Error fetching questions:', error));
  }, []);

  const handleAnswerChange = (questionIndex, answerIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let newScore = 0;
    answers.forEach((answerIndex, questionIndex) => {
      if (answerIndex !== null && questions[questionIndex].answerOptions[answerIndex].isCorrect) {
        newScore += 1;
      }
    });
    setScore(newScore);
    setShowScore(true);
  };

  return (
    <div className="quiz">
      {showScore ? (
        <div className="score-section">
          You scored {score} out of {questions.length}
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {questions.map((question, questionIndex) => (
            <div key={questionIndex} className="question-section">
              <div className="question-text">
                {questionIndex + 1}. {question.questionText}
              </div>
              <div className="answer-section">
                {question.answerOptions.map((answerOption, answerIndex) => (
                  <label key={answerIndex} className="answer-option">
                    <input
                      type="radio"
                      name={`question${questionIndex}`}
                      value={answerIndex}
                      checked={answers[questionIndex] === answerIndex}
                      onChange={() => handleAnswerChange(questionIndex, answerIndex)}
                    />
                    {answerOption.answerText}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button type="submit" className="submit-button">Submit</button>
        </form>
      )}
    </div>
  );
}

export default Quiz;

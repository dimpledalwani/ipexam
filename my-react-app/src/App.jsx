// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Quiz from './Quiz';
import './App.css';

function Home() {
  return (
    <div className="home">
      <h1>Welcome to the Quick Quiz Challenge</h1>
      <Link to="/quiz">
        <button>Start Quiz</button>
      </Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

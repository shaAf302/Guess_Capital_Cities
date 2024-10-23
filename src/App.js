import React, { useState } from "react";
import "./App.css";
import MCQs from "./components/MCQs";
import WF from "./img.jpg";

function App() {
  const [quizStarted, setQuizStarted] = useState(false); 

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  return (
    <div className="App">
      {!quizStarted ? (
        <div className="welcome-section flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center">
            Welcome! Lets guess the capital cities
          </h1>

       
          <img
            src={WF}
            alt="World Flags"
            className="w-full md:w-96 lg:w-1/4 h-auto mb-6 object-contain"
          />

         
          <button
            onClick={handleStartQuiz}
            className="p-3 w-full md:w-64 lg:w-80 rounded-lg text-lg bg-blue-500 hover:bg-blue-700 text-white font-bold transition-all duration-300 ease-in-out"
          >
            Start Quiz
          </button>
        </div>
      ) : (
        <MCQs />
      )}
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import { resultInitialState } from "../Constant";
import { Link } from "react-router-dom";

const Quiz = ({ questions, isTimerRunning, setIsTimerRunning }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { question, incorrect_answers, correct_answer } =
    questions[currentQuestion];
  const choices = [correct_answer, ...incorrect_answers];
  const [answerId, setAnswerId] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState(resultInitialState);
  const [showResult, setShowResult] = useState(false);
  const initialTime = 1800; // 30 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(initialTime);
  console.log(result);
  const onAnswerClick = (answer, index) => {
    setAnswerId(index);
    if (answer == correct_answer) setAnswer(true);
    else setAnswer(false);
  };

  const onClickNext = () => {
    setAnswerId(null);
    setResult((prev) =>
      answer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswer: prev.correctAnswer + 1,
          }
        : { ...prev, wrongAnswer: prev.wrongAnswer + 1 }
    );

    if (currentQuestion !== questions.length - 1)
      setCurrentQuestion((prev) => prev + 1);
    else {
      setCurrentQuestion(0);
      setShowResult(true);
    }
  };

  const onTryAgain = () => {
    setResult(resultInitialState);
    setShowResult(false);
    setCurrentQuestion(0);
    setTimeLeft(initialTime);
    setIsTimerRunning(true);
  };

  useEffect(() => {
    let timer;

    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTimeLeft) =>
          prevTimeLeft > 0 ? prevTimeLeft - 1 : 0
        );
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerRunning(false);
      setShowResult(true);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isTimerRunning, timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className='quiz-container'>
      {!showResult ? (
        <>
          <div>
            <div>
              {" "}
              <span className='active-question-no'>{currentQuestion + 1}</span>
              <span className='total-question'>/{questions.length}</span>
            </div>
            <div>
              {" "}
              <span className='timer'>Time Left: {formatTime(timeLeft)}</span>
            </div>
          </div>
          <h2>{question}</h2>
          <ul>
            {choices.map((answer, index) => (
              <li
                onClick={() => onAnswerClick(answer, index)}
                key={index}
                className={answerId === index ? "selected-answer" : null}
              >
                {answer}
              </li>
            ))}
          </ul>

          <div className='footer'>
            <button onClick={onClickNext} disabled={answerId === null}>
              {currentQuestion == questions.length - 1 ? "Finished" : "Next"}
            </button>
          </div>
        </>
      ) : (
        <div className='result'>
          <h3>Result</h3>
          <p>
            Total questions:<span> {questions.length}</span>
          </p>
          <p>
            Total Score:<span> {result.score}</span>
          </p>
          <p>
            Correct answer:<span> {result.correctAnswer}</span>
          </p>
          <p>
            Wrong answer:<span> {result.wrongAnswer}</span>
          </p>
          <div className='result-button'>
            <button onClick={() => onTryAgain()}>Try Again</button>
            <Link to={"/"}>
              <button>Go to Home</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;

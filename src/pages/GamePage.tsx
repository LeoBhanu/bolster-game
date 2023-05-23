import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./GamePage.css";
import ProgressBar from "../components/ProgressBar";
import Question from "../components/Question";
import ResultPage from "../components/ResultPage";
import Swal from "sweetalert2";

type Question = {
  id: number;
  image1: string;
  image2: string;
};

const images: Question[] = [
  {
    id: 1,
    image1: require("../assets/images/data/1-correct.png"),
    image2: require("../assets/images/data/1-fake.png"),
  },
  {
    id: 2,
    image1: require("../assets/images/data/2-correct.png"),
    image2: require("../assets/images/data/2-fake.png"),
  },
  {
    id: 3,
    image1: require("../assets/images/data/3-correct.png"),
    image2: require("../assets/images/data/3-fake.png"),
  },
  {
    id: 4,
    image1: require("../assets/images/data/4-correct.png"),
    image2: require("../assets/images/data/4-fake.png"),
  },
  {
    id: 5,
    image1: require("../assets/images/data/5-correct.png"),
    image2: require("../assets/images/data/5-fake.png"),
  },
  {
    id: 6,
    image1: require("../assets/images/data/6-correct.png"),
    image2: require("../assets/images/data/6-fake.png"),
  },
  {
    id: 7,
    image1: require("../assets/images/data/7-correct.png"),
    image2: require("../assets/images/data/7-fake.png"),
  },
  {
    id: 8,
    image1: require("../assets/images/data/8-correct.png"),
    image2: require("../assets/images/data/8-fake.png"),
  },
  {
    id: 9,
    image1: require("../assets/images/data/9-correct.png"),
    image2: require("../assets/images/data/9-fake.png"),
  },
  {
    id: 10,
    image1: require("../assets/images/data/10-correct.png"),
    image2: require("../assets/images/data/10-fake.png"),
  },
];

function shuffleArray(array: Question[]) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

function GamePage() {
  const quesNo = Number(localStorage.getItem("currentQ")) || 0;
  const storedResult = Number(localStorage.getItem("result")) || 0;
  const [currentQuestion, setCurrentQuestion] = useState(quesNo);
  const [selectedOption, setSelectedOption] = useState("");
  const [result, setResult] = useState(storedResult);
  const QuestionList = shuffleArray(images);

  const [list, setList] = useState(QuestionList);

  useEffect(() => {
    if (quesNo === 0) setList(shuffleArray(images));
  }, []);

  const setScore = () => {
    if (selectedOption === "image2") {
      Swal.fire({
        icon: "success",
        title: "Correct Answer",
        showConfirmButton: false,
        timer: 1000,
      });
      setResult((result) => result + 1);
      localStorage.setItem("result", (result + 1).toString());
    } else {
      Swal.fire({
        icon: "warning",
        title: "Oops! its wrong",
        showConfirmButton: false,
        timer: 1000,
      });
    }
    setCurrentQuestion(currentQuestion + 1);
    localStorage.setItem("currentQ", (currentQuestion + 1).toString());
  };

  return (
    <div className="game-container">
      <div className="game-box">
        {currentQuestion >= 10 ? (
          <ResultPage
            result={result}
            setCurrentQuestion={setCurrentQuestion}
            setResult={setResult}
          />
        ) : (
          <Question
            question={list[currentQuestion]}
            total={images.length}
            setScore={setScore}
            setSelectedOption={setSelectedOption}
            setCurrentQuestion={setCurrentQuestion}
            currentQuestion={currentQuestion}
          />
        )}
      </div>
    </div>
  );
}

export default GamePage;

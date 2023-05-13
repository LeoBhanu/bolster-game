import { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import "./Question.css";

type QuestionType = {
  id: number;
  image1: string;
  image2: string;
};

type QuestionProps = {
  question: QuestionType;
  total: number;
  setScore: () => void;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
};

const Question = ({
  question,
  total,
  setScore,
  setSelectedOption,
  setCurrentQuestion,
}: QuestionProps) => {
  const [count, setCount] = useState(1);
  const [randomValue, setRandomValue] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  });

  useEffect(() => {
    if (count >= 16) {
      setCount(1);
      setCurrentQuestion(question.id);
      setSelectedOption("");
      setRandomValue(false);
    }
  }, [count]);

  const myArray = ["image1", "image2"];

  useEffect(() => {
    const randomElement = getRandomElement(myArray);
    if (randomElement === "image2") {
      setRandomValue(true);
    }
  }, [question]);

  const getRandomElement = (array: string[]) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };

  const handleClick = (option: string) => {
    setScore();
    setSelectedOption(option);
    setCount(1);
    setCurrentQuestion(question.id);

  };

  return (
    <div>
      <ProgressBar timer={15000} count={count} />
      {count}
      <h3>{`${question?.id} : Please choose one among the following images.`}</h3>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <div className="image">
          <img
            style={{ width: "95%", height: "100%" }}
            src={randomValue ? question?.image1 : question?.image2}
            alt="imageData1"
            onClick={() => {
              randomValue ? handleClick("image1") : handleClick("image2");
            }}
          />
        </div>

        <div className="image">
          <img
            style={{ width: "95%", height: "100%" }}
            src={randomValue ? question?.image2 : question?.image1}
            alt="imageData2"
            onClick={() => {
              randomValue ? handleClick("image2") : handleClick("image1");
            }}
          />
        </div>
      </div>
      <div
        onClick={() => {
          setCount(1);
          setCurrentQuestion(question.id);
          setSelectedOption("");
        }}
      >
        <div className="button-box next-button">
          {question?.id !== 10 ? "Next Question" : "Get Results"}
        </div>
      </div>
    </div>
  );
};

export default Question;

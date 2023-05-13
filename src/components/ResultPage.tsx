import { useEffect, useState } from "react";

import "./ResultPage.css";
import SignUp from "./SignUp";

interface Score {
  name?: string;
  score?: number;
}

type Results = {
  result: number;
  setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
  setResult: React.Dispatch<React.SetStateAction<number>>;
};

const ResultPage = ({ result, setCurrentQuestion, setResult }: Results) => {
  // @ts-ignore: local Storage type ignored
  const scores = JSON.parse(localStorage.getItem("topScores"));
  let sortedScores: Score[] = [];
  if (scores.length) {
    // @ts-ignore: local Storage type ignored
    sortedScores = scores.sort((a: Score, b: Score) => b?.score - a?.score);
  }
  const [sign, setSign] = useState(false);
  const [scoreList, setScoreList] = useState<Score[]>(sortedScores);

  useEffect(() => {
    // @ts-ignore: local Storage type ignored
    let topScores = JSON.parse(localStorage.getItem("topScores"));
    let sortedScores: Score[] = [];
    if (scores.length) {
      // @ts-ignore: local Storage type ignored
      sortedScores = scores.sort((a: Score, b: Score) => b?.score - a?.score);
    }

    if (topScores) {
      setScoreList(sortedScores);
    }
  }, [sign]);
  return (
    <div>
      <div className="color-text">
        <h1>Results</h1>
      </div>
      {sign ? (
        <SignUp result={result} setSign={setSign} />
      ) : (
        <>
          <div
            onClick={() => {
              setCurrentQuestion(0);
              setResult(0);
            }}
          >
            <h2>{`Your Score is ${result}`}</h2>
            <div className="button-box color-text">Replay</div>
          </div>
          <div>
            <div
              onClick={() => {
                setSign(true);
              }}
              className="button-box color-text"
            >
              Sign your score
            </div>
          </div>
          <div>
            <h3>Top 10 High Scores</h3>
            <div className="top-score color-text">
              <span className="span1">Rank</span>{" "}
              <span className="span2">Name</span>{" "}
              <span className="span1">Score</span>
            </div>
            {scoreList?.map((item, index) => (
              <div className="top-score">
                <span className="span1">{index + 1}</span>{" "}
                <span className="span2">{item.name}</span>{" "}
                <span className="color-text span1">{item.score}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ResultPage;

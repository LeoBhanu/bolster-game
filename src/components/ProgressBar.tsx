import React, { useEffect, useState } from "react";
import "./ProgressBar.css";

type ProgressBarType = {
  timer: number;
  count: number;
};

const ProgressBar = ({ timer, count }: ProgressBarType) => {
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => prevProgress + 1);
    }, timer / 100);

    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (count === 1) setProgress(1);
  }, [count]);

  return (
    <div className="progress-bar">
      <div
        className="progress-bar-inner"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;

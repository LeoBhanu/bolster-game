import React, { useState } from "react";
import "./Home.css";
import ProgressBar from "../components/ProgressBar";
import GamePage from "./GamePage";

function Home() {
  const [start, setStart] = useState(false);
  const aboutTheGame = `Spot-the-fake is a web-based game that requires the player to
    identify the counterfeit website between two images of a website.
    The two website images are for the same brand, where one is an image
    of the actual website and the other is a fake site.`;
  const instructions = [
    `The player is
  given a total of 15 seconds for each pair of images to identify the
  counterfeit website.`,
    `There are a total of 10 questions and the
  player will be shown the total score at the end of the game.`,
    ` 10
  pairs of image files (for a total of 20 image files) will be
  provided, where each pair of image files will consist of the correct
  website image and a fake website image.`,
    `Player can reset the game in the middle and can able start new game`,
  ];
  return (
    <div className="container">
      <div className="box">
        <h1>
          <span className="color-text">SPOT the FAKE</span>
        </h1>
        <h3>
          <span>
            (A game by{" "}
            <a
              className="color-text"
              href="https://bolster.ai/"
              target="_blank"
              title="https://bolster.ai/"
              rel="noreferrer"
            >
              bolster.ai
            </a>
            )
          </span>
        </h3>
      </div>
      {start ? (
        <GamePage />
      ) : (
        <>
          <div onClick={() => setStart(true)}>
            <div className="box start-button">START THE GAME</div>
          </div>
          <div className="box">
            <h1>
              <span className="color-text">About the game</span>
            </h1>
            <h3>
              <span className="small-font">{aboutTheGame}</span>
            </h3>
          </div>

          <div className="box">
            <h1>
              <span className="color-text">Instructions</span>
            </h1>
            <h3>
              <ol>
                {instructions.map((ins) => {
                  return <li className="small-font">{ins}</li>;
                })}
              </ol>
            </h3>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;

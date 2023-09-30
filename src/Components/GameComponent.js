import React, { useState, useEffect } from 'react';
import styles from './GameComponent.module.css';
import {useNavigate} from "react-router-dom"
import { MdTimer,MdTimerOff} from 'react-icons/md';
import {FaFaceSmileBeam} from 'react-icons/fa6';
import { TbMoodSadFilled } from 'react-icons/tb';
import { IoGameController } from 'react-icons/io5';

const GameComponent = ({ gameLevel }) => {
  const navigate = useNavigate();

  const [display, setDisplay] = useState(false); //state for button should display or not
  const [boxColor, setBoxColor] = useState('red'); // state to track and update boc color
  const [score, setScore] = useState(0); //state to track and update score of user green clicks
  const [gameOutcome, setGameOutcome] = useState(null); // Use this state to track the game outcome
  const [timer, setTimer] = useState(40); // state for timer
  
//setting time condition based on choosen game level
  const count = gameLevel === 'easy' ? 10 : gameLevel === 'medium' ? 15 : 25;

 //to implement changing box color for each 1.5 seconds
  useEffect(() => {
    if (display) {
      const interval = setInterval(() => {
        setBoxColor((prevColor) => (prevColor === 'red' ? 'green' : 'red'));
      }, 1500);

      return () => {
        clearInterval(interval);
      };
    }
  }, [display]);

  //to implement the timer which starts from 40sec and update gameoutcome based on conditions

  useEffect(() => {
    if (display && timer > 0 && score < count) {
      const timerInterval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            clearInterval(timerInterval);
            if (score === count) {
              setGameOutcome('win');
            } else {
              setGameOutcome('timeup');
            }
            return 0; // Ensure timer remains at 0 when it reaches 0
          }
        });
      }, 1000);

      return () => {
        clearInterval(timerInterval);
      };
    }
  }, [display, timer, score, count,gameOutcome]);


  //to handle click on box which updates color
  const handleClick = () => {
    if (boxColor === 'green' && !gameOutcome) {
      setScore((prevScore) => prevScore + 1);
      if (score + 1 === count) {
        setGameOutcome('win');
     }
    } else if (boxColor === 'red' && !gameOutcome) {
      setGameOutcome('lost');
    }
  };

// to update gameoutcome when timer triggers 0
  useEffect(() => {
    if (timer === 0 && !gameOutcome) {
      const timeoutId = setTimeout(() => {
        setGameOutcome('timeup');
      }, 1000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [timer, gameOutcome]);

  return (
    <div>
      <h1 className={styles.heading1}>
        <IoGameController /> Squid Game
      </h1>
      {!display ? (
        <button className={styles.startbtn} onClick={() => setDisplay(true)}>
          Start Game
        </button>
      ) : (
        <div>
          {timer > 0 && !gameOutcome && (
            <div>
              <div className={styles.gameupdate}>
                <p className={styles.timer}>
                  <MdTimer /> {timer} seconds
                </p>
                <p className={styles.timer}>
                  Score : {score} / {count}
                </p>
              </div>
              <div
                style={{
                  width: '150px',
                  height: '150px',
                  marginTop: '20px',
                  backgroundColor: boxColor,
                  display: 'inline-block',
                  cursor: 'pointer',
                  borderRadius: '5px',
                }}
                onClick={handleClick}
              ></div>
            </div>
          )}
          {gameOutcome && (
            <div>
              {gameOutcome === 'timeup' && <h2 className={styles.outcomes}><MdTimerOff/> Time's up!</h2>}
              {gameOutcome === 'win' && <h2 className={styles.outcomes}><FaFaceSmileBeam/> You Won!</h2>}
              {gameOutcome === 'lost' && <h2 className={styles.outcomes}><TbMoodSadFilled/> You Lost!</h2>}
              <button className={styles.btn} onClick={()=>navigate("/")}>Restart</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default GameComponent;

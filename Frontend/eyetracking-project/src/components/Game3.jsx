import React, { useState, useEffect } from 'react';
import '../App.css';
import holeImage from '../images/hole.png';
import upImage from '../images/up.png';

const Game3 = () => {
    const [moles, setMoles] = useState(Array(3).fill(null).map(() => Array(3).fill(false)));
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(20);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        let timer;

        if (gameStarted) {
            timer = setInterval(() => {
                setTime(prevTime => {
                    if (prevTime === 0) {
                        clearInterval(timer);
                        setGameOver(true);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [gameStarted]);

    useEffect(() => {
        let moleGenerator;

        if (gameStarted && !gameOver) {
            moleGenerator = setInterval(() => {
                const randomRow = Math.floor(Math.random() * 3);
                const randomCol = Math.floor(Math.random() * 3);
                const newMoles = moles.map(row => [...row]);
                newMoles[randomRow][randomCol] = true;
                setMoles(newMoles);

                setTimeout(() => {
                    newMoles[randomRow][randomCol] = false;
                    setMoles(newMoles);
                }, 800);
            }, 1000);
        }

        return () => clearInterval(moleGenerator);
    }, [gameStarted, moles, gameOver]);

    const handleStartGame = () => {
        setGameStarted(true);
        setMoles(Array(3).fill(null).map(() => Array(3).fill(false)));
        setGameOver(false);
    };

    const handleMoleClick = (row, col) => {
        if (moles[row][col]) {
            const newMoles = [...moles];
            newMoles[row][col] = false;
            setMoles(newMoles);
            setScore(prevScore => prevScore + 1);           
        }
        const gridNumber = row * 3 + col + 1;
    console.log(`Clicked grid position: ${gridNumber}`);
    };

    const handleRestart = () => {
        setMoles(Array(3).fill(null).map(() => Array(3).fill(false)));
        setScore(0);
        setTime(20);
        setGameStarted(false);
        setGameOver(false);
    };

    return (
      <div className="mole-container">
        <br/>
        <h1 style={{ fontFamily: "DOSPilgi" }}>두더지 잡기 게임</h1>
          {time !== 0 && ( 
              <div>
                  <p>Time Left: {time}</p>
                  <p>Score: {score}</p>
              </div>
          )}
          {time === 0 && (
              <div>
                  <h2>Game Over!</h2>
                  <p>두더지 {score} 마리를 잡았습니다 !</p>
                  <button className="mole-button" onClick={handleRestart}>Restart</button>
              </div>
          )}
          {!gameStarted && (
              <button className="mole-button" onClick={handleStartGame}>START</button>
          )}
          <div className="mole-game">
              <div className="mole-grid">
                  {moles.map((row, rowIndex) => (
                      <div key={rowIndex} className="mole-row">
                          {row.map((mole, colIndex) => (
                              <img
                                  key={colIndex}
                                  src={mole ? upImage : holeImage}
                                  alt="mole"
                                  className={`mole-hole mole-hole-${rowIndex}-${colIndex}`}
                                  onClick={() => handleMoleClick(rowIndex, colIndex)}
                              />
                          ))}
                      </div>
                  ))}
              </div>
              <br/>
          </div>
      </div>
  );
  
};

export default Game3;

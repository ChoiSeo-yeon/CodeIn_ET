import React, { useState, useEffect } from 'react';
import '../App.css';

function Test() {
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [circles, setCircles] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameOver && gameStarted) {
        setTime((prevTime) => prevTime + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [gameOver, gameStarted]);

  useEffect(() => {
    if (circles.length === 0) {
      generateCircle();
    }
  }, [circles]);

  const handleClick = (id) => {
    if (!gameOver) {
      if (!gameStarted) {
        setGameStarted(true);
      }
      const updatedCircles = circles.map((circle) =>
        circle.id === id ? { ...circle, isVisible: false } : circle
      );
      setCircles(updatedCircles);
      setScore((prevScore) => prevScore + 1);
  
      if (score + 1 === 10) {
        setGameOver(true);
      } else {
        generateCircle(); 
      }
    }
  };
  
  const generateCircle = () => {
    const newCircle = {
      id: circles.length,
      top: Math.random() * (window.innerHeight - 100),
      left: Math.random() * (window.innerWidth - 100),
      isVisible: true,
    };
    setCircles(() => [newCircle]); 
  };
  
  const formatTime = (time) => {
    const seconds = time % 60;
    return `${seconds}초 ${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <div className="app">
      {!gameStarted ? (
        <h1 style={{ fontFamily: 'Sam3KRFont'}}>동그라미를 클릭하는 순간 시작됩니다.</h1>
      ) : (
        <>
          {!gameOver ? (
            <div className="score">score : {score}</div>
          ) : (
            <div className="score">Game over ! <br/><br/> 걸린 시간: {formatTime(time)}</div>
          )}
        </>
      )}
      {circles.map((circle) => (
        circle.isVisible && (
          <div
            key={circle.id}
            className="circle"
            style={{ top: circle.top, left: circle.left }}
            onClick={() => handleClick(circle.id)}
          ></div>
        )
      ))}
    </div>
  );
}

export default Test;

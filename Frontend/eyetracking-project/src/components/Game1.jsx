import React, { useState, useEffect } from 'react';

const Game1 = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(null);

  useEffect(() => {
    if (isGameStarted) {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;

      setTargetPosition({ x, y });
      setStartTime(new Date());
    }
  }, [isGameStarted]);

  const handleTargetClick = () => {
    if (isGameStarted) {
      const endTime = new Date();
      const elapsedMilliseconds = endTime - startTime;
      const elapsedSeconds = elapsedMilliseconds / 1000;

      setElapsedTime(elapsedSeconds.toFixed(2));
      setIsGameStarted(false);
    }
  };

  return (
    <div style={{ position: 'relative', height: '100vh', cursor: 'pointer' }} onClick={handleTargetClick}>
      {isGameStarted && (
        <div
          style={{
            position: 'absolute',
            top: targetPosition.y,
            left: targetPosition.x,
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: 'red',
          }}
        />
      )}

      {!isGameStarted && (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <p>Click the red circle as fast as you can!</p>
          <button onClick={() => setIsGameStarted(true)}>Start Game</button>
        </div>
      )}

      {elapsedTime && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p>Your reaction time: {elapsedTime} seconds!</p>
          <button onClick={() => window.location.reload()}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default Game1;
import React, { useState, useEffect } from 'react';

const Game2 = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [targetPosition, setTargetPosition] = useState({ x: -100, y: -100 }); 
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(null);

  useEffect(() => {
    if (isGameStarted) {
      const x = Math.random() * (window.innerWidth - 50); 
      const y = Math.random() * (window.innerHeight - 50); 

      setTargetPosition({ x, y });
      setStartTime(new Date());
      console.log(`Target position: x = ${x}, y = ${y}`); // 위치 정보 콘솔에 표시

      // 셀 번호 계산
      const column = Math.floor(x / (window.innerWidth / 5)) + 1;
      const row = Math.floor(y / (window.innerHeight / 4)) + 1;
      const cellNumber = (row - 1) * 5 + column;
      console.log(`Cell number: ${cellNumber}`);
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

  const handleStartGame = () => {
    setElapsedTime(null); 
    setIsGameStarted(true); 
  };

  return (
    <div style={{ position: 'relative', height: '100vh', cursor: 'crosshair' }} onClick={handleTargetClick}>
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
            animation: 'glow2 0.5s infinite alternate'
          }}
        />
      )}

      {!isGameStarted && !elapsedTime && (
        <div style={{ textAlign: 'center', marginTop: '50px', cursor: 'crosshair', fontFamily: 'DOSIyagiBoldface', fontSize: '35px' }}>
          <p>Click the <span style={{ color: 'red' }}>red circle</span> as fast as you can!<br/></p>
          <button onClick={handleStartGame} className='game1-button'>Start !</button>
        </div>
      )}

      {elapsedTime && (
        <div style={{ textAlign: 'center', marginTop: '20px', fontFamily: 'DOSIyagiBoldface', fontSize: '35px' }}>
          <p><span style={{ color: 'red' }}>{elapsedTime} seconds </span> 가 걸렸습니다 !</p>
          <button onClick={() => window.location.reload()} className='game1-button'>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default Game2;

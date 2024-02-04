import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import "./App.css";
import Menu from './Menu';
import WebcamComponent from "./WebcamComponent"; 
import Test from './components/Test'; 
import Game1 from './components/Game1'; 
import Game2 from './components/Game2'; 


const StartButton = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    console.log('Start button clicked!');
    navigate('/webcam');
  };

  return (
    <button className="button" onClick={handleStartClick}>Start</button>
  );
};


const AppContent = () => {

  return (
    <div>
      <h1 style={{ fontSize: '80px', fontFamily: 'DOSIyagiBoldface' }}>Eye - tracking</h1>
      <h2 style={{ fontSize: '40px', fontFamily: 'Sam3KRFont' }}>동체 시력 테스트</h2>
      <StartButton />
      <div className="cursor"></div>
    </div>
  );
};

const App = () => {
  return (
    <div className="App" style={{ textAlign: 'center', marginTop: '180px' }}>
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path = "/webcam" element = {<WebcamComponent/>} /> 
          <Route path="/menu" element={<Menu />} />
          <Route path="/" element={<AppContent />} />
          <Route path="/test" element={<Test />} />
          <Route path="/game1" element={<Game1 />} />
          <Route path="/game2" element={<Game2 />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

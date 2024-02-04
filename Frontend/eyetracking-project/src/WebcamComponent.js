import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import WebcamReact from 'react-webcam'; 
import "./App.css"; 

const WebcamComponent = () => { 
    const webcamRef = useRef(null);

    return (
      <div className="webcam-container"> 
        <WebcamReact 
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="webcam-flip-horizontal"
        />
        
        <Link to="/menu" className="capture-button">Let's go</Link>
      </div>
    );
};

export default WebcamComponent;
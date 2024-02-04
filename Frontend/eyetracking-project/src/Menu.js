import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <div style={{ fontSize: '40px' }}>
            <h1 style={{ fontFamily: 'DOSIyagiBoldface', marginBottom: '-3px' }}>Choose one !</h1>
            <ul style={{ listStyleType: 'none', textAlign: 'left', display: 'inline-block' }}>
                <li className="triangle-item" style={{ fontFamily: 'DOSIyagiBoldface', marginBottom: '25px' }}>
                    <Link to="/test" style={{ textDecoration: "none", cursor: 'crosshair' }} className="link">  Eye-tracking test</Link>
                </li>
                <li className="triangle-item" style={{ fontFamily: 'DOSIyagiBoldface', marginBottom: '25px' }}>
                    <Link to="/game1" style={{ textDecoration: "none", cursor: 'crosshair' }} className="link">  Game 1</Link>
                </li>
                <li className="triangle-item" style={{ fontFamily: 'DOSIyagiBoldface', marginBottom: '25px' }}>
                    <Link to="/game2" style={{ textDecoration: "none", cursor: 'crosshair' }} className="link">  Game 2</Link>
                </li>
            </ul>
            <div className="cursor"></div>
        </div>
    );
};

export default Menu;

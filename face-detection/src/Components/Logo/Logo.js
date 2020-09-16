import React from 'react';
import Tilt from 'react-tilt';
import logo from './logo.png';
import './Logo.css';

const Logo = () => {
    return (
        <div className="ma4 mt0">
            <Tilt className="Tilt br2 shadow-3" options={{ max : 45 }} style={{ height: 128, width: 128 }} >
                <div className="Tilt-inner">
                    <img className="pa4" alt="logo" src={logo} width="64px" height="64px"/>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;
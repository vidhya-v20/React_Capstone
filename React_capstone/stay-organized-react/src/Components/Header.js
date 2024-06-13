// src/components/Header.js
import React, { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Header = () => {
    const [greeting, setGreeting] = useState('');
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const updateGreeting = () => {
            const hour = new Date().getHours();
            if (hour >= 5 && hour < 12) {
                setGreeting('Good morning !!!');
            } else if (hour >= 12 && hour < 18) {
                setGreeting('Good afternoon !!!');
            } else {
                setGreeting('Good evening !!!');
            }
        };

        const updateTime = () => {
            const currentTime = new Date();
            const hours = currentTime.getHours().toString().padStart(2, '0');
            const minutes = currentTime.getMinutes().toString().padStart(2, '0');
            const seconds = currentTime.getSeconds().toString().padStart(2, '0');
            setCurrentTime(`${hours}:${minutes}:${seconds}`);
        };

        updateGreeting();
        updateTime();
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="text-center">
            <h1 className="mb-4" id="greetingMessage" style={{ color: 'rgb(255, 64, 0)', fontFamily: 'cursive' }}>
                {greeting}
            </h1>
            <div id="currentTimeContainer" className="text-end">
               
                <div id="currentTime">{currentTime}</div>
            </div>
        </div>
    );
};

export default Header;

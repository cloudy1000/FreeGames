import React from 'react';
import './Content.css';
import Year from "./Year";
import Genre from "./Genre";
import GamesUrls from "./GamesUrls";
import Platform from "./Platform";

// Fifth Component is the TopBar Component
// Content contains four Components
// All five Components are integrated in App
const Content = () => {
    return (
        <div className='content-container'>
            <div className='year'>
                <Year />
            </div>
            <div className='genre'>
                <Genre />
            </div>
            <div className='platform'>
                <Platform />
            </div>
            <div className='url'>
                <GamesUrls />
            </div>
        </div>
    )
}

export default Content;
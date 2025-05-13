import React, {Fragment} from 'react';
import './GamifiedCenter.css';
import gameicon from '../assets/img/gameicon.png';
import gameTitle from '../assets/img/gameTitle.png';
import scrollIcon from '../assets/img/home-to-bottom.png';
import minigameicon from '../assets/img/minigameicon.png';
import storylineicon from '../assets/img/storylineicon.png';

const GamifiedCenter = () => {
  return (
    <Fragment>
      <div className="top-bar">
        <div className="top-bar-text">
            <img src={gameTitle} alt="gameTitle" className='gameTitle' />
            <div className='gameTitleText'>Challenge your instincts against scams!</div>
        </div>
        <img src={gameicon} alt="gameicon" className="gameicon" />
      </div>
      <img src={scrollIcon} alt="scrollIcon" className="scrollIcon" />
      <div className='choose-bar'>
        <div className='choose-bar-item'>
            <img src={minigameicon} alt="minigameicon" className='choose-bar-item-img' />
            <div className='choose-bar-item-title'>Scam Snap</div>
            <div className='choose-bar-item-text'>Try to pot scams in seconds.</div>
            <div className='choose-bar-item-button'>Click to start!</div>
        </div>
        <div className='choose-bar-item'>
            <img src={storylineicon} alt="minigameicon" className='choose-bar-item-img' style={{left: '-212px'}} />
            <div className='choose-bar-item-title'>Scam Survival</div>
            <div className='choose-bar-item-text'>Live through a real scamscenario.</div>
            <div className='choose-bar-item-button'>Click to start!</div>
        </div>
      </div>
    </Fragment>
  );
};

export default GamifiedCenter;


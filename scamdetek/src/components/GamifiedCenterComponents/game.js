import React, { Fragment, useState } from 'react';
import '../GamifiedCenter.css';
import game_1_pic_left from '../../assets/img/game_1_pic_left.png';
import game_1_pic_right from '../../assets/img/game_1_pic_right.png';
import scrollIcon from '../../assets/img/home-to-bottom.png';
import level1_optionA from '../../assets/img/level1_optionA.png';
import level1_optionB from '../../assets/img/level1_optionB.png';
import level1_optionC from '../../assets/img/level1_optionC.png';
import level1_resultA from '../../assets/img/level1_resultA.png';
import level1_resultB from '../../assets/img/level1_resultB.png';
import level1_resultC from '../../assets/img/level1_resultC.png';
import level1_scoreA from '../../assets/img/level1_scoreA.png';
import level1_scoreB from '../../assets/img/level1_scoreB.png';
import level1_scoreC from '../../assets/img/level1_scoreC.png';

const Game = (props) => {
    const [showResult, setShowResult] = useState(false);
    const [fadeClass, setFadeClass] = useState('');
    const [option, setOption] = useState('');

    const handleOptionClick = (option) => {
        setOption(option);
        if (option === '') {
            setShowResult(false);
        } else {
            setFadeClass('fade-out');
            setTimeout(() => {
                setShowResult(true);
                setFadeClass('fade-in');
            }, 400); // 动画时长与CSS一致
        }
    };

    return (
        <Fragment>
            <div className='game-title'>Phishing Scam</div>
            <div className='game-content'>
                <div className='game-step-bar'>
                    <div className='game-step-bar-inner' style={{ width: '20%' }}></div>
                </div>
                <div className='game-desc'>
                    <div className='game-desc-title-1 desc-font'>Your name is Aishah Rahman, a 29-year-old marketing</div>
                    <div className='game-desc-wrapper'>
                        <div className='game-desc-content-item'>
                            <div className='desc-font' style={{ marginBottom: '20px' }}>executive in Kuala Lumpur.</div>
                            <img className='game-desc-content-item-img-left' src={game_1_pic_left} alt='game_1_pic_left' />
                        </div>
                        <div className='game-desc-content-item' style={{ marginTop: '30px' }}>
                            <div className='desc-font'>
                                As you sip your morning coffee at 8 am, your phone
                            </div>
                            <div className='desc-font' style={{ marginBottom: '10px' }}>
                                buzzes with an SMS:
                            </div>
                            <div className='white-font'>"MyBank: Your account is frozen.</div>
                            <div className='white-font' style={{ marginBottom: '1px' }}>Reactivate now ➜ mybank-secure.com"</div>
                            <img className='game-desc-content-item-img-right' src={game_1_pic_right} alt='game_1_pic_right' />
                        </div>
                    </div>
                </div>
                <div className='question-title'>{option === '' ? 'What do you do?' : 'What happened next?'}</div>
                <div className='question-tip'>{option === '' ? 'Click on the options below' : ''}</div>
                <img src={scrollIcon} alt='scrollIcon' className='scrollIcon' style={{ margin: '0 auto 80px auto' }} />
                <div style={{ display: showResult ? 'none' : 'block' }} className={fadeClass}>
                    <div className='question-option-wrapper'>
                        <div className='question-option-item' onClick={() => handleOptionClick('A')}>
                            <img className='question-option-item-img' src={level1_optionA} alt='level1_optionA' />
                            Click the link immediately,
                            worried about your home-down-payment savings.
                        </div>
                        <div className='question-option-item' onClick={() => handleOptionClick('B')}>
                            <img className='question-option-item-img' src={level1_optionB} alt='level1_optionB' style={{ height: '390px', bottom: '-52px' }} />
                            Grab your debit card and call the number printed on it.
                        </div>
                        <div className='question-option-item' onClick={() => handleOptionClick('C')}>
                            <img className='question-option-item-img' src={level1_optionC} alt='level1_optionC' />
                            Ignore the message for now and discuss it with your fiancé later
                        </div>
                    </div>
                </div>
                <div className='question-option-result'>
                    <div className='question-option-result-box' style={{ display: showResult ? 'block' : 'none' }}>
                        <div style={{ display: option === 'A' ? 'block' : 'none' }}>
                            <img className='question-option-result-box-show-img' src={level1_resultA} alt='level1_resultA' />
                            <img className='question-option-result-box-score-img' src={level1_scoreA} alt='level1_scoreA' />
                        </div>
                        <div style={{ display: option === 'B' ? 'block' : 'none' }}>
                            <img className='question-option-result-box-show-img' src={level1_resultB} alt='level1_resultB' />
                            <img className='question-option-result-box-score-img' src={level1_scoreB} alt='level1_scoreB' />
                        </div>
                        <div style={{ display: option === 'C' ? 'block' : 'none' }}>
                            <img className='question-option-result-box-show-img' src={level1_resultC} alt='level1_resultC' />
                            <img className='question-option-result-box-score-img' src={level1_scoreC} alt='level1_scoreC' />
                        </div>
                        <div className='next-level-btn' onClick={() => handleOptionClick('')}>Next Level</div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Game;

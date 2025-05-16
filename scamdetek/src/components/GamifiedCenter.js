import React, {Fragment, useState} from 'react';
import Home from './GamifiedCenterComponents/home';
import Game from './GamifiedCenterComponents/game';
import Result from './GamifiedCenterComponents/result';

const GamifiedCenter = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [score, setScore] = useState(0);

  // 把这个方法传递给Home组件
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleScoreChange = (score) => {
    setScore(score);
  };

  return (
    <Fragment>
      {currentPage === 'home' && <Home onPageChange={handlePageChange} />}
      {currentPage === 'game' && <Game onScoreChange={handleScoreChange} score={score} onPageChange={handlePageChange} />}
      {currentPage === 'result' && <Result onPageChange={handlePageChange} score={score} />}
    </Fragment>
  );
};

export default GamifiedCenter;


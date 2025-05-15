import React, {Fragment, useState} from 'react';
import Home from './GamifiedCenterComponents/home';
import Game from './GamifiedCenterComponents/game';

const GamifiedCenter = () => {
  const [currentPage, setCurrentPage] = useState('game');

  // 把这个方法传递给Home组件
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Fragment>
      {currentPage === 'home' && <Home onPageChange={handlePageChange} />}
      {currentPage === 'game' && <Game />}
    </Fragment>
  );
};

export default GamifiedCenter;


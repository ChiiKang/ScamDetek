import React from 'react';
import Slider from 'react-slick';

const CountryRankCarousel = ({ countryData }) => {
  const settings = {
    dots: true, // Show dots for navigation
    infinite: true, // Infinite loop
    speed: 500, // Transition speed
    slidesToShow: 3, // Show 3 items at once
    slidesToScroll: 1, // Scroll 1 item at a time
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="rankings-container">
      <h3>Country Ranks based on Attack</h3>
      <Slider {...settings}>
        {countryData.map((item, index) => (
          <div className="ranking-item" key={index}>
            <div className="rank-number">{index + 1}</div>
            <img src={item.flagUrl} alt={item.country} className="country-flag" />
            <div className="country-name">{item.country}</div>
            <div className="attack-count">{item.attacks} attacks</div>
            <div className="attack-bar" style={{ width: `${(item.attacks / 15000) * 100}%` }}></div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CountryRankCarousel;
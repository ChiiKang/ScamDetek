import React from 'react';
import ReactSlider from 'react-slider';

const TimeSlider = ({ min, max, value, onChange }) => {
  return (
    <ReactSlider
      min={min}
      max={max}
      value={value}
      onChange={onChange}
      ariaLabel="Time slider"
      thumbClassName="example-thumb"
      trackClassName="example-track"
    />
  );
};

export default TimeSlider;
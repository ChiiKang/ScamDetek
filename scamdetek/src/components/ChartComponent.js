import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ChartComponent = ({ data }) => {
  // Check if data is valid (not null or empty)
  if (!data || data.length === 0) {
    return <div>No data available to display chart.</div>; // Return a fallback message
  }

  // Group data by year and count the number of attacks per year
  const groupByYear = (data) => {
    const attacksByYear = {};

    data.forEach((item) => {
      const year = new Date(item.date).getFullYear();
      if (attacksByYear[year]) {
        attacksByYear[year] += 1;
      } else {
        attacksByYear[year] = 1;
      }
    });

    // Convert attacksByYear object to an array of objects suitable for recharts
    return Object.keys(attacksByYear).map((year) => ({
      year,
      attacks: attacksByYear[year],
    }));
  };

  const attacksOverTime = groupByYear(data);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={attacksOverTime}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="attacks" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ChartComponent;
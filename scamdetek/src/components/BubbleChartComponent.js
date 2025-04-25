import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BubbleChartComponent = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>No data available to display bubble chart.</div>; // Return a fallback message
  }

  console.log('Bubble Chart Data:', data); // Log to check the data format

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="location" 
          type="category" 
          name="Location" 
          allowDataOverflow
        />
        <YAxis 
          type="number" 
          domain={[0, 'auto']} // Automatically scale the Y-axis based on the damage value
          name="Damage Estimate (USD)" 
        />
        <Tooltip />
        
        {/* Add Legend */}
        <Legend />

        {/* Loop through the data and render each bubble */}
        {data.map((entry, index) => {
          // Make sure damage_estimate_usd is a number
          const size = entry.damage_estimate_usd ? entry.damage_estimate_usd / 100000 : 1; // Default size is 1 if not available

          return (
            <Scatter
              key={index}
              name={entry.location} // Set the name for the legend
              data={[{ x: entry.location, y: entry.damage_estimate_usd }]} // x = location, y = damage estimate
              fill="#8884d8" // Default color for the bubbles
              shape="circle" // Make the shape of the scatter points as bubbles
              radius={size} // Size based on damage estimate
            />
          );
        })}
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default BubbleChartComponent;
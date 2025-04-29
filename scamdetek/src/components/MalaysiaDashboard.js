import React, { useState, useEffect } from 'react';
import Flag from 'react-world-flags';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, BarChart, Bar, Tooltip } from 'recharts';
import { PieChart, Pie, Cell, Tooltip as PieTooltip, Legend as PieLegend } from 'recharts';
import axios from 'axios';
import { FaMale, FaFemale } from 'react-icons/fa'; // Import React Icons

const states = [
  'Overall', 'Johor', 'Kedah', 'Kelantan', 'Melaka', 'Negeri Sembilan',
  'Pahang', 'Perak', 'Perlis', 'Pulau Pinang', 'Sabah',
  'Sarawak', 'Selangor', 'Terengganu', 'W.P. Kuala Lumpur'
];

const stateFlagCodes = {
  Johor: 'jhr', Kedah: 'kdh', Kelantan: 'ktn', Melaka: 'mlk',
  'Negeri Sembilan': 'nsn', Pahang: 'phg', Perak: 'prk', Perlis: 'pls',
  'Pulau Pinang': 'png', Sabah: 'sbh', Sarawak: 'swk', Selangor: 'sgr',
  Terengganu: 'trg', 'W.P. Kuala Lumpur': 'kul'
};

const MalaysiaDashboard = () => {
  const [data, setData] = useState({
    totalCases: 20000,
    financialLoss: 12.8,
    commonScams: [
      { name: 'Phishing', value: 35 },
      { name: 'SMS Scam', value: 25 },
      { name: 'Call Scam', value: 20 },
      { name: 'E-commerce', value: 15 },
      { name: 'Others', value: 5 }
    ]
  });

  return (
    <div className="malaysia-dashboard">
      <div className="dashboard-header">
        <div className="title-flag">
          <h2>Malaysia Cyber Attack Statistics</h2>
          <Flag code="MY" height="30" />
        </div>
      </div>
      
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Reported Cases</h3>
          <p>{data.totalCases.toLocaleString()}+</p>
        </div>
        <div className="stat-card">
          <h3>Financial Loss (2024)</h3>
          <p>RM {data.financialLoss} Billion</p>
        </div>
        <div className="stat-card">
          <h3>Most Common Scam</h3>
          <p>Phishing</p>
        </div>
      </div>

      <div className="chart-container">
        <BarChart width={800} height={400} data={data.commonScams}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#4FD1C5" />
        </BarChart>
      </div>
    </div>
  );
};

export default MalaysiaDashboard;
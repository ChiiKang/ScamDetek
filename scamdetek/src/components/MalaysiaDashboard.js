import React, { useState, useEffect } from 'react';
import 'malaysia-state-flag-icon-css/css/flag-icon.min.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell, Tooltip as PieTooltip, Legend as PieLegend } from 'recharts';
import axios from 'axios';

// List of Malaysian states (must match CSV values)
const states = [
  'Johor', 'Kedah', 'Kelantan', 'Melaka', 'Negeri Sembilan',
  'Pahang', 'Perak', 'Perlis', 'Pulau Pinang', 'Sabah',
  'Sarawak', 'Selangor', 'Terengganu', 'W.P. Kuala Lumpur'
];

// Two‑/three‑letter codes from the package
const stateFlagCodes = {
  Johor: 'jhr',
  Kedah: 'kdh',
  Kelantan: 'ktn',
  Melaka: 'mlk',
  'Negeri Sembilan': 'nsn',
  Pahang: 'phg',
  Perak: 'prk',
  Perlis: 'pls',
  'Pulau Pinang': 'png',
  Sabah: 'sbh',
  Sarawak: 'swk',
  Selangor: 'sgr',
  Terengganu: 'trg',
  'W.P. Kuala Lumpur': 'kul',
};

const MalaysiaDashboard = () => {
  const [data, setData] = useState([]);               // raw CSV rows
  const [selectedState, setSelectedState] = useState(states[0]);
  const [filteredData, setFilteredData] = useState([]);
  const [totalLossRM, setTotalLossRM] = useState(0);
  const [victimsCount, setVictimsCount] = useState(0);
  const [casesCount, setCasesCount] = useState(0);
  const [genderData, setGenderData] = useState([]);
  const [newsData, setNewsData] = useState([]); // State to hold news data

  // 1) Fetch & parse CSV on mount
  useEffect(() => {
    fetch('/data/malaysia_online_crime_dataset.csv')
      .then(res => res.text())
      .then(text => {
        const [headerLine, ...rows] = text.trim().split('\n');
        const headers = headerLine.split(',');
        const parsed = rows.map(line => {
          const vals = line.split(',');
          const obj = {};
          headers.forEach((h, i) => {
            obj[h.trim()] = vals[i]?.trim() || '';
          });
          return obj;
        });
        setData(parsed);
      })
      .catch(err => console.error('Failed to load CSV:', err));
  }, []);

  // 2) Whenever raw data or selectedState changes, filter & compute sums
  useEffect(() => {
    const f = data.filter(
      row =>
        row.state &&
        row.state.trim().toLowerCase() === selectedState.toLowerCase()
    );
    setFilteredData(f);

    setTotalLossRM(
      f.reduce((sum, row) => sum + (parseFloat(row.financial_losses_rm) || 0), 0)
    );
    setVictimsCount(
      f.reduce((sum, row) => sum + (parseInt(row.number_of_victims, 10) || 0), 0)
    );
    setCasesCount(
      f.reduce((sum, row) => sum + (parseInt(row.number_of_cases, 10) || 0), 0)
    );

    // Prepare gender data for pie chart
    const maleVictims = f.filter(row => row.gender === 'male')
      .reduce((sum, row) => sum + (parseInt(row.number_of_victims, 10) || 0), 0);

    const femaleVictims = f.filter(row => row.gender === 'female')
      .reduce((sum, row) => sum + (parseInt(row.number_of_victims, 10) || 0), 0);

    setGenderData([ { name: 'Male', value: maleVictims }, { name: 'Female', value: femaleVictims } ]);
  }, [data, selectedState]);

  // Fetch news based on the selected state
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`https://newsapi.org/v2/everything?q=${selectedState} scam&apiKey=ad569dde93b545a5ac61ea945b252868`);
        setNewsData(response.data.articles); // Set news data based on the state
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, [selectedState]);

  // get code for the selected state
  const flagCode = stateFlagCodes[selectedState];

  // Prepare chart data by summing up the cases for each year
  const chartData = ['2021', '2022', '2023'].map(year => {
    const totalCasesForYear = filteredData
      .filter(row => row.year === year)  // Filter by the specific year
      .reduce((sum, row) => sum + (parseInt(row.number_of_cases, 10) || 0), 0);  // Sum the cases
    return { year, cases: totalCasesForYear };
  });

  return (
    <div className="malaysia-content">
      {/* State selector + flag */}
      <div className="view-switcher" style={{ alignItems: 'center' }}>
        {flagCode && (
          <span
            className={`malaysia-state-flag-icon malaysia-state-flag-icon-${flagCode}`}
            style={{
              display: 'inline-block',
              width: 48,
              height: 32,
              marginRight: 12,
            }}
          />
        )}
        <label htmlFor="state-select" style={{ color: 'white', marginRight: 8, fontSize: '24px', fontWeight: 'bold' }}>
          Select State:
        </label>
        <select
          id="state-select"
          value={selectedState}
          onChange={e => setSelectedState(e.target.value)}
          style={{
            padding: '6px 8px',
            borderRadius: '4px',
            border: '1px solid #00AAFF',
            background: '#1a1a1a',
            color: 'white',
            fontSize: '18px'
          }}
        >
          {states.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* "Here are the stats for" message with flag, centered */}
      <div style={{ marginTop: '1rem', color: '#00BFFF', fontSize: '30px', fontWeight: 'bold', textAlign: 'center' }}>
        <p>
          Here are the stats for{' '}
          <span style={{ fontSize: '35px' }}>
            {selectedState}
            {flagCode && <span className={`malaysia-state-flag-icon malaysia-state-flag-icon-${flagCode}`} style={{ width: 48, height: 32, marginLeft: 10 }} />}
          </span>
        </p>
      </div>

      {/* Summary cards */}
      <div className="stats-container">
        <div className="stat-card orange">
          <h3>Total Financial Loss (RM)</h3>
          <p>RM {totalLossRM.toLocaleString()}</p>
          <span className="icon">💰</span>
        </div>
        <div className="stat-card red">
          <h3>Number of Victims</h3>
          <p>{victimsCount.toLocaleString()}</p>
          <span className="icon">👥</span>
        </div>
        <div className="stat-card green">
          <h3>Number of Cases</h3>
          <p>{casesCount.toLocaleString()}</p>
          <span className="icon">📊</span>
        </div>
      </div>

      {/* Line Chart displaying trend of cases over years */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Left chart box */}
        <div style={{ width: '55%', padding: '20px', background: '#222', borderRadius: '20px' }}>
          <h3 style={{ color: '#00BFFF', textAlign: 'center', marginBottom: '20px' }}>Number of Cases across Years</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="cases" stroke="#00BFFF" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Right chart box (for the pie chart) */}
        <div style={{ width: '40%', padding: '20px', background: '#222', borderRadius: '10px' }}>
          <h3 style={{ color: '#00BFFF', textAlign: 'center', marginBottom: '20px' }}>Gender Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={genderData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                fill="#00BFFF"
                label
              >
                {genderData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? "#00BFFF" : "#FF6347"} />
                ))}
              </Pie>
              <PieTooltip />
              <PieLegend
                iconSize={20}
                width={150}
                height={50}
                layout="horizontal"
                verticalAlign="top"
                align="left"
                wrapperStyle={{
                  padding: '5px 0',
                  color: '#00BFFF'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* News Section (displaying the latest news with images) */}
      <div style={{ marginTop: '30px', color: '#00BFFF', fontSize: '24px', textAlign: 'center' }}>
        <h3>Latest Scam News in {selectedState}</h3>
        <div style={{ marginTop: '20px', maxWidth: '800px', margin: '0 auto' }}>
          {newsData.length > 0 ? (
            newsData.map((article, index) => (
              <div key={index} style={{ display: 'flex', flexDirection: 'row', padding: '20px', background: '#333', marginBottom: '10px', borderRadius: '8px' }}>
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    style={{ width: '200px', height: 'auto', borderRadius: '8px', marginRight: '15px' }}
                  />
                )}
                <div>
                  <h4 style={{ color: '#00BFFF', fontSize: '18px', margin: '0 0 10px 0' }}>{article.title}</h4>
                  <p style={{ fontSize: '14px' }}>{article.description}</p>
                  <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ color: '#00BFFF', fontSize: '14px', marginTop: '10px', display: 'inline-block' }}>
                    Read More
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p>No news available. Showing historical data.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MalaysiaDashboard;
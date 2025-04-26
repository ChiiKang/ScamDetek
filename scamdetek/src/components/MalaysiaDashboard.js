import React, { useState, useEffect, useMemo } from 'react';
import 'malaysia-state-flag-icon-css/css/flag-icon.min.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { PieChart, Pie, Cell, Tooltip as PieTooltip, Legend as PieLegend } from 'recharts';
import axios from 'axios';
import { FaMale, FaFemale } from 'react-icons/fa';

const states = [
  'Johor', 'Kedah', 'Kelantan', 'Melaka', 'Negeri Sembilan',
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
  const [data, setData] = useState([]);
  const [selectedState, setSelectedState] = useState(states[0]);
  const [filteredData, setFilteredData] = useState([]);
  const [totalLossRM, setTotalLossRM] = useState(0);
  const [victimsCount, setVictimsCount] = useState(0);
  const [casesCount, setCasesCount] = useState(0);
  const [genderData, setGenderData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [topAffectedYear, setTopAffectedYear] = useState(null); // To store the year with most victims
  const [mostCommonAgeGroup, setMostCommonAgeGroup] = useState(''); // To store most commonly affected age group
  const [caseTypeData, setCaseTypeData] = useState([]); // To hold case type data dynamically

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

  useEffect(() => {
    const f = data.filter(
      row => row.state && row.state.trim().toLowerCase() === selectedState.toLowerCase()
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

    const maleVictims = f.filter(row => row.gender === 'male')
      .reduce((sum, row) => sum + (parseInt(row.number_of_victims, 10) || 0), 0);
    const femaleVictims = f.filter(row => row.gender === 'female')
      .reduce((sum, row) => sum + (parseInt(row.number_of_victims, 10) || 0), 0);

    setGenderData([ 
      { name: 'Male', value: maleVictims },
      { name: 'Female', value: femaleVictims }
    ]);

    // Calculate the year with the highest number of victims
    const yearsData = f.reduce((acc, row) => {
      const year = row.year;
      const victims = parseInt(row.number_of_victims, 10) || 0;
      if (acc[year]) {
        acc[year] += victims;
      } else {
        acc[year] = victims;
      }
      return acc;
    }, {});

    const mostAffectedYear = Object.entries(yearsData).reduce((prev, curr) => curr[1] > prev[1] ? curr : prev, [null, 0]);
    setTopAffectedYear(mostAffectedYear[0]); // Get the year with the most victims

    // Calculate the most commonly affected age group
    const ageGroups = ['>61', '15-20', '21-30', '31-40', '41-50', '51-60'];
    let maxVictims = 0;
    let mostCommonGroup = '';
    
    ageGroups.forEach(ageGroup => {
      const ageGroupVictims = f.filter(row => row.age_group === ageGroup)
                               .reduce((sum, row) => sum + (parseInt(row.number_of_victims, 10) || 0), 0);
      if (ageGroupVictims > maxVictims) {
        maxVictims = ageGroupVictims;
        mostCommonGroup = ageGroup;
      }
    });

    setMostCommonAgeGroup(mostCommonGroup); // Set the most common age group

    // Calculate the number of cases per case type
    const caseTypes = ['e-Commerce', 'e-Finance', 'Love scam', 'Non-existent investments', 'Non-existent loans', 'Telecommunication crime'];
    const caseTypeData = caseTypes.map(type => {
      const casesForType = f.filter(row => row.online_crime === type)
                            .reduce((sum, row) => sum + (parseInt(row.number_of_cases, 10) || 0), 0);
      return { name: type, value: casesForType };
    });

    setCaseTypeData(caseTypeData); // Set the case type data dynamically
  }, [data, selectedState]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`https://newsapi.org/v2/everything?q=${selectedState} scam&apiKey=ad569dde93b545a5ac61ea945b252868`);
        setNewsData(response.data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };
    fetchNews();
  }, [selectedState]);

  const flagCode = stateFlagCodes[selectedState];

  const chartData = ['2021', '2022', '2023'].map(year => {
    const totalCasesForYear = filteredData
      .filter(row => row.year === year)
      .reduce((sum, row) => sum + (parseInt(row.number_of_cases, 10) || 0), 0);
    return { year, cases: totalCasesForYear };
  });

  return (
    <div className="malaysia-content">
      {/* Starting Stats and Charts */}
      <div className="view-switcher" style={{ alignItems: 'center' }}>
        <label htmlFor="state-select" style={{ color: 'white', marginRight: 8, fontSize: '24px', fontWeight: 'bold' }}>
          Select State:
        </label>
        <select
          id="state-select"
          value={selectedState}
          onChange={e => setSelectedState(e.target.value)}
          style={{ padding: '6px 8px', borderRadius: '4px', border: '1px solid #00AAFF', background: '#1a1a1a', color: 'white', fontSize: '18px' }}
        >
          {states.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Adjusted Position for State Stats Title and Flag */}
      {flagCode && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <h3 style={{ color: '#00BFFF', fontSize: '48px', fontWeight: 'bold' }}>Here are the Stats for {selectedState}</h3>
          <span className={`malaysia-state-flag-icon malaysia-state-flag-icon-${flagCode}`}
            style={{ display: 'inline-block', width: 48, height: 32, marginTop: '10px' }} />
        </div>
      )}

      {/* Stats Layout */}
      <div className="stats-container">
        <div className="stat-card orange"><h3>Total Financial Loss (RM)</h3><p>RM {totalLossRM.toLocaleString()}</p><span className="icon">💰</span></div>
        <div className="stat-card red"><h3>Number of Victims</h3><p>{victimsCount.toLocaleString()}</p><span className="icon">👥</span></div>
        <div className="stat-card green"><h3>Number of Cases</h3><p>{casesCount.toLocaleString()}</p><span className="icon">📊</span></div>
      </div>

      {/* Line Chart for Number of Cases across Years */}
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <div style={{ width: '70%', padding: '20px', background: '#222', borderRadius: '20px' }}>
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

        {/* Pie chart for Gender Distribution */}
        <div style={{ width: '28%', padding: '20px', background: '#222', borderRadius: '10px' }}>
          <h3 style={{ color: '#00BFFF', textAlign: 'center', marginBottom: '20px' }}>Gender Distribution of Victims</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={genderData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} fill="#00BFFF" label>
                {genderData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? "#00BFFF" : "#FF6347"} />
                ))}
              </Pie>
              <PieTooltip />
              <PieLegend iconSize={20} width={150} height={50} layout="horizontal" verticalAlign="top" align="left" wrapperStyle={{ padding: '5px 0', color: '#00BFFF' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Statistics Box */}
      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#222', borderRadius: '10px' }}>
        <h3 style={{ color: '#00BFFF', fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>Additional Statistics</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <div style={{ width: '45%', backgroundColor: '#333', padding: '20px', borderRadius: '10px' }}>
            <h3 style={{ color: '#00BFFF', fontSize: '24px', fontWeight: 'bold' }}>Most Affected Age Group in {selectedState}</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{mostCommonAgeGroup}</p>
          </div>
          <div style={{ width: '45%', backgroundColor: '#333', padding: '20px', borderRadius: '10px' }}>
            <h3 style={{ color: '#00BFFF', fontSize: '24px', fontWeight: 'bold' }}>Most Affected Year in {selectedState}</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{topAffectedYear}</p>
          </div>
        </div>

        {/* Donut Chart for Cases Distribution */}
        <div style={{ marginTop: '30px', backgroundColor: '#333', padding: '20px', borderRadius: '10px' }}>
          <h3 style={{ color: '#00BFFF', fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>Cases Distribution in {selectedState}</h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie data={caseTypeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} fill="#00BFFF" label>
                {caseTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={
                    index === 0 ? "#00FF00" : // e-Commerce
                    index === 1 ? "#14FFF7" : // e-Finance
                    index === 2 ? "#FF0DEF" : // Love scam
                    index === 3 ? "#FFF700" : // Non-existent investments
                    index === 4 ? "#BB00FF" : // Non-existent loans
                    "#FF0000" // Telecommunication crime
                  } />
                ))}
              </Pie>
              <PieTooltip />
              <PieLegend iconSize={20} width={150} height={50} layout="horizontal" verticalAlign="top" align="left" wrapperStyle={{ padding: '5px 0', color: '#00BFFF' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Latest Scam News */}
      <div style={{ marginTop: '30px', color: '#00BFFF', fontSize: '24px', textAlign: 'center' }}>
        <h3>Latest Scam News in {selectedState}</h3>
        <div style={{ marginTop: '20px', maxWidth: '800px', margin: '0 auto' }}>
          {newsData.length > 0 ? (
            newsData.map((article, index) => (
              <div key={index} style={{ display: 'flex', flexDirection: 'row', padding: '20px', background: '#333', marginBottom: '10px', borderRadius: '8px' }}>
                {article.urlToImage && <img src={article.urlToImage} alt={article.title} style={{ width: '200px', height: 'auto', borderRadius: '8px', marginRight: '15px' }} />}
                <div>
                  <h4 style={{ color: '#00BFFF', fontSize: '18px', margin: '0 0 10px 0' }}>{article.title}</h4>
                  <p style={{ fontSize: '14px' }}>{article.description}</p>
                  <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ color: '#00BFFF', fontSize: '14px', marginTop: '10px', display: 'inline-block' }}>Read More</a>
                </div>
              </div>
            ))
          ) : <p>No latest news available for {selectedState} .</p>}
        </div>
      </div>
    </div>
  );
};

export default MalaysiaDashboard;
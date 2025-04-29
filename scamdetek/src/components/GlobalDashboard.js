import React, { useState, useEffect } from 'react';
// Importing necessary components for the chart
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import MalaysiaDashboard from './MalaysiaDashboard';
import ChartComponent from './ChartComponent';
import TimeSlider from './TimeSlider';
import axios from 'axios';
import Flag from 'react-world-flags';
import './Dashboard.css';


const countryFlagCodes = {
  CHINA: 'CN',
  BRAZIL: 'BR',
  'United States': 'US',
  RUSSIA: 'RU',
  FRANCE: 'FR',
  'United Kingdom': 'GB',
  INDIA: 'IN',
  CANADA: 'CA',
  AUSTRALIA: 'AU',
  'SOUTH KOREA': 'KR',
  JAPAN: 'JP',
  GERMANY: 'DE',
};

const countries = [
  'Overall', 'CHINA', 'BRAZIL', 'United States', 'RUSSIA', 'FRANCE',
  'United Kingdom', 'INDIA', 'CANADA', 'AUSTRALIA', 'SOUTH KOREA',
  'JAPAN', 'GERMANY'
];

const attackTypeEmojis = {
  DDoS: '🌐',
  Phishing: '📨',
  Malware: '🦠',
  'SQL Injection': '💉',
  Ransomware: '💰',
  'Brute Force': '💥',
  'Cross-site Scripting (XSS)': '⚠️',
  'Privilege Escalation': '🔓',
  'Zero-Day Exploit': '⏳',
  'Brute Force Attack': '🧑‍💻',
  'Man-in-the-Middle': '🕵️',
};

const attackTypeDescriptions = {
  "DDoS": "Attackers overload websites or service so it stops working, which can disrupt access to online banking or government services.",
  "Phishing": "You receive fake emails, messages, or calls pretending to be from trusted sources, trying to trick you into revealing your personal or financial info.",
  "Malware": "Scam messages or fake websites infect your device with malicious software that steals your information or locks your files for ransom.",
  "SQL Injection": "Attackers exploit weak websites to steal or change sensitive information, which can lead to data leaks or financial fraud.",
  "Ransomware": "Your files or device are locked by scammers who demand money to unlock them, often spread through scam emails or links.",
  "Brute Force": "Scammers try every possible password to break into your accounts, which leads to stolen money or personal data.",
  "Cross-site Scripting (XSS)": "Fraudsters insert harmful code into websites, which tricks you into giving away sensitive information or let them steal your data.",
  "Privilege Escalation": "Scammers break into a system and find ways to get even more access by putting more people’s data and money at risk.",
  "Zero-Day Exploit": "Scammers use new, unknown software flaws to break into systems before anyone can fix them, making these attacks hard to stop.",
  "Brute Force Attack": "Scammers try every possible password to break into your accounts, which leads to stolen money or personal data.",
  "Man-in-the-Middle": "Scammers secretly listen to your online activity to steal your passwords or financial details."
};

const GlobalDashboard = () => {
  const [view, setView] = useState('global');
  const [data, setData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [countryData, setCountryData] = useState([]);
  const [mostCommonAttackType, setMostCommonAttackType] = useState('');
  const [countryRanks, setCountryRanks] = useState([]);
  const [attackTypeRanks, setAttackTypeRanks] = useState([]);
  const [hoveredAttackType, setHoveredAttackType] = useState('');
  const [timeValue, setTimeValue] = useState(2020);
  const [newsData, setNewsData] = useState([]);

  // Fetch the CSV data based on the selected view
  useEffect(() => {
    const path = view === 'global'
      ? '/data/cleaned_combined_cyber_data.csv'
      : '/data/malaysia_online_crime_dataset.csv'; 
    fetch(path)
      .then(res => res.text())
      .then(csv => {
        setData(parseCSV(csv));
      })
      .catch(console.error);
  }, [view]);


  // Fetch news data based on the selected country
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`https://newsapi.org/v2/everything?q=${selectedCountry} scammed&apiKey=`);
        //ad569dde93b545a5ac61ea945b252868
        setNewsData(response.data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };
    fetchNews();
  }, [selectedCountry]);

  // Filter and compute global stats
  useEffect(() => {
    const filtered = data.filter(item => item.location === selectedCountry);
    setCountryData(filtered);
    setMostCommonAttackType(getMostCommonAttackType(filtered));
    setCountryRanks(processCountryRanks(data));
    setAttackTypeRanks(processAttackRanks(data));
  }, [data, selectedCountry, view]);

  function parseCSV(text) {
    const [header, ...rows] = text.trim().split('\n');
    const keys = header.split(',');
    return rows.map(line => {
      const vals = line.split(',');
      return keys.reduce((obj, k, i) => {
        obj[k.trim()] = vals[i]?.trim() || '';
        return obj;
      }, {});
    });
  }

  function processCountryRanks(set) {
    const counts = {};
    set.forEach(i => counts[i.location] = (counts[i.location] || 0) + 1);
    return Object.entries(counts)
      .map(([country, cnt]) => ({ country, attacks: cnt }))
      .sort((a, b) => b.attacks - a.attacks);
  }

  function processAttackRanks(set) {
    const counts = {};
    set.forEach(i => {
      const t = i.attack_type?.trim();
      if (t) counts[t] = (counts[t] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([attackType, cnt]) => ({ attackType, occurrences: cnt }))
      .sort((a, b) => b.occurrences - a.occurrences);
  }

  function getMostCommonAttackType(set) {
    const counts = {};
    set.forEach(i => {
      const t = i.attack_type?.trim().toLowerCase();
      if (t) counts[t] = (counts[t] || 0) + 1;
    });
    const [type] = Object.entries(counts)
      .reduce((mx, cur) => cur[1] > mx[1] ? cur : mx, ['', 0]);
    return type || 'N/A';
  }

  function getCountrySummary(set) {
    if (!set.length) return { totalDamage: 0, totalAttacks: 0 };
    const totalDamage = set.reduce((sum, i) => sum + (parseFloat(i.damage_estimate_usd) || 0), 0);
    return { totalDamage, totalAttacks: set.length };
  }

  const flagCode = countryFlagCodes[selectedCountry];

// Data aggregation for creating Overall Bar chart
const severityData = data.filter(item => item.industry && item.attack_severity)
  .reduce((acc, { industry, attack_severity }) => {
    if (!acc[industry]) acc[industry] = { High: 0, Medium: 0, Low: 0, Critical: 0 };
    acc[industry][attack_severity] = (acc[industry][attack_severity] || 0) + 1;
    return acc;
  }, {});

const chartData = Object.entries(severityData).map(([industry, severities]) => ({
  industry,
  ...severities
}));


  return (
    <div className="dashboard-container">
      <h1>{view === 'global' ? 'Global Cyber Attack Dashboard' : 'Malaysia Cyber Attack Dashboard'}</h1>

      {/* View switch buttons */}
      <div className="view-switcher">
        <button onClick={() => setView('global')}>Global Stats</button>
        <button onClick={() => setView('malaysia')}>Malaysia Stats</button>
      </div>

      {view === 'global' && (
        <div className="view-switcher" style={{ alignItems: 'center' }}>
          <label htmlFor="country-select" style={{ color: 'white', marginRight: 8 }}>
            Select Country:
          </label>  
          <select
          
            value={selectedCountry}
            onChange={e => setSelectedCountry(e.target.value)}
            style={{
              padding: '6px 8px',
              borderRadius: 4,
              border: '1px solid #00AAFF',
              background: '#1a1a1a',
              color: 'white'
            }}
          >
            {countries.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {flagCode && (
            <span
              className={`flag-icon flag-icon-${flagCode}`}
              style={{
                width: 48,
                height: 32,
                marginLeft: 12
              }}
            />
          )}
        </div>
      )}

{view === 'global' && (
  <div style={{ marginBottom: '1rem', color: '#00BFFF', fontSize: '30px', fontWeight: 'bold' }}>
    <p style={{ display: 'flex', alignItems: 'center' }}>
      Here are the stats for{' '}
      <span style={{ fontSize: '35px', marginLeft: '10px' }}>{selectedCountry}</span>{' '}
      {flagCode && <Flag code={flagCode} style={{ width: 48, height: 32, marginLeft: '10px' }} />}
    </p>
  </div>
)}

      {/* Global Stats Content */}
      {view === 'global' && (
        <>
        
        {selectedCountry !== "Overall" && (
  <div className="stats-container">
    <div className="stat-card orange">
      <h3>Total Financial Loss (USD)</h3>
      <p>${getCountrySummary(countryData).totalDamage.toLocaleString()}</p>
      <span className="icon">💰</span>
    </div>
    <div className="stat-card red">
      <h3>Total Attacks</h3>
      <p>{getCountrySummary(countryData).totalAttacks}</p>
      <span className="icon">📊</span>
    </div>
    <div className="stat-card green">
      <h3>Most Common Attack Type</h3>
      <p>{mostCommonAttackType}</p>
      <span className="icon">🛡️</span>
    </div>
  </div>
)}


{selectedCountry !== "Overall" && (
  <div className="chart-container">
    <h3 className="chart-title">Scam Attacks Along the Years</h3>
    <ChartComponent 
      data={countryData} 
      title="Scam Attacks Along the Years" 
      xAxisLabel="Year" 
      yAxisLabel="Attack Count"
    />
  </div>
)}
<TimeSlider min={2015} max={2024} value={timeValue} onChange={setTimeValue} />


          {/* Updated titles for "Country Ranks Based on Attacks" and "Top 10 Attack Types" */}
          {selectedCountry === "Overall" && (
  <div className="tables-container">
    <div className="country-rank-table-container">
      <h3 style={{ color: '#00FFFF', fontSize: '30px', fontWeight: 'bold', textAlign: 'center', marginBottom: '10px' }}>
        Country Ranks Based on Attacks
      </h3>
      <table className="country-rank-table">
        <thead>
          <tr><th>Rank</th><th>Country</th><th>Attacks</th></tr>
        </thead>
        <tbody>
          {countryRanks.slice(0, 10).map((r, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>
                <Flag code={countryFlagCodes[r.country]} style={{ width: 30, height: 20, marginRight: 8 }} />
                {r.country}
              </td>
              <td>{r.attacks} attacks</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="attack-type-table-container">
      <h3 style={{ color: '#00FFFF', fontSize: '30px', fontWeight: 'bold', textAlign: 'center', marginBottom: '10px' }}>
        Top 10 Attack Types
      </h3>
      <table className="attack-type-table">
        <thead>
          <tr><th>Rank</th><th>Attack Type</th><th>Occurrences</th></tr>
        </thead>
        <tbody>
          {attackTypeRanks.slice(0, 10).map((r, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td onMouseEnter={() => setHoveredAttackType(r.attackType)} onMouseLeave={() => setHoveredAttackType('')}>
                {attackTypeEmojis[r.attackType] || '❓'} {r.attackType}
              </td>
              <td>{r.occurrences}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {hoveredAttackType && (
        <div className="attack-type-description">
          <strong>{hoveredAttackType}:</strong> {attackTypeDescriptions[hoveredAttackType]}
        </div>
              )}
            </div>
          </div>
)}

 {/* Render the chart below the tables */}
 {view === 'global' && selectedCountry === 'Overall' && (
  <div className="chart-container">
    {/* Chart Title */}
    <h3 style={{ color: '#00FFFF', textAlign: 'center', fontWeight: 'bold', fontSize: '36px', marginBottom: '20px' }}>
      Severity of Attacks in Industries
    </h3>
    
    {/* BarChart */}
    <BarChart width={2000} height={400} data={chartData}>
      <XAxis dataKey="industry" />
      <YAxis 
        label={{ 
          value: "Attack Count", 
          angle: -90, 
          position: 'insideLeft', 
          style: { color: '#00FFFF', fontWeight: 'bold' }
        }} 
      />
      <Tooltip />
      <Legend />
      <Bar dataKey="Critical" fill="#FF0000" />
      <Bar dataKey="High" fill="#8884d8" />
      <Bar dataKey="Medium" fill="#ffc658" />
      <Bar dataKey="Low" fill="#82ca9d" />
    </BarChart>
  </div>
)}

          {/* Latest Scam News Section */}
          <div style={{ marginTop: '30px', color: '#00BFFF', fontSize: '24px', textAlign: 'center' }}>
            <h3>Latest Scam News in {selectedCountry}</h3>
            <div style={{ marginTop: '20px', maxWidth: '800px', margin: '0 auto' }}>
              {newsData.length > 0 ? (
                newsData.slice(0, 10).map((article, index) => (  // Limit to 10 articles
                  <div key={index} style={{ display: 'flex', flexDirection: 'row', padding: '20px', background: '#333', marginBottom: '10px', borderRadius: '8px' }}>
                    {article.urlToImage && <img src={article.urlToImage} alt={article.title} style={{ width: '200px', height: 'auto', borderRadius: '8px', marginRight: '15px' }} />}
                    <div>
                      <h4 style={{ color: '#00BFFF', fontSize: '18px', margin: '0 0 10px 0' }}>{article.title}</h4>
                      <p style={{ fontSize: '14px' }}>{article.description}</p>
                      <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ color: '#00BFFF', fontSize: '14px', marginTop: '10px', display: 'inline-block' }}>Read More</a>
                    </div>
                  </div>
                )))
              : <p>No latest news available for {selectedCountry}.</p>}
            </div>
          </div>
        </>
      )}




      {view === 'malaysia' && <MalaysiaDashboard />}
    </div>
  );
};

export default GlobalDashboard;
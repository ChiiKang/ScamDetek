import React, { useState, useEffect } from 'react';
import 'malaysia-state-flag-icon-css/css/flag-icon.min.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, BarChart, Bar, Tooltip } from 'recharts';
import { PieChart, Pie, Cell, Tooltip as PieTooltip, Legend as PieLegend } from 'recharts';
import axios from 'axios';
import { FaMars, FaVenus } from 'react-icons/fa'; // Import React Icons



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
  const [ageGroupData, setAgeGroupData] = useState([]);
  const [crimeCasesByState, setCrimeCasesByState] = useState([]);

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
    if (selectedState === 'Overall') {
      // When "Overall" is selected, you will display overall statistics only
      setFilteredData(data); // Set overall data for calculations

      setTotalLossRM(
        data.reduce((sum, row) => sum + (parseFloat(row.financial_losses_rm) || 0), 0)
      );
      setVictimsCount(
        data.reduce((sum, row) => sum + (parseInt(row.number_of_victims, 10) || 0), 0)
      );
      setCasesCount(
        data.reduce((sum, row) => sum + (parseInt(row.number_of_cases, 10) || 0), 0)
      );
    } else {
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
    }
  }, [data, selectedState]);

  useEffect(() => {
    const apiKeys = [
      'ad569dde93b545a5ac61ea945b252868',
      '7379cf5cecba4baeb940f0a06e6afe30',
      '81038c2c2f20476bb1e25f55fb7ec0e8',
      'deea11c4f7d648b99756189b2f81aef2',
    ];

      const fetchNews = async () => {
      try {
        const response = await axios.get(`https://newsapi.org/v2/everything?q=${selectedState} scam&apiKey=${apiKeys[0]}`);
        setNewsData(response.data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
        // If rate limit is reached, use the next available key
        if (error.response && error.response.status === 429) {
          // Handle without popup, try the next key silently
          console.log('Rate limit reached for API key. Trying the next one...');
          fetchNewsWithNextKey(1);  // Try the next key
        } else {
          console.error('An error occurred while fetching news. Please try again later.');
        }
      }
    };
  
    const fetchNewsWithNextKey = (keyIndex) => {
      if (keyIndex < apiKeys.length) {
        axios.get(`https://newsapi.org/v2/everything?q=${selectedState} scam&apiKey=${apiKeys[keyIndex]}`)
          .then(response => setNewsData(response.data.articles))
          .catch(error => fetchNewsWithNextKey(keyIndex + 1)); // Try the next key if error occurs
      } else {
        console.error('All API keys are rate-limited. Please try again later.');
      }
    };
  
    fetchNews();
  }, [selectedState]);  // No need for apiKeys in dependencies anymore
  const flagCode = stateFlagCodes[selectedState];

  const chartData = ['2021', '2022', '2023'].map(year => {
    const totalCasesForYear = filteredData
      .filter(row => row.year === year)
      .reduce((sum, row) => sum + (parseInt(row.number_of_cases, 10) || 0), 0);
    return { year, cases: totalCasesForYear };
  });

  useEffect(() => {
    if (selectedState === 'Overall') {
      // Filter data based on state (if overall, no filter applied)
      const filteredData = data.filter(row => row.state); // No state filtering here for overall
  
      // Group the data by state and age group, sum the victims
      const groupedData = filteredData.reduce((acc, row) => {
        const state = row.state;
        const ageGroup = row.age_group;
        const victims = parseInt(row.number_of_victims, 10) || 0;
  
        if (!acc[state]) {
          acc[state] = {
            '15-20': 0,
            '21-30': 0,
            '31-40': 0,
            '41-50': 0,
            '51-60': 0,
            '>=61': 0
          };
        }
  
        // Accumulate the victims for each age group in that state
        if (ageGroup === '15-20') acc[state]['15-20'] += victims;
        if (ageGroup === '21-30') acc[state]['21-30'] += victims;
        if (ageGroup === '31-40') acc[state]['31-40'] += victims;
        if (ageGroup === '41-50') acc[state]['41-50'] += victims;
        if (ageGroup === '51-60') acc[state]['51-60'] += victims;
        if (ageGroup === '>61') acc[state]['>=61'] += victims;
  
        return acc;
      }, {});
  
      // Convert the grouped data into an array of objects suitable for the chart
      const chartData = Object.keys(groupedData).map(state => ({
        state: state,
        ...groupedData[state] // Spread the age group data
      }));
  
      setAgeGroupData(chartData); // Set the formatted data for the chart
    }
  }, [data, selectedState]);


  useEffect(() => {
    if (selectedState === 'Overall') {
      const groupedCrimeData = data.reduce((acc, row) => {
        const state = row.state; // Get the state for each row
        const crimeType = row.online_crime; // Get the crime type
        const numCases = parseInt(row.number_of_cases, 10) || 0; // Get the number of cases for that row
  
        // If the state doesn't exist in the accumulator, initialize it
        if (!acc[state]) {
          acc[state] = {};
        }
  
        // If the crime type doesn't exist in the state, initialize it
        if (!acc[state][crimeType]) {
          acc[state][crimeType] = 0;
        }
  
        // Add the number of cases to the corresponding crime type and state
        acc[state][crimeType] += numCases;
  
        return acc;
      }, {});
  
      // Convert the grouped data into an array of objects suitable for rendering in a table
      const formattedData = Object.entries(groupedCrimeData).map(([state, crimes]) => ({
        state,
        ...crimes
      }));
  
      setCrimeCasesByState(formattedData);
    }
  }, [data, selectedState]);  

// Financial Loss Sorting
const financialLossesByState = states
.filter(state => state !== 'Overall')  
.map(state => {
  const stateData = data.filter(row => row.state === state);
  const totalLoss = stateData.reduce((sum, row) => sum + (parseFloat(row.financial_losses_rm) || 0), 0);
  return { state, totalLoss };
});

// Sorting by Total Loss in descending order
const sortedFinancialLosses = financialLossesByState.sort((a, b) => b.totalLoss - a.totalLoss);

return (
<div className="malaysia-content" style={{ overflow: 'auto', maxWidth: '100%' }}>
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

 {/* For the "Overall" State */}
{selectedState === 'Overall' && (
  <div style={{ textAlign: 'center', marginTop: '20px' }}>
    <h3 style={{ color: '#00BFFF', fontSize: '30px', fontWeight: 'bold', display: 'inline' }}>
      Here are the Overall Stats of{' '}
    </h3>
    <h3 style={{ color: '#00BFFF', fontSize: '35px', fontWeight: 'bold', display: 'inline' }}>
      Malaysia
    </h3>
  </div>
)}

{selectedState === 'Overall' && (
  <div style={{ textAlign: 'center', marginTop: '10px', color: 'white', fontSize: '20px' }}>
    <p>
      Below are the stats for 2021-2023, sourced from the Department of Statistics Malaysia (DOSM). 
      These insights showcase the affected age groups, financial losses, and crime categories reported across <span style={{ fontSize: '23px', fontWeight: 'bold', marginLeft: '5px' }}>Malaysia</span> in these years.
    </p>
  </div>
)}


  {selectedState === 'Overall' && (
  <div style={{ 
    display: 'flex', 
    flexWrap: 'wrap', 
    justifyContent: 'center', 
    marginTop: '30px',
    width: '100%' 
  }}>
    
    {/* Left Section for Overall Financial Loss */}
    <div style={{ 
      width: 'calc(45% - 20px)',
      minWidth: '350px',
      maxWidth: '900px',
      backgroundColor: '#222', 
      padding: '20px', 
      borderRadius: '15px', 
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
      marginTop: '20px',
      marginBottom: '20px',
      marginLeft: '10px',
      marginRight: '10px',
      overflow: 'auto',
      flex: '1 1 350px' 
    }}>
      <h3 style={{ color: '#00BFFF', fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>
        Overall Financial Loss Ranks by State
      </h3>
      <div style={{ overflowX: 'auto', width: '100%' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', borderRadius: '12px', overflow: 'hidden', background: 'linear-gradient(45deg, #1a1a1a, #333)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
          <thead>
            <tr style={{ backgroundColor: '#333', color: '#00BFFF', fontSize: '16px', textAlign: 'center' }}>
              <th style={{ padding: '15px', borderBottom: '2px solid #444', borderTopLeftRadius: '10px', width: '15%' }}>Rank</th>
              <th style={{ padding: '15px', borderBottom: '2px solid #444', width: '50%' }}>State</th>
              <th style={{ padding: '15px', borderBottom: '2px solid #444', borderTopRightRadius: '10px', width: '35%' }}>Total Loss (RM)</th>
            </tr>
          </thead>
          <tbody>
            {sortedFinancialLosses.map((item, index) => (
              <tr
                key={item.state}
                style={{
                  backgroundColor: index % 2 === 0 ? '#333' : '#444',
                  color: 'white',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#555'}
                onMouseLeave={(e) => e.target.style.backgroundColor = index % 2 === 0 ? '#333' : '#444'}
              >
                <td style={{ padding: '12px', borderBottom: '1px solid #444' }}>{index + 1}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #444' }}>
                  <span
                    className={`malaysia-state-flag-icon malaysia-state-flag-icon-${stateFlagCodes[item.state]}`}
                    style={{ marginRight: '8px', verticalAlign: 'middle', width: '24px', height: '35px' }}
                  ></span>
                  {item.state}
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #444', whiteSpace: 'nowrap' }}>
                  RM {item.totalLoss.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    
    {/* Right Section for Online Crimes Summary by State */}
    <div style={{ 
      width: 'calc(53% - 20px)', 
      maxWidth: '1200px',
      backgroundColor: '#222', 
      padding: '20px', 
      borderRadius: '15px', 
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
      marginTop: '20px', 
      marginBottom: '20px',
      marginLeft: '10px',
      marginRight: '10px',
      overflow: 'auto',
      flex: '1 1 650px'
    }}>
      <h3 style={{ color: '#00BFFF', fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>
        Online Crimes Cases by State
      </h3>
      <div style={{ overflowX: 'auto', width: '100%' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', borderRadius: '12px', overflow: 'hidden', background: 'linear-gradient(45deg, #1a1a1a, #333)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', tableLayout: 'fixed' }}>
          <thead>
            <tr style={{ backgroundColor: '#333', color: '#00BFFF', fontSize: '15px', textAlign: 'center' }}>
              <th style={{ padding: '12px 8px', borderBottom: '2px solid #444', borderTopLeftRadius: '10px', width: '12%' }}>State</th>
              <th style={{ padding: '12px 8px', borderBottom: '2px solid #444', width: '12%' }}>e-Commerce</th>
              <th style={{ padding: '12px 8px', borderBottom: '2px solid #444', width: '12%' }}>e-Finance</th>
              <th style={{ padding: '12px 8px', borderBottom: '2px solid #444', width: '12%' }}>Love Scam</th>
              <th style={{ padding: '12px 8px', borderBottom: '2px solid #444', width: '17%' }}>Non-existent Investments</th>
              <th style={{ padding: '12px 8px', borderBottom: '2px solid #444', width: '17%' }}>Non-existent Loans</th>
              <th style={{ padding: '12px 8px', borderBottom: '2px solid #444', borderTopRightRadius: '10px', width: '18%' }}>Telecom Crime</th>
            </tr>
          </thead>
          <tbody>
            {crimeCasesByState.map((item, index) => (
              <tr 
                key={index} 
                style={{ backgroundColor: index % 2 === 0 ? '#333' : '#444', color: 'white', textAlign: 'center', transition: 'all 0.3s ease' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#555'}
                onMouseLeave={(e) => e.target.style.backgroundColor = index % 2 === 0 ? '#333' : '#444'}
              >
                <td style={{ padding: '10px 8px', borderBottom: '1px solid #444' }}>
                  <span
                    className={`malaysia-state-flag-icon malaysia-state-flag-icon-${stateFlagCodes[item.state]}`}
                    style={{ marginRight: '5px', verticalAlign: 'middle', width: '20px', height: '14px' }}
                  ></span>
                  {item.state}
                </td>
                <td style={{ padding: '10px 8px', borderBottom: '1px solid #444', fontSize: '14px' }}>{item['e-Commerce'] || 0}</td>
                <td style={{ padding: '10px 8px', borderBottom: '1px solid #444', fontSize: '14px' }}>{item['e-Finance'] || 0}</td>
                <td style={{ padding: '10px 8px', borderBottom: '1px solid #444', fontSize: '14px' }}>{item['Love scam'] || 0}</td>
                <td style={{ padding: '10px 8px', borderBottom: '1px solid #444', fontSize: '14px' }}>{item['Non-existent investments'] || 0}</td>
                <td style={{ padding: '10px 8px', borderBottom: '1px solid #444', fontSize: '14px' }}>{item['Non-existent loans'] || 0}</td>
                <td style={{ padding: '10px 8px', borderBottom: '1px solid #444', fontSize: '14px' }}>{item['Telecommunication crime'] || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)}

{/* Display Bar Chart for Victims by Age Group */}
{selectedState === 'Overall' && (
  <div style={{ width: '100%', marginTop: '30px', overflow: 'auto' }}>
    <h3 style={{ color: '#00BFFF', fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>
      Victims by Age Group for each State
    </h3>
    <div className="chart-container" style={{ width: '80%', minWidth: '600px', margin: '0 auto', background: '#222', padding: '20px', borderRadius: '10px' }}> {/* Box for Bar Chart */}
      <ResponsiveContainer width="100%" height={600} aspect={undefined}>
        <BarChart data={ageGroupData}>
          <CartesianGrid stroke="none" /> 
          <XAxis dataKey="state" />
          <YAxis domain={[0, 7000]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="15-20" stackId="a" fill="#8884d8" name="15-20" />
          <Bar dataKey="21-30" stackId="a" fill="#82ca9d" name="21-30" />
          <Bar dataKey="31-40" stackId="a" fill="#ffc658" name="31-40" />
          <Bar dataKey="41-50" stackId="a" fill="#ff7300" name="41-50" />
          <Bar dataKey="51-60" stackId="a" fill="#ff6b6b" name="51-60" />
          <Bar dataKey=">=61" stackId="a" fill="#d0d0d0" name=">=61" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
)}



     {/* Adjusted Position for State Stats Title and Flag */}
{selectedState !== 'Overall' && flagCode && (
  <div style={{ textAlign: 'center', marginTop: '20px' }}>
    <h3 style={{ color: '#00BFFF', fontSize: '30px', fontWeight: 'bold', display: 'inline' }}>
      Here are the Stats for{' '}
    </h3>
    <h3 style={{ color: '#00BFFF', fontSize: '35px', fontWeight: 'bold', display: 'inline' }}>
      {selectedState}
    </h3>
    <span
      className={`malaysia-state-flag-icon malaysia-state-flag-icon-${flagCode}`}
      style={{
        display: 'inline-block',
        width: 48,
        height: 32,
        marginLeft: '10px', // Space between state name and flag
        verticalAlign: 'middle' // Proper alignment with text
      }}
    />
  </div>
)}



{/* Displaying the description */}
{selectedState !== 'Overall' && (
  <div style={{ textAlign: 'center', marginTop: '10px', color: 'white', fontSize: '20px' }}>
    <p>
      Below are the stats from 2021-2023, sourced from the Department of Statistics Malaysia (DOSM). 
      These insights showcase the growth of online crimes, commonly affected age groups, financial losses, and crime categories reported in 
      <span style={{ fontSize: '23px', fontWeight: 'bold', marginLeft: '5px' }}>{selectedState}</span> during these years.
    </p>
  </div>
)}


      {/* Stats Layout */}
      {selectedState !== 'Overall' && (
        <div className="stats-container">
          <div className="stat-card orange"><h3>Total Financial Loss (RM)</h3><p>RM {totalLossRM.toLocaleString()}</p><span className="icon">💰</span></div>
          <div className="stat-card red"><h3>Number of Victims</h3><p>{victimsCount.toLocaleString()}</p><span className="icon">👥</span></div>
          <div className="stat-card green"><h3>Number of Cases</h3><p>{casesCount.toLocaleString()}</p><span className="icon">📊</span></div>
        </div>
      )}

      {/* Line Chart for Number of Cases across Years */}
      {selectedState !== 'Overall' && (
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ width: '65%', padding: '20px', background: '#222', borderRadius: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
            <h3 style={{ color: '#00BFFF', fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>Number of Cases across Years</h3>
            {/* Wrap all charts with ResponsiveContainer */}
            <ResponsiveContainer width="100%" height={400}  aspect={undefined}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="cases" stroke="#00AAFF" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Pie chart for Gender Distribution */}
          <div style={{ width: '33%', padding: '20px', background: '#222', borderRadius: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
            <h3 style={{ color: '#00BFFF', fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>Gender Distribution of Victims</h3>
            <ResponsiveContainer width="100%" height={300} aspect={undefined}>
              <PieChart>
                <Pie data={genderData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} fill="#00BFFF" label>
                  {genderData.map((entry, index) => (
                    <Cell key={index} fill={entry.name === 'Male' ? '#00BFFF' : '#FF6347'} />
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
                  wrapperStyle={{ padding: '5px 0', color: '#00BFFF' }}
                  content={({ payload }) => (
                    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                      {payload.map(({ payload: d }, index) => {
                        const isMale = d.name === 'Male';
                        return (
                          <li key={index} style={{ display: 'flex', alignItems: 'center' }}>
                            {isMale
                              ? <FaMars  style={{ marginRight: 10, color: '#00BFFF', fontSize: 20 }} />
                              : <FaVenus style={{ marginRight: 10, color: '#FF6347', fontSize: 20 }} />}
                            <span style={{ color: isMale ? '#00BFFF' : '#FF6347' }}>
                              {d.name}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                  
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Additional Statistics Box */}
      {selectedState !== 'Overall' && (
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
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ width: '25%', paddingLeft: '40px', paddingTop: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                {caseTypeData.map((entry, index) => {
                  const itemColor = 
                    index === 0 ? "#00E3F9" : // e-Commerce
                    index === 1 ? "#C77DFF" : // e-Finance
                    index === 2 ? "#FF4F81" : // Love scam
                    index === 3 ? "#3EFFB9" : // Non-existent investments
                    index === 4 ? "#FFA447" : // Non-existent loans
                    "#FFF94C"; // Telecommunication crime
                  
                  return (
                    <div key={`legend-${index}`} style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        backgroundColor: itemColor,
                        marginRight: '15px', 
                        borderRadius: '4px'
                      }}></div>
                      <span style={{ color: itemColor, fontSize: '16px', fontWeight: 'bold' }}>{entry.name}</span>
                    </div>
                  );
                })}
              </div>
              
              {/* 右侧饼图 */}
              <div style={{ width: '75%' }}>
                <ResponsiveContainer width="100%" height={450} aspect={undefined}>
                  <PieChart>
                    <Pie
                      data={caseTypeData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={150} 
                      fill="#00BFFF"
                      labelLine={false}
                      label={({ percent, name }) => {
                        const percentage = (percent * 100).toFixed(1);
                        return `${percentage}%`; 
                      }}
                    >
                      {caseTypeData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            index === 0 ? "#00E3F9" : // e-Commerce
                            index === 1 ? "#C77DFF" : // e-Finance
                            index === 2 ? "#FF4F81" : // Love scam
                            index === 3 ? "#3EFFB9" : // Non-existent investments
                            index === 4 ? "#FFA447" : // Non-existent loans
                            "#FFF94C" // Telecommunication crime
                          }
                        />
                      ))}
                    </Pie>
                    <PieTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Latest Scam News */}
      {selectedState !== 'Overall' && (
        <div style={{ marginTop: '30px', color: '#00BFFF', fontSize: '24px', textAlign: 'center' }}>
          <h3 style={{ color: '#00BFFF', fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>Latest Scam News in {selectedState}</h3>
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
      )}
    </div>
  );
};

export default MalaysiaDashboard;
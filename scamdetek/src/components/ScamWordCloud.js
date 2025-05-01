import React from 'react';
import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

// Static list of scam keywords
const SCAM_KEYWORDS = [
  "#1",
  "100% more",
  "100% free",
  "100% satisfied",
  "Additional income",
  "Be your own boss",
  "Best price",
  "Big bucks",
  "Billion",
  "Cash bonus",
  "Casino",
  "Cheap",
  "Claims",
  "Clearance",
  "Compare rates",
  "Credit card offers",
  "Cures",
  "Dear friend",
  "Discount",
  "Double your income",
  "Earn $",
  "Earn extra cash",
  "Eliminate debt",
  "Extra income",
  "Fast cash",
  "Financial freedom",
  "Free access",
  "Free consultation",
  "Free gift",
  "Free hosting",
  "Free info",
  "Free investment",
  "Free membership",
  "Free money",
  "Free offer",
  "Free preview",
  "Free quote",
  "Free sample",
  "Free trial",
  "Full refund",
  "Get out of debt",
  "Get paid",
  "Giveaway",
  "Guaranteed",
  "Increase sales",
  "Incredible deal",
  "Investment",
  "Join millions",
  "Lifetime",
  "Loans",
  "Lose weight",
  "Lottery",
  "Lower rates",
  "Make money",
  "Million dollars",
  "Miracle",
  "Money back",
  "No credit check",
  "No fees",
  "No obligation",
  "No purchase necessary",
  "Offer expires",
  "Opportunity",
  "Order now",
  "Outstanding values",
  "Password",
  "Passwords",
  "Prize",
  "Promise",
  "Pure profit",
  "Quick cash",
  "Refinance",
  "Removal",
  "Requires initial investment",
  "Risk free",
  "Satisfaction guaranteed",
  "Save $",
  "Save big money",
  "Save up to",
  "Score",
  "Serious cash",
  "Subject to credit",
  "They keep your money",
  "This isn't a scam",
  "Undisclosed",
  "Unsecured credit",
  "Urgent",
  "Vacation offers",
  "Valuble offer",
  "We honor all credit cards",
  "Weekend getaway",
  "What are you waiting for",
  "While supplies last",
  "Will not believe your eyes",
  "Winner",
  "Winning",
  "You have been selected",
  "Account update",
  "Action required",
  "Banking alert",
  "Verify account",
  "Hacked",
  "Virus",
  "Security breach",
  "Government funds",
  "keuntungan",
  "promo",
  "promosi",
  "menang",
  "memenangi",
  "menangi hadiah",
  "menang hamper",
  "memenangi hadiah",
  "berjaya menangi",
  "berjaya memenangi",
  "berjaya menang",
  "berpeluang",
  "meraih hadiah",
  "meraih wang tunai",
  "bertuah",
  "percuma",
  "skim cepat kaya",
  "pulangan lumayan",
  "jutawan segera",
  "modal kecil",
  "pelaburan berisiko rendah",
  "pendapatan pasif",
  "pendapatan tetap",
  "kerja dari rumah",
  "peluang keemasan",
  "jangan ketinggalan",
  "daftar sekarang",
  "klik di sini",
  "hubungi sekarang",
  "tawaran eksklusif",
  "harga terendah",
  "tiada pelaburan diperlukan",
  "tiada yuran tersembunyi",
  "loteri",
  "jackpot",
  "pinjaman mudah",
  "pinjaman tanpa jaminan",
  "hadiah bernilai",
  "bonus wang tunai",
  "geran",
  "dana percuma",
  "proses cepat",
  "bayaran segera"
];

const ScamWordCloud = ({ onClose }) => {
  const svgRef = useRef(null);
  
  useEffect(() => {
    if (!svgRef.current) return;
    
    // Clear any existing content
    d3.select(svgRef.current).selectAll("*").remove();
    
    const width = 1000;
    const height = 700;
    
    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .style("background", "#0a192f");
    
    // Color palette
    const colors = [
      "#4FD1C5", "#68D391", "#CBD5E0", "#A0AEC0",
      "#718096", "#2D3748", "#4ABDC5", "#38B2AC",
      "#81E6D9", "#ffffff", "#000000", "#5DDEB7"
    ];
    
    // Font families
    const fontFamilies = [
      "'Courier New', monospace",
      "Arial, sans-serif",
      "Verdana, sans-serif"
    ];
    
    // Create a simple word layout
    const words = SCAM_KEYWORDS.map((text, i) => {
      // Create a rough layout in a grid pattern with some randomness
      const cols = Math.ceil(Math.sqrt(SCAM_KEYWORDS.length));
      const rows = Math.ceil(SCAM_KEYWORDS.length / cols);
      
      const colWidth = width / cols;
      const rowHeight = height / rows;
      
      const col = i % cols;
      const row = Math.floor(i / cols);
      
      // Add some randomness to position
      const x = (col * colWidth) + (colWidth/2) + (Math.random() * 50 - 25);
      const y = (row * rowHeight) + (rowHeight/2) + (Math.random() * 30 - 15);
      
      // Random size between 15-45
      const size = Math.floor(Math.random() * 30) + 15;
      
      // Mostly horizontal, sometimes vertical
      const rotate = Math.random() > 0.9 ? 90 : 0;
      
      return {
        text,
        size,
        x,
        y,
        rotate,
        color: colors[i % colors.length],
        fontFamily: fontFamilies[i % fontFamilies.length],
        fontWeight: Math.random() > 0.8 ? "bold" : "normal"
      };
    });
    
    // Add words to SVG
    const wordElements = svg.selectAll("text")
      .data(words)
      .enter()
      .append("text")
      .attr("x", d => d.x)
      .attr("y", d => d.y)
      .attr("font-size", d => `${d.size}px`)
      .attr("fill", d => d.color)
      .attr("font-family", d => d.fontFamily)
      .attr("font-weight", d => d.fontWeight)
      .attr("text-anchor", "middle")
      .attr("transform", d => `rotate(${d.rotate},${d.x},${d.y})`)
      .style("cursor", "pointer")
      .text(d => d.text);
    
    // Add hover effect
    wordElements
      .on("mouseenter", function() {
        d3.select(this)
          .transition()
          .duration(150)
          .style("filter", "brightness(1.5) drop-shadow(0 0 4px currentColor)")
          .style("letter-spacing", "1px")
          .style("text-shadow", "0 0 6px currentColor");
      })
      .on("mouseleave", function() {
        d3.select(this)
          .transition()
          .duration(200)
          .style("filter", "brightness(1)")
          .style("letter-spacing", "0.5px")
          .style("text-shadow", "none");
      });
      
  }, []);
  
  return (
    <div className="word-cloud-modal-overlay">
      <div className="word-cloud-modal">
        <div className="word-cloud-modal-header">
          <h2>
            <span className="tech-icon">⚠️</span> Scam Threat Keywords <span className="tech-icon">⚠️</span>
          </h2>
          <button className="close-modal-button" onClick={onClose}>×</button>
        </div>
        <div className="word-cloud-container" style={{ width: '100%', height: '700px' }}>
          <svg ref={svgRef} style={{ width: '100%', height: '100%' }}></svg>
        </div>
        <div className="word-cloud-instructions">
          <p>Beware of these possible scam keywords. They may indicate fraudulent communication or potential cyber threats.</p>
          <div className="tech-footer">
            <span style={{opacity: 0.7}}></span>
            <div className="source-attribution">Source: <a href="https://www.activecampaign.com/blog/spam-words" target="_blank" rel="noopener noreferrer">ActiveCampaign Blog</a></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScamWordCloud;
import React from 'react';
import './styles.css'; 

function Result({ closestParty }) {
  let imageUrl;

  switch (closestParty) {
    case 'VVD':
      imageUrl = 'logos/vvd.svg.png';
      break;
    case 'D66':
      imageUrl = 'logos/d66.svg.png';
      break;

    default:
      imageUrl = 'images/default-logo.png';
  }

  const fullPath = `${process.env.PUBLIC_URL}/${imageUrl}`;

  return (
    <div className="result-container">
      <h2 className="result-title">Je resultaat voor de verkiezingen</h2>
      <div className="result-party">
        <img src={fullPath} alt={`${closestParty} logo`} />
        <p className="party-name">{closestParty}</p>
      </div>
    </div>
  );
}

export default Result;

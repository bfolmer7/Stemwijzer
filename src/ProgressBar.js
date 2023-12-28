import React from 'react';
import './styles.css'; 

function ProgressBar({ current, total }) {
  const progressPercentage = (current / total) * 100;

  return (
    <div className="progress-bar">
      <div
        className="progress-bar-fill"
        style={{ width: `${progressPercentage}%` }}
      ></div>
    </div>
  );
}

export default ProgressBar;

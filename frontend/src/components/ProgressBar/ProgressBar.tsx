import React from 'react';
import styles from './ProgressBar.module.css';

export interface ProgressBarProps {
  progress: number;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, className = "" }) => {
  const clampedProgress = Math.max(0, Math.min(1, progress));
  
  return (
    <div className={`${styles.progressBarContainer} ${className}`}>
      <div 
        className={styles.progressBarFill}
        role="progressbar"
        aria-valuenow={Math.round(clampedProgress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Progresso de navegação: ${Math.round(clampedProgress * 100)}%`}
        style={{ 
          width: `${clampedProgress * 100}%`,
          transform: `scaleX(${clampedProgress})`,
          transformOrigin: 'left'
        }}
      />
    </div>
  );
};

export default ProgressBar;

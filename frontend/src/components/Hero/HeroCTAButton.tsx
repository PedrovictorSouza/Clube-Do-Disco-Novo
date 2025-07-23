import React from "react";
import styles from "./TitleBlock.module.css";

interface HeroCTAButtonProps {
  onStartCourse: () => void;
  hideButton: boolean;
}

const HeroCTAButton: React.FC<HeroCTAButtonProps> = ({ onStartCourse, hideButton }) => (
  <>
    {!hideButton && (
      <button
        onClick={onStartCourse}
        className={styles.button + ' ' + (hideButton ? styles.fadeOut : '')}
        style={{
          minWidth: 256,
          maxWidth: 320,
          width: 'auto',
          padding: '6px 26px',
          background: 'rgb(255, 225, 0)',
          border: '2px solid #222',
          borderRadius: '32px',
          fontFamily: 'Karla, Sour Gummy, sans-serif',
          fontSize: 22.4,
          fontWeight: 700,
          color: '#222',
          letterSpacing: 2,
          textTransform: 'lowercase',
          transition: 'all 0.2s',
          outline: 'none',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          marginTop: 0,
          marginBottom: 0,
          position: 'relative',
        }}
      >
        que clube é esse?
      </button>
    )}
  </>
);

export default HeroCTAButton;

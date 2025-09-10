import React from 'react';

const VinylLogo: React.FC = () => {
  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      left: '20px',
      zIndex: 99999,
      width: '60px',
      height: '60px',
      cursor: 'pointer'
    }}>
      {}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '60px',
        height: '60px',
        backgroundColor: '#333',
        borderRadius: '50%',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'rotate 2s linear infinite'
      }}>
        {}
        <div style={{
          width: '50px',
          height: '50px',
          backgroundColor: 'transparent',
          borderRadius: '50%',
          border: '1px solid white',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}></div>
        
        {}
        <div style={{
          width: '40px',
          height: '40px',
          backgroundColor: 'transparent',
          borderRadius: '50%',
          border: '1px solid white',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}></div>
        
        {}
        <div style={{
          width: '30px',
          height: '30px',
          backgroundColor: 'transparent',
          borderRadius: '50%',
          border: '1px solid white',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '8px',
            height: '8px',
            backgroundColor: 'white',
            borderRadius: '50%'
          }}></div>
        </div>
      </div>
      
      
    </div>
  );
};

export default VinylLogo;

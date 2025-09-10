import React from 'react';
import styles from './Layout.module.css';
import VinylLogo from '../VinylLogo/VinylLogo';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <div className={styles.baseBg} />
            <VinylLogo />
            {children}
        </>
    );
};

export default Layout;
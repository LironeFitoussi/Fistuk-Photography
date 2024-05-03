import React, { useState } from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
    const [year] = useState(new Date().getFullYear());

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <p className={styles.credit}>© {year} Lirone Fitoussi. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;


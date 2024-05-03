import styles from './Photography.module.css';
import React, { useState } from 'react';

const Photography = () => {
    const [activeLink, setActiveLink] = useState('collections');

    const handleLinkClick = (link: string) => {
        setActiveLink(link);
    };

    return (
        <div>
            <nav >
                <ul className={styles.nav}>
                    <li>
                        <button onClick={() => handleLinkClick('collections')}>Collections</button>
                    </li>
                    <li>
                        <button onClick={() => handleLinkClick('albums')}>Albums</button>
                    </li>
                </ul>
            </nav>

            {activeLink === 'collections' && (
                <div>
                    <p>dfsgsdgfsdg</p>
                    {/* Render collections */}
                </div>
            )}

            {activeLink === 'albums' && (
                <div>
                    <p>sdfgsdfgsdfg</p>
                    {/* Render albums */}
                </div>
            )}
        </div>
    );
};

export default Photography;

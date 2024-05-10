import React, { useState } from 'react';
import styles from './Footer.module.css';
import { FaWhatsapp } from "react-icons/fa";

const Footer: React.FC = () => {
    const [year] = useState(new Date().getFullYear());
    const phoneNumber = '+972585109829'; // Your WhatsApp phone number

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <p className={styles.credit}>We're Still Developing</p>
                <p className={styles.credit}>© {year} Lirone Fitoussi. All rights reserved.</p>
                <button className={styles.waLinkBtn}><a
                    href={`https://wa.me/${phoneNumber}`}
                    className={styles.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <span>
                        <span>Chat on WhatsApp</span>
                        
                        <FaWhatsapp />
                    </span>
                </a>
                </button>
                
            </div>
        </footer>
    );
};

export default Footer;

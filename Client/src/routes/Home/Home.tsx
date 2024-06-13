import styles from './Home.module.css';
import React from 'react';

const Home: React.FC = () => {
    return (
        <div className={styles.container}>
            <section className={styles.opening}>
                <h1>Hello! My Name is Lirone and I'm a Photographer and Web Developer</h1>
                <p className={styles.slogan}>"Building the Future, One Line of Code at a Time"</p>
                <img className={styles.devLogo} src="/dev-logo.png" alt="" />
            </section>
             <section className={styles.aboutMe}>
                <h2>About Me</h2>
                <p>Insert your information here...</p>
            </section>
            <div className={styles.lorem}>
                <h2>Site still in development</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit
                    , sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </div>
        </div>
    );
};

export default Home;

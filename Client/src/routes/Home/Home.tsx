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

            <section className={styles.projects}>
                <h2>Projects</h2>
                <p>Insert your projects here...</p>
            </section>

            <section>
                <h2>Slogans</h2>
                <p>Insert your slogans here...</p>
            </section>
        </div>
    );
};

export default Home;

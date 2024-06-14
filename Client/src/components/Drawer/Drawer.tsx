import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../Auth/LogoutButton";
import LoginButton from "../Auth/LoginButton";
import styles from "./Drawer.module.css";

interface MenuItem {
  name: string;
  link: string;
}

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, menuItems }) => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className={`${styles.drawer} ${isOpen ? styles.open : ""}`}>
      <div className={styles.drawerContent}>
        <img
          className={styles.mainLogo}
          src="/light-logo.png"
          alt="Lirone Fitoussi Development"
        />
        <ul className={styles.menuList}>
          {menuItems.map((item) => (
            <li key={item.name} className={styles.menuItem}>
              <Link to={item.link} onClick={onClose} className={styles.link}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.authButtons}>
          {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </div>
      </div>
    </div>
  );
};

export default Drawer;

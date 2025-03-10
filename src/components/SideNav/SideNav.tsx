import { NavLink } from 'react-router-dom';
import styles from './SideNav.module.scss';

const SideNav = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onClose}></div>}
      <aside className={`${styles.sidenav} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <h3>Menu</h3>
          <button className={styles.closeButton} onClick={onClose}>&times;</button>
        </div>
        <nav className={styles.navLinks}>
          <NavLink to="/customers" onClick={onClose}>Customers List</NavLink>
          <NavLink to="/bill-generator" onClick={onClose}>Bill Generator</NavLink>
        </nav>
      </aside>
    </>
  );
};

export default SideNav;

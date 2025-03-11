import { NavLink } from 'react-router-dom';
import styles from './SideNav.module.scss';

interface SideNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideNav: React.FC<SideNavProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onClose}></div>}
      <aside className={`${styles.sidenav} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <h3>Menu</h3>
          <button className={styles.closeButton} onClick={onClose}>&times;</button>
        </div>
        <nav className={styles.navLinks}>
          <NavLink to="/customers" onClick={onClose} className={({ isActive }) => isActive ? styles.active : ''}>
            Customers List
          </NavLink>
          <NavLink to="/bill-generator" onClick={onClose} className={({ isActive }) => isActive ? styles.active : ''}>
            Bill Generator
          </NavLink>
        </nav>
      </aside>
    </>
  );
};

export default SideNav;
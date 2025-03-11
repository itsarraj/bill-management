import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../store/slices/authSlice';
import SideNav from '../SideNav/SideNav';
import styles from './Navigation.module.scss';
import { RootState } from '../../store/store';

const Navigation = () => {
  const [isSideNavOpen, setSideNavOpen] = useState(false);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleSideNav = () => setSideNavOpen(!isSideNavOpen);
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  if (!isLoggedIn) return null;

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navLeft}>
          <button className={styles.menuButton} onClick={toggleSideNav}>
            <span className={styles.hamburger}></span>
          </button>
          <Link to="/" className={styles.logo}>Bill Management System</Link>
        </div>

        <div className={styles.navRight}>
          <span>{user?.email}</span>
          <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
        </div>
      </nav>
      <SideNav isOpen={isSideNavOpen} onClose={() => setSideNavOpen(false)} />
    </>
  );
};

export default Navigation;

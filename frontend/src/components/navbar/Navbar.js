import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './Navbar.module.css';

import Promanage from '../../assets/pro.png';
import Analytics from '../../assets/analytics.png';
import Board from '../../assets/board.png';
import Logout from '../../assets/Logout.png';
import Settings from '../../assets/settings.png';


const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        const pathname = location.pathname;

        if (pathname.includes('/analytics')) {
            document.getElementById('analytics').classList.add(styles.active);
        }
        else if (pathname.includes('/settings')) {
            document.getElementById('settings').classList.add(styles.active);
        }
        else {
            document.getElementById('dashboard').classList.add(styles.active);
        }
    }, [])


    const navHandler = (e) => {
        navigate(`/${e.currentTarget.dataset.name}`);
    }

    const logoutHandler = () => {
        navigate('/logout');
    }




    return (
        <div className={styles.container}>
            <div className={styles.navheading}>
                <img width='25px' height='25px' src={Promanage} alt='promanage' />
                <p>Pro Manage</p>
            </div>
            <div className={styles.navitem} id='dashboard' data-name='dashboard' onClick={navHandler}>
                <img width='25px' height='25px' src={Board} alt='board' />
                <p>Board</p>
            </div>
            <div className={styles.navitem} id='analytics' data-name='analytics' onClick={navHandler}>
                <img width='25px' height='25px' src={Analytics} alt='analytics' />
                <p>Analytics</p>
            </div>
            <div className={`${styles.navitem} ${styles.lastNavItem}`} id='settings' data-name='settings' onClick={navHandler}>
                <img width='25px' height='25px' src={Settings} alt='settings' />
                <p>Settings</p>
            </div>
            <div className={styles.logout} onClick={logoutHandler}>
                <img width='25px' height='25px' src={Logout} alt='logout' />
                <p>Logout</p>
            </div>
        </div>
    )
}

export default Navbar
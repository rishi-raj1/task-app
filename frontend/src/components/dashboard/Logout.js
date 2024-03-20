import { useNavigate } from 'react-router-dom';

import styles from './Logout.module.css';


const Logout = () => {

    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem('token');
        navigate('/');
    }

    const cancelHandler = () => {
        navigate('/dashboard');
    }


    return (
        <div className={styles.container}>
            <div className={styles.centeredDiv}>
                <p>Are you sure you want to Logout?</p>
                <button className={styles.logoutBtn} onClick={logoutHandler}>Yes, Logout</button>
                <button className={styles.cancelBtn} onClick={cancelHandler}>Cancel</button>
            </div>
        </div>
    )
}

export default Logout
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './RegisterPage.module.css';

import Login from '../components/auth/Login'
import Signup from '../components/auth/Signup'



const RegisterPage = () => {
    const navigate = useNavigate();

    const [login, setLogin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            navigate('/dashboard');
        }
    }, []);



    return (
        <div className={styles.container}>
            {
                login ? (<Login setLogin={setLogin} />) : (<Signup setLogin={setLogin} />)
            }
        </div>
    )
}

export default RegisterPage
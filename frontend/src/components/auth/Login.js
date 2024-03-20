import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

import axios from 'axios'

import styles from './Login.module.css';

import baby from '../../assets/baby.png';
import Circle from '../../assets/circle.png';
import Email from '../../assets/Email.png';
import Lock from '../../assets/lock.png'
import eye from '../../assets/eye.png';
import crosseye from '../../assets/cross-eye.png';


const Login = ({ setLogin }) => {
	const navigate = useNavigate();

	const [obj, setObj] = useState({
		email: '',
		password: ''
	});

	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);


	const inputHandler = (e) => {
		setObj({
			...obj,
			[e.target.name]: e.target.value
		})
	}

	const eyeHandler = () => {
		setShowPassword(!showPassword);
	}

	const loginHandler = async () => {
		try {
			if (obj.email.trim().length === 0) {
				alert('please fill the email field');
				return;
			}

			if (obj.password.trim().length === 0) {
				alert('please fill the password field');
				return;
			}

			setLoading(true);

			const result = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/login`, obj);
			const { token } = result.data;
			localStorage.setItem('token', JSON.stringify(`Bearer ${token}`));

			navigate('/dashboard');
		}
		catch (err) {
			if (err.response) {
				alert(err.response.data.message);
			}
			else if (err.request) {
				alert(err.request);
			}
			else {
				alert(err.message);
			}
		}
		finally {
			setLoading(false);
		}
	}

	const registerHandler = () => {
		setLogin(false);
	}


	return (
		<div className={styles.container}>
			<div className={styles.leftDiv}>
				<div className={styles.circle}>
					<img width='280px' height='280px' src={Circle} alt='circle' />
				</div>
				<div className={styles.baby}>
					<img src={baby} alt='baby' />
				</div>
				<div>
					<p className={styles.welcomePara}>Welcome aboard my friend</p>
					<p className={styles.startPara}>just a couple of clicks and we start</p>
				</div>
			</div>

			<div className={styles.rightDiv}>
				<p className={styles.register}>Login</p>
				<div className={styles.inputDiv}>
					<img src={Email} alt='email' className={styles.leftImage} />
					<input type='email' placeholder='Email' name='email' onChange={inputHandler} />
				</div>
				<div className={styles.inputDiv}>
					<img src={Lock} alt='lock' className={styles.leftImage} />
					<input type={showPassword ? 'text' : 'password'} placeholder='Password' name='password' onChange={inputHandler} />
					{
						(showPassword)
							? (<img src={crosseye} alt='crosseye' className={styles.crosseye} onClick={eyeHandler} />)
							: (<img src={eye} alt='eye' className={styles.eye} onClick={eyeHandler} />)
					}
				</div>
				<div className={styles.buttonsDiv}>
					<button className={styles.loginBtn} onClick={loginHandler} disabled={loading}>
						{
							loading ? 'Logging in...' : 'Log in'
						}
					</button>
					<p className={styles.question}>Have no account yet ?</p>
					<button className={styles.registerBtn} onClick={registerHandler}>Register</button>
				</div>
			</div>
		</div>
	)
}


export default Login;
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import styles from './Signup.module.css';

import baby from '../../assets/baby.png';
import Circle from '../../assets/circle.png';
import Profile from '../../assets/Profile.png';
import Email from '../../assets/Email.png';
import Lock from '../../assets/lock.png';
import eye from '../../assets/eye.png';
import crosseye from '../../assets/cross-eye.png';



const Signup = ({ setLogin }) => {
	const navigate = useNavigate();

	const [obj, setObj] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: ''
	});

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [loading, setLoading] = useState(false);



	const inputHandler = (e) => {
		setObj({
			...obj,
			[e.target.name]: e.target.value
		});
	}

	const eye1Handler = () => {
		setShowPassword(!showPassword);
	}

	const eye2Handler = () => {
		setShowConfirmPassword(!showConfirmPassword);
	}

	const registerHandler = async () => {
		try {
			if (obj.name.trim().length === 0) {
				alert('please fill the name field');
				return;
			}

			if (obj.email.trim().length === 0) {
				alert('please fill the email field');
				return;
			}

			if (obj.password.trim().length === 0) {
				alert('please fill the password field');
				return;
			}

			if (obj.confirmPassword.trim().length === 0) {
				alert('please fill the confirm password field');
				return;
			}

			if (obj.password !== obj.confirmPassword) {
				alert('password does not match');
				return;
			}

			setLoading(true);

			const result = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/signup`, obj);
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

	const loginHandler = () => {
		setLogin(true);
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
				<p className={styles.register}>Register</p>
				<div className={styles.inputDiv}>
					<img src={Profile} alt='profile' className={styles.leftImage} />
					<input type='text' placeholder='Name' name='name' onChange={inputHandler} />
				</div>
				<div className={styles.inputDiv}>
					<img src={Email} alt='email' className={styles.leftImage} />
					<input type='email' placeholder='Email' name='email' onChange={inputHandler} />
				</div>
				<div className={styles.inputDiv}>
					<img src={Lock} alt='lock' className={styles.leftImage} />
					<input type={showPassword ? 'text' : 'password'} placeholder='Password' name='password' onChange={inputHandler} />
					{
						(showPassword)
							? (<img src={crosseye} alt='crosseye' className={styles.crosseye} onClick={eye1Handler} />)
							: (<img src={eye} alt='eye' className={styles.eye} onClick={eye1Handler} />)
					}
				</div>
				<div className={styles.inputDiv}>
					<img src={Lock} alt='lock' className={styles.leftImage} />
					<input type={showConfirmPassword ? 'text' : 'password'} placeholder='Confirm Password' name='confirmPassword' onChange={inputHandler} />
					{
						(showConfirmPassword)
							? (<img src={crosseye} alt='crosseye' className={styles.crosseye} onClick={eye2Handler} />)
							: (<img src={eye} alt='eye' className={styles.eye} onClick={eye2Handler} />)
					}
				</div>
				<div className={styles.buttonsDiv}>
					<button className={styles.registerBtn} onClick={registerHandler} disabled={loading}>
						{
							loading ? 'Registering...' : 'Register'
						}
					</button>
					<p className={styles.question}>Have an account ?</p>
					<button className={styles.loginBtn} onClick={loginHandler}>Log in</button>
				</div>
			</div>
		</div>
	)
}


export default Signup;
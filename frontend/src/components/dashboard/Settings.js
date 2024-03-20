import { useEffect, useState } from 'react';

import axios from 'axios';

import styles from './Settings.module.css'

import Profile from '../../assets/Profile.png';
import Lock from '../../assets/lock.png';
import eye from '../../assets/eye.png';
import crosseye from '../../assets/cross-eye.png';





export default function Settings() {
	const [name, setName] = useState('');

	const [obj, setObj] = useState({
		oldPassword: '',
		newPassword: ''
	});

	const [showOldPassword, setShowOldPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [loading, setLoading] = useState(false);


	const config = {
		headers: {
			authorization: JSON.parse(localStorage.getItem('token'))
		}
	}


	useEffect(() => {
		const getUser = async () => {
			try {
				const result = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/getUser`, config);
				const { userName } = result.data;

				setName(userName);
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
		}

		getUser();
	}, []);


	const nameHandler = (e) => {
		setName(e.target.value);
	}

	const passwordHandler = (e) => {
		setObj({
			...obj,
			[e.target.name]: e.target.value
		})
	}

	const eye1Handler = () => {
		setShowOldPassword(!showOldPassword);
	}

	const eye2Handler = () => {
		setShowNewPassword(!showNewPassword);
	}

	const updateHandler = async () => {
		try {
			if (obj.newPassword.trim().length !== 0) {
				if (obj.oldPassword.trim().length === 0) {
					alert('please fill the old password field');
					return;
				}
				else {
					setLoading(true);

					const result = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/user/updateUser`, {
						...obj,
						name
					}, config);
					alert('updated successfully');
				}
			}
			else {
				if (name.trim().length === 0) {
					alert('please fill all the fields');
					return;
				}
				else {
					setLoading(true);

					const result = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/user/updateUser`, {
						...obj,
						name
					}, config);
					alert('updated successfully');
				}
			}
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


	return (
		<div className={styles.container} >
			<div className={styles.main}>
				<p className={styles.settings}>Settings</p>
				<div>
					<div className={styles.inputDiv}>
						<img src={Profile} alt='email' className={styles.leftImage} />
						<input type='text' placeholder='Name' value={name} onChange={nameHandler} />
					</div>
					<div className={styles.inputDiv}>
						<img src={Lock} alt='lock' className={styles.leftImage} />
						<input type={showOldPassword ? 'text' : 'password'} placeholder='Old Password' name='oldPassword' value={obj.oldPassword} onChange={passwordHandler} />
						{
							(showOldPassword)
								? (<img src={crosseye} alt='crosseye' className={styles.crosseye} onClick={eye1Handler} />)
								: (<img src={eye} alt='eye' className={styles.eye} onClick={eye1Handler} />)
						}
					</div>
					<div className={styles.inputDiv}>
						<img src={Lock} alt='lock' className={styles.leftImage} />
						<input type={showNewPassword ? 'text' : 'password'} placeholder='New Password' name='newPassword' value={obj.newPassword} onChange={passwordHandler} />
						{
							(showNewPassword)
								? (<img src={crosseye} alt='crosseye' className={styles.crosseye} onClick={eye2Handler} />)
								: (<img src={eye} alt='eye' className={styles.eye} onClick={eye2Handler} />)
						}
					</div>
				</div>
				<div className={styles.buttonsDiv}>
					<button onClick={updateHandler} disabled={loading}>
						{
							loading ? 'Updating...' : 'Update'
						}
					</button>
				</div>
			</div>
		</div>
	)
}

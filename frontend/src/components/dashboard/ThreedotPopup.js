import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'

import styles from './ThreedotPopup.module.css'

import { DataContext } from '../../context/DataProvider';


export default function ThreedotPopup({ dotPopup, setDotPopup, taskId }) {
	const { setShowToast } = useContext(DataContext);

	const navigate = useNavigate();


	const editHandler = () => {
		navigate(`/edit/${taskId}`);
	}

	const shareHandler = async () => {
		const textToBeCopied = `${process.env.REACT_APP_FRONTEND_URL}/share/${taskId}`;

		try {
			await navigator.clipboard.writeText(textToBeCopied);

			setShowToast(true);
		}
		catch (err) {
			alert('text is not copied to clipboard . please try again.');
		}

		setDotPopup(false);
	}

	const deleteHandler = () => {
		navigate(`/delete/${taskId}`);
	}


	return (dotPopup)
		? (
			<div className={styles.container}>
				<p onClick={editHandler}>Edit</p>
				<p onClick={shareHandler}>Share</p>
				<p onClick={deleteHandler}>Delete</p>
			</div>
		)
		: null
}

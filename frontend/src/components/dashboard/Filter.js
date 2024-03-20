import styles from './Filter.module.css'



export default function Filter({ filter, setFilter, setFilterValue }) {

	const clickHandler = async (e) => {
		try {
			setFilterValue(e.target.dataset.name);
			setFilter(false);
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


	return filter ? (
		<div className={styles.container}>
			<p className={styles.ptag} data-name='Today' onClick={clickHandler}>Today</p>
			<p className={styles.ptag} data-name='This Week' onClick={clickHandler}>This Week</p>
			<p className={styles.ptag} data-name='This Month' onClick={clickHandler}>This Month</p>
		</div>
	) : null
}

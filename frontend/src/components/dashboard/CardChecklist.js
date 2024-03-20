import styles from './CardChecklist.module.css';

import Check from '../../assets/check.png';



const CardChecklist = ({ elem }) => {
    return (
        <div className={styles.container}>
            <div className={`${styles.checkDiv} ${elem.checked ? styles.statusChecked : styles.statusNotChecked}`}>
                <img src={Check} alt='check' />
            </div>
            <p>{elem.description}</p>
        </div>
    )
}

export default CardChecklist
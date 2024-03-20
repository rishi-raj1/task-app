import { useContext, useState } from 'react';

import { DataContext } from '../../context/DataProvider';

import styles from './Checklist.module.css';

import Check from '../../assets/check.png';
import Delete from '../../assets/Delete.png';



const Checklist = ({ index }) => {
    const { checklistArr, setChecklistArr } = useContext(DataContext);
    const [checklistValue, setChecklistValue] = useState('');
    const [checked, setChecked] = useState(false);

    const currentObj = checklistArr[index];

    const inputHandler = (e) => {
        setChecklistValue(e.target.value);

        const currentObj = { ...checklistArr[index] };
        currentObj.description = e.target.value;

        const newArr = [...checklistArr];
        newArr[index] = currentObj;

        setChecklistArr(newArr);
    }

    const checkHandler = () => {
        setChecked(!checked);

        const currentObj = { ...checklistArr[index] };
        currentObj.checked = !checked;

        const newArr = [...checklistArr];
        newArr[index] = currentObj;

        setChecklistArr(newArr);
    }

    const deleteHandler = () => {
        const newArr = checklistArr.filter((item, ind) => {
            return ind !== index;
        });

        setChecklistArr(newArr);
    }



    return (
        <div className={styles.container}>
            <div className={`${styles.checkDiv} ${currentObj.checked ? styles.statusChecked : styles.statusNotChecked}`} onClick={checkHandler}>
                <img src={Check} alt='check' />
            </div>
            <input type='text' onChange={inputHandler} value={currentObj.description} />
            <div className={styles.deleteDiv} onClick={deleteHandler}>
                <img src={Delete} alt='delete' />
            </div>
        </div>
    )
}

export default Checklist
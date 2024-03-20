import { useContext, useEffect } from 'react';


import styles from './Toast.module.css';


import cross from '../../assets/cross.png';

import { DataContext } from '../../context/DataProvider';





const Toast = () => {

    const { setShowToast } = useContext(DataContext);

    const crossHandler = () => {
        setShowToast(false);
    }



    useEffect(() => {
        const elem = document.getElementsByClassName(styles.lowerDiv)[0];

        const width = elem.offsetWidth;
        const decreaseByWidth = width / 100;


        const intervalId = setInterval(() => {
            const currentWidth = elem.offsetWidth;
            const newWidth = currentWidth - decreaseByWidth;

            elem.style.width = `${newWidth}px`;
        }, 65);


        const timeoutId = setTimeout(() => {
            clearInterval(intervalId);
            setShowToast(false);
        }, 5000);


        return () => {
            clearInterval(intervalId);
            clearTimeout(timeoutId);
        };

    }, [setShowToast]);

    return (
        <div className={styles.container}>
            <div className={styles.upperDiv}>
                <p>Link Copied</p>
                <img className={styles.cross} src={cross} alt='cross' width='10px' height='10px' onClick={crossHandler} />
            </div>
            <div className={styles.lowerDiv}>

            </div>
        </div>
    )
}

export default Toast
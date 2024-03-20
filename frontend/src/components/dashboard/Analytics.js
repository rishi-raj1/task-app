import { useEffect, useState } from 'react';

import axios from 'axios';

import styles from './Analytics.module.css';

import Dot from '../../assets/dot.png';


const Analytics = () => {
    const [countObj, setCountObj] = useState({
        BACKLOG: '00',
        'TO-DO': '00',
        PROGRESS: '00',
        DONE: '00',
        LOW: '00',
        MODERATE: '00',
        HIGH: '00',
        due: '00'
    });

    const config = {
        headers: {
            authorization: JSON.parse(localStorage.getItem('token'))
        }
    }



    useEffect(() => {
        const getCount = async () => {
            try {
                const result = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/task/countTasks`, config);
                const { obj } = result.data;

                let keys = Object.keys(obj);

                for (let i = 0; i < keys.length; i++) {
                    if (obj[keys[i]] < 9) {
                        obj[keys[i]] = '0' + obj[keys[i]];
                    }
                }

                setCountObj(obj);
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

        getCount();
    }, []);


    return (
        <div className={styles.container}>
            <p className={styles.heading}>Analytics</p>
            <div className={styles.countDetails}>
                <div className={styles.leftDiv}>
                    <div className={styles.line}>
                        <div className={styles.imageDiv}>
                            <img width='10px' height='10px' src={Dot} alt='dot' />
                            <p className={styles.category}>Backlogs Tasks</p>
                        </div>
                        <p className={styles.count}>{countObj['BACKLOG']}</p>
                    </div>
                    <div className={styles.line}>
                        <div className={styles.imageDiv}>
                            <img width='10px' height='10px' src={Dot} alt='dot' />
                            <p className={styles.category}>To-do Tasks</p>
                        </div>
                        <p className={styles.count}>{countObj['TO-DO']}</p>
                    </div>
                    <div className={styles.line}>
                        <div className={styles.imageDiv}>
                            <img width='10px' height='10px' src={Dot} alt='dot' />
                            <p className={styles.category}>In-Progress Tasks</p>
                        </div>
                        <p className={styles.count}>{countObj['PROGRESS']}</p>
                    </div>
                    <div className={styles.line}>
                        <div className={styles.imageDiv}>
                            <img width='10px' height='10px' src={Dot} alt='dot' />
                            <p className={styles.category}>Completed Tasks</p>
                        </div>
                        <p className={styles.count}>{countObj['DONE']}</p>
                    </div>
                </div>
                <div className={styles.rightDiv}>
                    <div className={styles.line}>
                        <div className={styles.imageDiv}>
                            <img width='10px' height='10px' src={Dot} alt='dot' />
                            <p className={styles.category}>Low Priority</p>
                        </div>
                        <p className={styles.count}>{countObj['LOW']}</p>
                    </div>
                    <div className={styles.line}>
                        <div className={styles.imageDiv}>
                            <img width='10px' height='10px' src={Dot} alt='dot' />
                            <p className={styles.category}>Moderate Priority</p>
                        </div>
                        <p className={styles.count}>{countObj['MODERATE']}</p>
                    </div>
                    <div className={styles.line}>
                        <div className={styles.imageDiv}>
                            <img width='10px' height='10px' src={Dot} alt='dot' />
                            <p className={styles.category}>High Priority</p>
                        </div>
                        <p className={styles.count}>{countObj['HIGH']}</p>
                    </div>
                    <div className={styles.line}>
                        <div className={styles.imageDiv}>
                            <img width='10px' height='10px' src={Dot} alt='dot' />
                            <p className={styles.category}>Due Date Tasks</p>
                        </div>
                        <p className={styles.count}>{countObj.due}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Analytics
import { useEffect, useState } from 'react';

import axios from 'axios';

import styles from './ShareCard.module.css';


import Promanage from '../../assets/pro.png';
import Reddot from '../../assets/reddot.png';
import Bluedot from '../../assets/bluedot.png';
import Greendot from '../../assets/greendot.png';
import CardChecklist from './CardChecklist';
import { useParams } from 'react-router-dom';



const ShareCard = () => {

    const [taskObj, setTaskObj] = useState({
        category: '',
        priority: '',
        title: '',
        dueDate: '',
        checklistArr: []
    });

    const [notFound, setNotFound] = useState(false);


    const config = {
        headers: {
            authorization: JSON.parse(localStorage.getItem('token'))
        }
    }

    const params = useParams();
    const { taskId } = params;


    let totalChecked = 0;
    const totalItem = taskObj.checklistArr.length;

    for (let i = 0; i < totalItem; i++) {
        if (taskObj.checklistArr[i].checked) {
            totalChecked++;
        }
    }


    let dueDate = taskObj.dueDate ? new Date(taskObj.dueDate) : null;


    let dateObj = taskObj.dueDate;
    let date, month;

    if (dateObj) {
        dateObj = new Date(dateObj);

        date = dateObj.getDate();
        month = dateObj.toLocaleString('default', { month: 'short' });
    }

    const suffixes = ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"];

    // If the date is between 11 and 13, "th" will be the suffix
    const suffixIndex = date > 10 && date < 14 ? 0 : date % 10;



    useEffect(() => {
        const getTask = async () => {
            try {
                const result = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/task/getTask/${taskId}`, config);
                const { task } = result.data;
                setTaskObj(task);
            }
            catch (err) {
                if (err.response) {
                    if (err.response.status === 404) {
                        setNotFound(true);
                    }
                    else {
                        alert(err.response.data.message);
                    }
                }
                else if (err.request) {
                    alert(err.request);
                }
                else {
                    alert(err.message);
                }
            }
        }

        getTask();
    }, []);




    return (!notFound)
        ? (
            <div className={styles.container}>
                <div style={{ display: 'flex' }}>
                    <img width='25px' height='25px' src={Promanage} alt='promanage' className={styles.promanageImg} />
                    <p className={styles.promanagePara}>Pro Manage</p>
                </div>
                <div className={styles.parentCenteredDiv}>
                    <div className={styles.centeredDiv}>
                        <div className={styles.cardHeading}>
                            <div className={styles.leftDiv}>
                                {
                                    taskObj.priority === 'LOW' ? (
                                        <>
                                            <img src={Greendot} alt='greendot' />
                                            <p>LOW PRIORITY</p>
                                        </>
                                    ) :
                                        taskObj.priority === 'MODERATE' ? (
                                            <>
                                                <img src={Bluedot} alt='bluedot' />
                                                <p>MODERATE PRIORITY</p>
                                            </>
                                        ) : (
                                            <>
                                                <img src={Reddot} alt='reddot' />
                                                <p>HIGH PRIORITY</p>
                                            </>
                                        )
                                }
                            </div>
                        </div>
                        <div className={styles.titleDiv}>
                            <p className={styles.cardTitle}>{taskObj.title}</p>
                        </div>
                        <div className={styles.checklistDiv}>
                            <div className={styles.paraDiv}>
                                <p style={{ marginRight: '5px' }}>Checklist</p>
                                <p>{`(${totalChecked}/${totalItem})`}</p>
                            </div>
                        </div>
                        <div className={styles.allChecklists}>
                            {
                                taskObj.checklistArr.map((elem, index) => (<CardChecklist key={index} elem={elem} />))
                            }
                        </div>
                        {
                            dueDate ?
                                (
                                    <div className={styles.lastDiv}>
                                        <span>Due Date</span>
                                        <div className={styles.dateDiv}>
                                            {dateObj ? `${month} ${date}${suffixes[suffixIndex]}` : ''}
                                        </div>
                                    </div>
                                )
                                : <></>
                        }
                    </div>
                </div>
            </div>
        )
        : (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                height: '100%'
            }}>
                <h1>Error: 404 </h1>
                <h2>Page Not Found</h2>
            </div>
        )
}

export default ShareCard;
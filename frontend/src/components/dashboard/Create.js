import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';

import { DataContext } from '../../context/DataProvider';

import styles from './Create.module.css';

import Greendot from '../../assets/greendot.png';
import Reddot from '../../assets/reddot.png';
import Bluedot from '../../assets/bluedot.png';

import Checklist from './Checklist';


const Create = () => {
    const { checklistArr, setChecklistArr } = useContext(DataContext);

    const [taskObj, setTaskObj] = useState({
        title: '',
        priority: '',
        dueDate: null,
        category: 'TO-DO'
    });

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();

    const { taskId } = params;
    const path = location.pathname;
    const edit = path.includes('/edit');

    const config = {
        headers: {
            authorization: JSON.parse(localStorage.getItem('token'))
        }
    }

    const checklistObj = {
        checked: false,
        description: ''
    }


    let totalChecked = 0;
    const totalItem = checklistArr.length;

    for (let i = 0; i < totalItem; i++) {
        if (checklistArr[i].checked) {
            totalChecked++;
        }
    }

    useEffect(() => {
        const getTask = async () => {
            try {
                const result = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/task/getTask/${taskId}`, config);
                setTaskObj(result.data.task);
                setChecklistArr(result.data.task.checklistArr);
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

        edit && getTask();
    }, []);


    const titleHandler = (e) => {
        setTaskObj({
            ...taskObj,
            title: e.target.value
        })
    }


    const priorityHandler = (e) => {
        setTaskObj({
            ...taskObj,
            priority: e.currentTarget.dataset.value
        })
    }


    const addNewHandler = () => {
        const newArr = [...checklistArr, checklistObj];
        setChecklistArr(newArr);
    }

    const dateHandler = (e) => {
        setTaskObj({
            ...taskObj,
            dueDate: e.target.value ? e.target.value : null
        })
    }

    const cancelHandler = () => {
        setChecklistArr([]);
        navigate('/dashboard');
    }

    const saveHandler = async () => {
        try {
            if (taskObj.title.trim().length === 0) {
                alert('please fill the title field');
                return;
            }
            if (taskObj.priority.length === 0) {
                alert('please select priority');
                return;
            }
            if (checklistArr.length === 0) {
                alert('please create atleast one checklist');
                return;
            }
            else {
                const len = checklistArr.length;

                for (let i = 0; i < len; i++) {
                    if (checklistArr[i].description.trim().length === 0) {
                        alert(`please fill the checklist number ${i + 1}`);
                        return;
                    }
                }
            }

            if (taskObj.dueDate) {
                const todayDateObj = new Date();
                const dueDateObj = new Date(taskObj.dueDate);

                todayDateObj.setHours(0, 0, 0, 0);

                if (dueDateObj.getTime() < todayDateObj.getTime()) {
                    alert('Please change date. You cannot choose the past date.')
                    return;
                }
            }

            setLoading(true);

            if (edit) {
                const result = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/task/update/${taskId}`, {
                    ...taskObj,
                    checklistArr
                }, config);
            }
            else {
                const result = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/task/create`, {
                    ...taskObj,
                    checklistArr
                }, config);
            }

            setChecklistArr([]);
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




    return (
        <div className={styles.container}>
            <div className={styles.centeredDiv}>
                <div className={styles.inputDiv}>
                    <p className={styles.titlePara}>Title <span style={{ color: '#FF0000' }}>*</span></p>
                    <input placeholder='Enter Task Title' className={styles.titleInput} value={taskObj.title} onChange={titleHandler} />
                </div>
                <div className={styles.secondDiv}>
                    <p className={styles.priorityPara}>Select Priority <span style={{ color: '#FF0000' }}>*</span> </p>
                    <div className={styles.priorityDiv}>
                        <div className={`${styles.priorityItem} ${taskObj.priority === 'HIGH' ? styles.selected : ''}`} data-value='HIGH' onClick={priorityHandler}>
                            <img width='10px' height='10px' src={Reddot} alt='reddot' />
                            <p>HIGH PRIORITY</p>
                        </div>
                        <div className={`${styles.priorityItem} ${taskObj.priority === 'MODERATE' ? styles.selected : ''}`} data-value='MODERATE' onClick={priorityHandler}>
                            <img width='10px' height='10px' src={Bluedot} alt='bluedot' />
                            <p>MODERATE PRIORITY</p>
                        </div>
                        <div className={`${styles.priorityItem} ${taskObj.priority === 'LOW' ? styles.selected : ''}`} style={{ marginRight: '0' }} data-value='LOW' onClick={priorityHandler}>
                            <img width='10px' height='10px' src={Greendot} alt='greendot' />
                            <p>LOW PRIORITY</p>
                        </div>
                    </div>
                </div>
                <div className={styles.checklistDiv}>
                    <p className={styles.checklistPara}>Checklist({`${totalChecked} / ${totalItem}`}) <span style={{ color: '#FF0000' }}>*</span></p>
                </div>
                <div className={styles.fixDiv}>
                    <div className={styles.flexibleDiv}>
                        {
                            checklistArr.map((item, index) => (
                                <Checklist key={index} index={index} />
                            ))
                        }
                    </div>
                    <div className={styles.addNewDiv} onClick={addNewHandler}>
                        <span>+</span><p>Add New</p>
                    </div>
                </div>

                <div className={styles.buttonsDiv}>
                    <div className={styles.dateBtn} >
                        <input type='date' style={{ width: '100%', height: '100%', outline: 'none', border: 'none', cursor: 'pointer' }} onChange={dateHandler} />
                    </div>
                    <div>
                        <button className={styles.cancelBtn} onClick={cancelHandler}>Cancel</button>
                        <button className={styles.saveBtn} onClick={saveHandler} disabled={loading}>
                            {
                                loading
                                    ? 'Processing...'
                                    : edit
                                        ? 'Edit'
                                        : 'Save'
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Create
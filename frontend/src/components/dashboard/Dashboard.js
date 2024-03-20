import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import styles from './Dashboard.module.css';

import Copy from '../../assets/Copy.png';
import DownArrow from '../../assets/downarrow.png';

import { DataContext } from '../../context/DataProvider';

import Card from './Card';
import Filter from './Filter';
import Toast from './Toast';



const Dashboard = () => {

    const { cardsArr, setCardsArr, showToast } = useContext(DataContext);

    const [clickedIcon, setClickedIcon] = useState('');
    const [filter, setFilter] = useState(false);
    const [filterValue, setFilterValue] = useState('This Week');
    const [name, setName] = useState('');

    const navigate = useNavigate();

    const dateObj = new Date();
    const date = dateObj.getDate();
    const month = dateObj.toLocaleString('default', { month: 'short' });
    const year = dateObj.getFullYear();

    const suffixes = ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"];

    // If the date is between 11 and 13, "th" will be the suffix
    const suffixIndex = date > 10 && date < 14 ? 0 : date % 10;

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


    useEffect(() => {
        const getAllTasks = async () => {
            const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/task/filterTasks`, { filterValue }, config);
            setCardsArr(data.cardsArr);
        }

        getAllTasks();
    }, [filterValue]);



    const collapseHandler = (e) => {
        setClickedIcon(e.target.dataset.name);
    }

    const plusHandler = () => {
        navigate('/create');
    }


    return (
        <div className={styles.container}>
            <div className={styles.headingDiv}>
                <div className={styles.welcomeDiv} >
                    <p style={{ fontWeight: '600', fontSize: '15px' }}>Welcome, {name}</p>
                    <p style={{ color: '#707070', marginTop: '10px' }}>{`${date}${suffixes[suffixIndex]} ${month}, ${year}`}</p>
                </div>
                {
                    showToast
                        ? (
                            <div className={styles.toastDiv}>
                                <Toast />
                            </div>
                        )
                        : (<></>)
                }
                <div className={styles.boardDiv}>
                    <p style={{ fontWeight: '500', fontSize: '22px' }}>Board</p>
                    <div className={styles.weekDiv}>
                        <Filter filter={filter} setFilter={setFilter} setFilterValue={setFilterValue} />
                        <p>{filterValue}</p>
                        <img src={DownArrow} alt='downarrow' onClick={() => setFilter(!filter)} />
                    </div>
                </div>
            </div>
            <div className={styles.allCategory}>
                <div className={styles.categoryDiv}>
                    <div className={styles.categoryHeading}>
                        <p>Backlog</p>
                        <img src={Copy} alt='copy' data-name='BACKLOG' onClick={collapseHandler} />
                    </div>
                    <div className={styles.cardsDiv}>
                        {
                            cardsArr.map((item, ind) => {
                                return item.category === 'BACKLOG'
                                    ?
                                    (<Card key={ind} item={item} index={ind} clickedIcon={clickedIcon} setClickedIcon={setClickedIcon} />)
                                    : null
                            }
                            )
                        }
                    </div>
                </div>
                <div className={styles.categoryDiv}>
                    <div className={styles.categoryHeading} style={{ marginTop: '-5px' }}>
                        <p>To do</p>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span style={{ fontSize: '25px', marginRight: '15px', cursor: 'pointer' }} onClick={plusHandler}>+</span>
                            <img src={Copy} alt='copy' data-name='TO-DO' onClick={collapseHandler} />
                        </div>
                    </div>
                    <div className={styles.cardsDiv}>
                        {
                            cardsArr.map((item, ind) => {
                                return item.category === 'TO-DO'
                                    ?
                                    (<Card key={ind} item={item} index={ind} clickedIcon={clickedIcon} setClickedIcon={setClickedIcon} />)
                                    : null
                            }
                            )
                        }
                    </div>
                </div>
                <div className={styles.categoryDiv}>
                    <div className={styles.categoryHeading}>
                        <p>In progress</p>
                        <img src={Copy} alt='copy' data-name='PROGRESS' onClick={collapseHandler} />
                    </div>
                    <div className={styles.cardsDiv}>
                        {
                            cardsArr.map((item, ind) => {
                                return item.category === 'PROGRESS'
                                    ?
                                    (<Card key={ind} item={item} index={ind} clickedIcon={clickedIcon} setClickedIcon={setClickedIcon} />)
                                    : null
                            }
                            )
                        }
                    </div>
                </div>
                <div className={styles.categoryDiv}>
                    <div className={styles.categoryHeading}>
                        <p>Done</p>
                        <img src={Copy} alt='copy' data-name='DONE' onClick={collapseHandler} />
                    </div>
                    <div className={styles.cardsDiv}>
                        {
                            cardsArr.map((item, ind) => {
                                return item.category === 'DONE'
                                    ?
                                    (<Card key={ind} item={item} index={ind} clickedIcon={clickedIcon} setClickedIcon={setClickedIcon} />)
                                    : null
                            }
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
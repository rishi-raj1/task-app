import { useContext, useEffect, useState } from 'react';

import axios from 'axios';

import styles from './Card.module.css';

import { DataContext } from '../../context/DataProvider';

import Reddot from '../../assets/reddot.png';
import Bluedot from '../../assets/bluedot.png';
import Greendot from '../../assets/greendot.png';
import Threedots from '../../assets/threedots.png';
import Downarrow from '../../assets/downarrow.png';
import Uparrow from '../../assets/uparrow.png';
import CardChecklist from './CardChecklist';
import ThreedotPopup from './ThreedotPopup';



const Card = ({ item, index, clickedIcon, setClickedIcon }) => {
    const { cardsArr, setCardsArr } = useContext(DataContext);

    const categoryArr = ['BACKLOG', 'TO-DO', 'PROGRESS', 'DONE'];
    const [collapse, setCollapse] = useState(true);
    const [dotPopup, setDotPopup] = useState(false);

    let arr = [...item.checklistArr];


    if (collapse) {
        arr = [arr[0]];
    }


    let dateObj = item.dueDate;
    let date, month;

    if (dateObj) {
        dateObj = new Date(dateObj);

        date = dateObj.getDate();
        month = dateObj.toLocaleString('default', { month: 'short' });
    }

    const suffixes = ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"];

    // If the date is between 11 and 13, "th" will be the suffix
    const suffixIndex = date > 10 && date < 14 ? 0 : date % 10;

    const config = {
        headers: {
            authorization: JSON.parse(localStorage.getItem('token'))
        }
    }


    let totalChecked = 0;
    const totalItem = item.checklistArr.length;

    for (let i = 0; i < totalItem; i++) {
        if (item.checklistArr[i].checked) {
            totalChecked++;
        }
    }


    const todayDate = new Date();
    let dueDate = item.dueDate ? new Date(item.dueDate) : null;




    useEffect(() => {
        const fullTitle = document.getElementById(`fullTitle${index}`);
        const cardTitle = document.getElementById(`cardTitle${index}`);

        cardTitle.addEventListener('mouseover', () => {
            fullTitle.style.display = 'block';
        });

        cardTitle.addEventListener('mouseout', () => {
            fullTitle.style.display = 'none';
        })
    }, []);


    useEffect(() => {
        if (clickedIcon === item.category) {
            setCollapse(true);
        }
    }, [clickedIcon]);



    const threedotHandler = () => {
        setDotPopup(!dotPopup);
    }

    const collapseHandler = () => {
        setCollapse(!collapse);
        setClickedIcon('cardCollapse');
    }

    const chipsHandler = async (e) => {
        try {
            let newArr = [...cardsArr];
            const currentObj = newArr[index];
            currentObj.category = e.target.dataset.name;
            newArr[index] = currentObj;

            await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/task/update/${item._id}`, {
                ...item,
                category: e.target.dataset.name
            }, config);

            setCardsArr(newArr);
        }
        catch (err) {
            if (err.response) {
                alert(err.response.data.message)
            }
            else if (err.request) {
                alert(err.request);
            }
            else {
                alert(err.message);
            }
        }
    }



    return (
        <div className={styles.container}>
            <div className={styles.cardHeading}>
                <div className={styles.leftDiv}>
                    {
                        item.priority === 'LOW' ? (
                            <>
                                <img src={Greendot} alt='greendot' />
                                <p>LOW PRIORITY</p>
                            </>
                        ) :
                            item.priority === 'MODERATE' ? (
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
                <div className={styles.rightDiv} >
                    <ThreedotPopup dotPopup={dotPopup} setDotPopup={setDotPopup} taskId={item._id} />
                    <img src={Threedots} alt='threedots' onClick={threedotHandler} />
                </div>
            </div>
            <div className={styles.titleDiv}>
                <p className={styles.fullTitle} id={`fullTitle${index}`}>{item.title}</p>
                <p className={styles.cardTitle} id={`cardTitle${index}`}>{item.title}</p>
            </div>
            <div className={styles.checklistDiv}>
                <div className={styles.paraDiv}>
                    <p style={{ marginRight: '5px' }}>Checklist</p>
                    <p>{`(${totalChecked}/${totalItem})`}</p>
                </div>
                <div className={styles.arrowDiv} onClick={collapseHandler}>
                    {
                        collapse ? (<img src={Downarrow} alt='downarrow' />) : (<img src={Uparrow} alt='uparrow' />)
                    }
                </div>
            </div>
            <div className={styles.allChecklists}>
                {
                    arr.map((elem, index) => (<CardChecklist key={index} elem={elem} />))
                }
            </div>
            <div className={styles.lastDiv}>
                <div className={styles.dateDiv}
                    style={{
                        backgroundColor: (item.category === 'DONE')
                            ? '#63C05B'
                            : (dueDate)
                                ? (dueDate.getTime() < todayDate.getTime())
                                    ? '#CF3636'
                                    : '#DBDBDB'
                                : '#DBDBDB'
                        ,
                        color: (item.category === 'DONE')
                            ? '#FFFFFF'
                            : (dueDate)
                                ? (dueDate.getTime() < todayDate.getTime())
                                    ? '#FFFFFF'
                                    : '#5A5A5A'
                                : '#5A5A5A'
                    }}>
                    {dateObj ? `${month} ${date}${suffixes[suffixIndex]}` : ''}
                </div>
                <div className={styles.allChips}>
                    {
                        categoryArr.filter((item1, ind) => item1 !== item.category).map((item1, ind) => (
                            <div key={ind} className={styles.chips} data-name={item1} onClick={chipsHandler}>{item1}</div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Card
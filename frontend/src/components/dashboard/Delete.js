import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';

import styles from './Delete.module.css';
import { useState } from 'react';


const Delete = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { taskId } = params;

    const [loading, setLoading] = useState(false);


    const config = {
        headers: {
            authorization: JSON.parse(localStorage.getItem('token'))
        }
    }

    const deleteHandler = async () => {
        try {
            setLoading(true);

            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/task/delete/${taskId}`, config)
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
    }

    const cancelHandler = () => {
        navigate('/dashboard');
    }



    return (
        <div className={styles.container}>
            <div className={styles.centeredDiv}>
                <p>Are you sure you want to Delete?</p>
                <button className={styles.deleteBtn} onClick={deleteHandler} disabled={loading}>
                    {
                        loading ? 'Deleting...' : 'Yes, Delete'
                    }
                </button>
                <button className={styles.cancelBtn} onClick={cancelHandler}>Cancel</button>
            </div>
        </div>
    )
}

export default Delete
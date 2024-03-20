import styles from './DashboardPage.module.css';

import Dashboard from '../components/dashboard/Dashboard'
import Navbar from '../components/navbar/Navbar'


const DashboardPage = () => {
    return (
        <div className={styles.container}>
            <Navbar />
            <Dashboard />
        </div>
    )
}

export default DashboardPage
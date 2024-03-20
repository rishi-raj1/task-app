import styles from './AnalyticsPage.module.css';

import Navbar from '../components/navbar/Navbar'
import Analytics from '../components/dashboard/Analytics';



const DashboardPage = () => {
    return (
        <div className={styles.container}>
            <Navbar />
            <Analytics />
        </div>
    )
}

export default DashboardPage
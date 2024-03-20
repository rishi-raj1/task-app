import styles from './SettingsPage.module.css';

import Settings from '../components/dashboard/Settings'
import Navbar from '../components/navbar/Navbar'


const DashboardPage = () => {
    return (
        <div className={styles.container}>
            <Navbar />
            <Settings />
        </div>
    )
}

export default DashboardPage
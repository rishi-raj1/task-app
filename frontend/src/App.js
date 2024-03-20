import './App.css';

import { BrowserRouter, Route, Routes, Outlet, Navigate } from 'react-router-dom'

import DataProvider from './context/DataProvider';

import Create from './components/dashboard/Create';
import DashboardPage from './pages/DashboardPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';
import DeletePage from './pages/DeletePage';
import RegisterPage from './pages/RegisterPage';
import Logout from './components/dashboard/Logout';
import SharePage from './pages/SharePage';



function App() {
	const PrivateRoute = () => {
		const isAuthenticated = localStorage.getItem('token');

		return (isAuthenticated)
			? (
				<>
					<Outlet />
				</>
			)
			: (<Navigate replace to='/' />)
	}


	return (
		<BrowserRouter>
			<DataProvider>
				<div className="App">
					<Routes>
						<Route path='/' element={<RegisterPage />} />

						<Route path='/dashboard' element={<PrivateRoute />}>
							<Route path='/dashboard' element={<DashboardPage />} />
						</Route>
						<Route path='/analytics' element={<PrivateRoute />}>
							<Route path='/analytics' element={<AnalyticsPage />} />
						</Route>
						<Route path='/settings' element={<PrivateRoute />}>
							<Route path='/settings' element={<SettingsPage />} />
						</Route>
						<Route path='/create' element={<PrivateRoute />}>
							<Route path='/create' element={<Create />} />
						</Route>
						<Route path='/edit/:taskId' element={<PrivateRoute />}>
							<Route path='/edit/:taskId' element={<Create />} />
						</Route>
						<Route path='/delete/:taskId' element={<PrivateRoute />}>
							<Route path='/delete/:taskId' element={<DeletePage />} />
						</Route>
						<Route path='/logout' element={<PrivateRoute />}>
							<Route path='/logout' element={<Logout />} />
						</Route>

						<Route path='/share/:taskId' element={<SharePage />} />
					</Routes>
				</div>
			</DataProvider>
		</BrowserRouter>
	);
}

export default App;

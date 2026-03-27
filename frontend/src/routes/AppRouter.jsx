import { Routes, Route } from 'react-router'; 
import SearchPage from '../pages/SearchPage/SearchPage.jsx';

function AppRouter() {
	return (
		<Routes>
			<Route path="/" element={<SearchPage />}/>
		</Routes>
	)
}; 

export default AppRouter;
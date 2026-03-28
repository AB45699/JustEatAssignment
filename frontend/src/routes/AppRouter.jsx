import { Routes, Route } from 'react-router'; 
import SearchPage from '../pages/SearchPage/SearchPage.jsx';
import ResultsPage from '../pages/ResultsPage/ResultsPage.jsx';
import ErrorPage from '../pages/ErrorPage/ErrorPage.jsx';

function AppRouter() {
	return (
		<Routes>
			<Route path="*" element={<ErrorPage />}/>
			<Route path="/" element={<SearchPage />}/>
			<Route path="/area/:postcode" element={<ResultsPage />}/>
		</Routes>
	)
}; 

export default AppRouter;
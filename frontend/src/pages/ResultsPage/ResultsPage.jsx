import RestaurantsGrid from "../../components/RestaurantsGrid/RestaurantsGrid.jsx";
import Header from "../../components/Header/Header.jsx";
import CroppedLogo from "../../assets/images/just-eat-logo-cropped.png"; 
import PostcodeInput from '../../components/PostcodeInput/PostcodeInput.jsx';
import './ResultsPage.css';

function ResultsPage() {
	return (
		<div className="results-page">
			<div className="results-page__header-container">
				<Header logo={CroppedLogo}/>
				<PostcodeInput areHeadingsHidden={true}/>
			</div>
			<RestaurantsGrid />
		</div>
	)
}; 

export default ResultsPage;
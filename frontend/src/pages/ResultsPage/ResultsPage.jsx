import RestaurantsGrid from "../../components/RestaurantsGrid/RestaurantsGrid";
import Header from "../../components/Header/Header";
import CroppedLogo from "../../assets/images/just-eat-logo-cropped.png"; 
import PostcodeInput from '../../components/PostcodeInput/PostcodeInput.jsx';
import './ResultsPage.css';

function ResultsPage() {
	return (
		<div className="results-page">
			<div className="header-container">
				<Header logo={CroppedLogo}/>
				<PostcodeInput areHeadingsHidden={true}/>
			</div>
			<RestaurantsGrid />
		</div>
	)
}; 

export default ResultsPage;
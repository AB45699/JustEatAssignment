import RestaurantsGrid from "../../components/RestaurantsGrid/RestaurantsGrid";
import Header from "../../components/Header/Header";
import CroppedLogo from "../../assets/images/just-eat-logo-cropped.png"; 

function ResultsPage() {
	return (
		<div className="results-page">
			<Header logo={CroppedLogo}/>
			<RestaurantsGrid />
		</div>
	)
}; 

export default ResultsPage;
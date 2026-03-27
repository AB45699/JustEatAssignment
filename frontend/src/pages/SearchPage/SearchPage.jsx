import PostcodeInput from '../../components/PostcodeInput/PostcodeInput.jsx';
import Header from '../../components/Header/Header.jsx';
import Logo from '../../assets/images/just-eat-logo.png';
import './SearchPage.css'; 

function SearchPage() {
	return (
		<div className="search-page">
			<Header logo={Logo}/>
			<PostcodeInput areHeadingsHidden={false}/>
		</div>
	)
};

export default SearchPage;
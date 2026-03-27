import { useState } from 'react';
import validatePostcode from '../../utils/validatePostcode.js';
import { useNavigate, useParams } from 'react-router';
import './PostcodeInput.css'; 

function PostcodeInput({areHeadingsHidden}) {
	const { postcode } = useParams();
	const [postcodeInput, setPostcodeInput] = useState(postcode || "");
	const [inputError, setInputError] = useState(null);
	const navigate = useNavigate();

	const handleChange = (e) => {
		setPostcodeInput(e.target.value);
	}; 

	const onSubmit = () => {
		if (!validatePostcode(postcodeInput)) {
			setInputError("Please enter a valid UK postcode, e.g. EC4M 7RF")
		} else {
			setInputError(null);
			const postcodeToSearch = postcodeInput.replaceAll(" ", "");
			navigate(`/area/${postcodeToSearch}`); 
		}; 
	}; 

return (
    <div className="form">
		{!areHeadingsHidden && 
			<>
        		<h1 className="form__title">Order a takeaway</h1>
        		<h2 className="form__subtitle">Find restaurants delivering near you...</h2>
			</>}
            <div className="form__postcode-input-container">
               <label htmlFor="postcode-input" className="form__label"> Search for a postcode: </label>
               <input
                   id = "postcode-input"
                   type="text"
                   className= {`form__postcode-input ${inputError ? "form__postcode-input--error" : ""}`}
                   placeholder = "Enter postcode"
				   value={postcodeInput}
				   onChange={handleChange}
                />
                <button type="button" className="form__search-button" onClick={onSubmit}>Search</button>
				
				{inputError && 
				<div className="form__error">
					<p className="form__error-text">{inputError}</p>
				</div>}
            </div>
    </div>
)
}; 

export default PostcodeInput;
import './PostcodeInput.css'; 

function PostcodeInput() {
return (
    <div className="form">
        <h1 className="form__title">Order a takeaway</h1>
        <h2 className="form__subtitle">Find restaurants delivering near you...</h2>
            <div className="form__postcode-input-container">
               <label htmlFor="postcode-input" className="form__label"> Search for a postcode: </label>
               <input
                   id = "postcode-input"
                   type="text"
                   className="form__postcode-input"
                   placeholder = "Enter postcode"
                />
                <button type="button" className="form__search-button">Search</button>
            </div>
    </div>
)
}; 

export default PostcodeInput;
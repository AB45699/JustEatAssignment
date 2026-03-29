import { MemoryRouter, Route, Routes } from "react-router";
import Header from "./Header.jsx";
import { render, screen } from '@testing-library/react';
import  userEvent from '@testing-library/user-event';

describe("Header", ()=>{
	it("renders the image passed in via props", ()=>{
		render (
			<MemoryRouter>
				<Header logo={'http://localhost:3000/assets/test-image.jpg'}/>
			</MemoryRouter>)

		const logoImage = screen.getByAltText("company logo");
		expect(logoImage.src).toContain("http://localhost:3000/assets/test-image.jpg");
	}); 
	it("navigates to the home page when the logo is clicked", async ()=>{
		const user = userEvent.setup();
		const homePageText = "Mock home page"; 

		render (
			<MemoryRouter initialEntries={["/area/EC4M7RF"]}> 
				<Routes>
					<Route path="/" element={<p>Mock home page</p>}/>
					<Route path="/area/EC4M7RF" element={<Header logo={"http://localhost:3000/assets/test-image.jpg"}/>}/>
				</Routes>
			</MemoryRouter>)
		
		expect(screen.queryByText(homePageText)).not.toBeInTheDocument();

		const logoImage = screen.getByAltText("company logo");
		await user.click(logoImage);

		expect(screen.getByText(homePageText)).toBeInTheDocument();
	});
})
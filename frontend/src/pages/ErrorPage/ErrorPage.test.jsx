import ErrorPage from "./ErrorPage.jsx";
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from "react-router";
import userEvent from "@testing-library/user-event";

describe("Error page", ()=>{
	it("renders the error page title and link text", ()=>{
		render(
			<MemoryRouter>
		<ErrorPage />
		</MemoryRouter>
	);

		expect(screen.getByRole("heading", {name: "Page not found!"})).toBeInTheDocument();
		expect(screen.getByText(/search page/)).toBeInTheDocument();
	}); 
	it("returns user to search page when link is clicked", async ()=>{
		const user = userEvent.setup();

		render(
			<MemoryRouter initialEntries={["/invalid/path"]}>
				<Routes>
					<Route path="/" element={<p>Mock search page</p>}/>
					<Route path="*" element={<ErrorPage />}/>
				</Routes>
			</MemoryRouter>);

		expect(screen.getByRole("heading", {name: "Page not found!"})).toBeInTheDocument();
		expect(screen.queryByText("Mock search page")).not.toBeInTheDocument();

		await user.click(screen.getByText(/search page/));
		expect(screen.queryByRole("heading", {name: "Page not found!"})).not.toBeInTheDocument();
		expect(screen.getByText("Mock search page")).toBeInTheDocument();
	}); 
}); 
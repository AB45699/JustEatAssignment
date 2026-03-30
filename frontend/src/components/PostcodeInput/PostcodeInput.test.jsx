import { render, screen } from '@testing-library/react'; 
import PostcodeInput from './PostcodeInput.jsx';
import { MemoryRouter, useNavigate, useParams } from 'react-router';
import userEvent  from '@testing-library/user-event';

vi.mock('react-router', async()=>{
	const actual = await vi.importActual('react-router')
	return {
		...actual, 
		useNavigate: vi.fn(), 
		useParams: vi.fn()
	};
}); 

const errorMessageText = /enter a valid/;
let renderComponent, mockNavigate; 

beforeEach(()=>{
	renderComponent = (areHeadingsHidden) => {
		render(
			<MemoryRouter>
				<PostcodeInput areHeadingsHidden={areHeadingsHidden}/>
			</MemoryRouter>);

		return {
			postcodeInput: screen.getByLabelText(/postcode/),
			searchButton: screen.getByRole("button", {name: "Search"})
		}
	};

	mockNavigate = vi.fn();

	useNavigate.mockReturnValue(mockNavigate);
	useParams.mockReturnValue({});
});  

afterEach(()=>{
	vi.clearAllMocks();
});

describe("PostcodeInput", ()=>{
	describe("Rendering tests", ()=>{
		it("renders the form on load when areHeadingsHidden is false", ()=>{
			const { postcodeInput, searchButton } = renderComponent(false);

			const title = screen.getByRole("heading", {name: /takeaway/}); 
			const subtitle = screen.getByRole("heading", {name: /restaurants/}); 
			const elements = [title, subtitle, postcodeInput, searchButton];

			elements.forEach((element)=>{
				expect(element).toBeInTheDocument();
			});
		});
		it("renders the form on load when areHeadingsHidden is true", ()=>{
			const { postcodeInput, searchButton } = renderComponent(true);

			const title = screen.queryByRole("heading", {name: /takeaway/}); 
			const subtitle = screen.queryByRole("heading", {name: /restaurants/}); 
			
			expect(title).not.toBeInTheDocument();
			expect(subtitle).not.toBeInTheDocument(); 
			expect(postcodeInput).toBeInTheDocument();
			expect(searchButton).toBeInTheDocument();
		}); 
	});
	describe("Input behaviour", ()=>{
		it("updates the input's value when user types", async ()=>{
			const user = userEvent.setup();
			const { postcodeInput } = renderComponent(false);  

			await user.type(postcodeInput, "EC4M7RF");
			expect(postcodeInput).toHaveValue("EC4M7RF");
		}); 
		it("the input element has a value of the postcode parameter if defined", ()=>{
			useParams.mockReturnValue({postcode: "EC4M7RF"});
			const { postcodeInput } = renderComponent(false);

			expect(postcodeInput).toHaveValue("EC4M7RF");
		});
		it("the input element has a value of empty string if the postcode parameter is undefined", ()=>{
			const { postcodeInput } = renderComponent(false);
		
			expect(postcodeInput).toHaveValue("");
		});
	});
	describe("Form submission", ()=>{

		let user, postcodeInput, searchButton;

		beforeEach(()=>{
			user = userEvent.setup();
			({ postcodeInput, searchButton } = renderComponent(false));
		});

		it("shows an error message when an invalid postcode is submitted", async () => {
			expect(screen.queryByText(errorMessageText)).not.toBeInTheDocument();

			await user.type(postcodeInput, "EC4M&RF");
			await user.click(searchButton);

			expect(screen.getByText(errorMessageText)).toBeInTheDocument();
		}); 
		it("clears the error message once a valid postcode is submitted", async ()=>{
			await user.type(postcodeInput, "EC4M&RF");
			await user.click(searchButton);

			expect(screen.getByText(errorMessageText)).toBeInTheDocument();

			await user.clear(postcodeInput);
			await user.type(postcodeInput, "EC4M7RF");
			await user.click(searchButton);

			expect(screen.queryByText(errorMessageText)).not.toBeInTheDocument();
		}); 
		it("navigates to the results page when valid postcode is submitted", async ()=>{
			await user.type(postcodeInput, "EC4M7RF");
			await user.click(searchButton);

			expect(mockNavigate).toHaveBeenCalledWith("/area/EC4M7RF");
		});
	});
});
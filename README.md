# JustEat Early Careers Software Engineering - Take home assignment 

## Requirements ##

This web application displays the ✅name, ✅cuisines, ✅rating (as a number), and ✅address of 10 restaurants within specific postcodes, obtained from the JustEat API endpoint.

## How to run the application 

1. Clone the repository 
```bash
git clone https://github.com/AB45699/JustEatAssignment.git
```
2. Navigate to the backend server and then install the dependencies: 
```bash
cd JustEatAssignment/backend
npm install 
```
3. Run the backend server. **Ensure PORT 9090 is available**
```bash
npm run dev
```
The backend should now be available on http://localhost:9090/ in your browser.

4. Open a new terminal and navigate to the Frontend server. Install its dependencies: 
```bash
cd JustEatAssignment/frontend
npm install
```

5. To start the Frontend, run the command:
```bash
npm run dev
```

## How to run the tests
The application has been built with robust test-driven development practices. I use mocking extensively so tests are isolated and do not depend on a real server response. 

**Backend tests**

For the backend, ``jest`` and ``supertest`` are used for unit and integration testing, respectively.

- To run the backend server tests (for ``/backend/app.js``), navigate to the backend and run the command: 
```bash 
cd JustEatAssignment/backend
npm run test
```

- To run the back end utility function tests (for those within ``backend/utils``), within the backend folder run: 
```bash 
npm run test-utils 
```
**Frontend tests**

For the frontend, components, hooks, and services have been unit-tested using ``vitest``. 

- To run the frontend unit tests, navigate to the frontend and run the command: 
```bash 
cd JustEatAssignment/frontend
npm run test
```

## Design and architecture choices 

### Backend

* **A fully tested Express.js backend**: I decided to create a backend to validate and normalise raw JustEat API data before it is served to the frontend, enforcing strong **separation of concerns** by keeping the frontend focused only on displaying data.

* **MVC architecture**: There is clear separation of responsibilities with controllers (e.g. `/backend/controllers/restaurants.js`) handling request/response logic. This application has no database layer, hence no Model, and for this project I determined a View interface is unnecessary.

* **Fully tested utility functions**:  These functions are implemented within the controller to aid in validation, data transformation and error object creation.

* **Shaping the raw data** via `/backend/utils/transformData.js` utility function, which converts the API response into a simpler shape the frontend can use, and defensively handles empty, null, or missing fields so the frontend does not need to handle this. 

### Frontend

* **Unit-tested React frontend** built with a **component-based architecture**, separating reusable UI components, with pages composing these (e.g. shared `PostcodeInput.jsx` reused across search and results pages, with props controlling its appearance per page).

* **Strong separation of concerns**:

  * Custom hooks (e.g. `useFetchRestaurants`) encapsulates data fetching and state logic
  * Services enable API endpoints to change without the fetching hooks needing any updates

* **Routing with `react-router`** allows shareable results pages e.g. (`/area/:postcode`), and user-friendly handling of invalid routes. The app first **lands on a search page** to prevent an initial unnecessary fetch and **navigates** to results page upon a valid postcode being entered. 

* **Styling**: mobile-first, Block-Element-Modifier-based CSS with clear breakpoints. The design is aligned with [Just Eat’s styling conventions](https://pie.design/foundations/typography/) (e.g. Arial fallback font, use of similar font), and clear, user-friendly error handling for invalid inputs and empty results.

## Trade offs ##

I chose to implement postcode validation on both the frontend and backend. This was to balance user experience with server protection.

| | Frontend only | Backend only | Both (chosen) |
|---|---|---|---|
| **User feedback** | Instant, no network request | Slightly slower user-feedback | Instant |
| **Server protection** | Unprotected - invalid input can be passed directly (e.g. via Postman) | Protected | Protected |
| **Logic duplication** | Single location | Single location | Duplicated across both |

The duplicated logic is an accepted tradeoff. 

## Challenges ##

**Testing error state clearance within a hook between fetches**: 
- testing that a previously errored fetch clears its error state on a successful refetch in the ``useFetchRestaurants.test.js`` hook required simulating the hook being called twice with different arguments. It was unknown to me how to stimulate this with ``vitest``. Through the [official documentation](https://testing-library.com/docs/react-testing-library/api/#rerender) and YouTube, I discovered `renderHook` can use `initialProps` and a `rerender` function, re-triggering the `useEffect` with a new postcode. Combined with `mockRejectedValueOnce` and `mockResolvedValueOnce`, I could assert the full state transition in a single test.
 

## Assumptions ##

- A restaurant with a null, missing, or empty `name` property is retained and replaced with a `"Restaurant"` string, rather than omitted. If a restaurant partner is not listed, they risk missing out on orders. In reality, any restaurant listed with this fallback string should be logged and reviewed.
- If `address` data is null/missing/empty, `city` and `firstLine` return as `"Unavailable"`. Considering the restaurant has returned within the postcode searched, it can be assumed it is not too far from the customer. This should also be logged and reviewed.
- Postcode is not displayed on each restaurant card. I considered `city` and `firstLine` are sufficient.
- Null or missing `rating`/`starRating` data is returned as `null` and displayed as "No ratings yet" in the interface.
- A valid postcode that passes `validatePostcode()` but returns an empty array is treated as a successful fetch and the user is shown an appropriate message prompting them to try another postcode.

## Unclear concepts ##
- Interface choice: the brief left this open-ended. I chose a web interface to best showcase the data visually and demonstrate frontend skills.
- Whether spaces in postcodes should be handled: UK postcodes are commonly written with a space (e.g. EC4M 7RF) but the API accepts them without. It wasn't specified whether to handle this. I strip spaces before passing the postcode to the API.
- Error handling for the API: the brief doesn't mention what to do if the JustEat API is unavailable or returns an error. I handled HTTP errors (e.g. 403, 500) and network/API failures separately, returning appropriate status codes and messages to the client.


## Future improvements ##
- Better differentiation of 'No ratings yet' - the API returns an `isNew` property on the restaurant object. If `isNew` is `true`, "No ratings yet" is appropriate as the restaurant is newly listed. If `isNew` is `false` and `starRating` is still `null`, this is more likely a data issue and "Rating unavailable" would be a more accurate display.
- Add a loading skeleton instead of a spinner.
- Allow users to filter restaurants by cuisine, rating etc. 
- Allow users to click on a card to navigate to a new page to view more details/menu for that specific restaurant. 
- Add pagination or infinite scroll to display more than 10 results.

### *Thank you for viewing my project! 🙂* ###
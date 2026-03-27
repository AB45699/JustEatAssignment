import AppRouter from './routes/AppRouter.jsx';
import Header from './components/Header/Header.jsx';
import './App.css'; 

function App() {
  return (
    <div className="App">
		<Header />
      	<AppRouter />
    </div>
  )
};

export default App;

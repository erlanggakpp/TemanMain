import logo from './logo.svg';
import HomePage from './pages/HomePage';
import './App.css';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="container">
          <div className="row">
            <div className="col-12">
            <NavBar/>
            </div>
          </div>
        </div>
      </div>
      
      <HomePage/>
    </div>
  );
}

export default App;

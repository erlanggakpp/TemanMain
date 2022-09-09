import logo from "./logo.svg";
import HomePage from "./pages/HomePage";
import "./App.css";
import NavBar from "./components/NavBar";
import FormTest from "./pages/FormTest";

function App() {
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <NavBar />
            </div>
          </div>
        </div>
      </div>

      <HomePage />
      <FormTest />
    </div>
  );
}

export default App;

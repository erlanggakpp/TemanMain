import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import DetailEvent from "./pages/DetailEvent";
import DetailMagnets from "./pages/DetailMagnets";
import UserPage from "./pages/UserPage";
import FormProfile from "./pages/FormProfile";

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

      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/events/:id" element={<DetailEvent />} />
        <Route path="/magnets/:id" element={<DetailMagnets />} />
        <Route path="/Users/:id" element={<UserPage />} />
        <Route path="/profile" element={<FormProfile />} />
      </Routes>
    </div>
  );
}

export default App;

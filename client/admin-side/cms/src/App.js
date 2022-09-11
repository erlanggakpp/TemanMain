import './App.css';
import NavBar from './components/NavBar';
import TableEvent from './components/TableEvent';
import { Routes, Route } from 'react-router-dom';
import EventAdd from './components/EventAdd';
import TableUser from './components/TableUser';
import UserAdd from './components/UserAdd';
import TableCategory from './components/TableCategory';
import CategoryAdd from './components/CategoryAdd';
import UserEdit from './components/UserEdit';
import EventEdit from './components/EventEdit';
import CategoryEdit from './components/CategoryEdit';
import LoginPages from './pages/LoginPages';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/login" element={<LoginPages />} />
        <Route path="/listevent" element={<TableEvent />} />
        <Route path="/event" element={<EventAdd />} />
        <Route path="/event/:id" element={<EventEdit />} />
        <Route path="/listuser" element={<TableUser />} />
        <Route path="/user" element={<UserAdd />} />
        <Route path="/user/:id" element={<UserEdit />} />
        <Route path="/listcategory" element={<TableCategory />} />
        <Route path="/category" element={<CategoryAdd />} />
        <Route path="/category/:id" element={<CategoryEdit />} />
      </Routes>
    </div>
  );
}

export default App;

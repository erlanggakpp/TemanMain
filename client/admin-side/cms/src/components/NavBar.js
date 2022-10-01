import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.clear()
        navigate('/login')
    }

    const home = () => {
        navigate('/')
    }

    return (
        <Navbar style={{ backgroundColor: '#F8C456' }} expand="lg">
            <Container style={{ color: '#000000' }}>
                <Navbar.Brand href="">Admin Teman Main</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                {localStorage.getItem("access_token") ? (
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link className="text-black" onClick={() => { home() }}>Home</Nav.Link>
                            <NavDropdown className="text-black" title="User" id="basic-nav-dropdown">
                                <NavDropdown.Item>
                                    <Link to="/listuser">
                                        List User
                                    </Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <Link to="/user">
                                        Add User
                                    </Link>
                                </NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown className="text-black" title="Event" id="basic-nav-dropdown">
                                <NavDropdown.Item>
                                    <Link to="/listevent">
                                        List Event
                                    </Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <Link to="/event">
                                        Add Event
                                    </Link>
                                </NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown className="text-black" title="Category" id="basic-nav-dropdown">
                                <NavDropdown.Item>
                                    <Link to="/listcategory">
                                        List Category
                                    </Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <Link to="/category">
                                        Add Category
                                    </Link>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav.Link onClick={() => { logout() }} >Logout</Nav.Link>
                    </Navbar.Collapse>
                ) : null}
            </Container>
        </Navbar >
    )
}

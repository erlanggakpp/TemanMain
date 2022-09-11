import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="">Admin Teman Main</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="">Home</Nav.Link>
                        <NavDropdown title="User" id="basic-nav-dropdown">
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
                        <NavDropdown title="Event" id="basic-nav-dropdown">
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
                        <NavDropdown title="Category" id="basic-nav-dropdown">
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
                    <Nav.Link href="">Logout</Nav.Link>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}

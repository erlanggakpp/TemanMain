import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { CgProfile, CgLogIn, CgLogOut } from "react-icons/cg";
import { SiGnuprivacyguard } from "react-icons/si";
import { VscInfo } from "react-icons/vsc";
import { useEffect } from "react";

export default function NavBar() {

  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const styleA = {
    width: "100%",
    position: "fixed",
    transition: "0.3s ease-in-out",
  };

  const styleB = {
    width: "100%",
    position: "fixed",
    transition: "0.3s ease-in-out",
    "backgroundColor": "#fff",
    "boxShadow": "5px -1px 12px -5px grey",
    height: "80px",
  };

  const styleNav = {}

  useEffect(() => {
    const { pageYOffset } = window;
    if (pageYOffset > 10);
  }, [window.pageYOffset]);
  return (
    <header>
      <div className="container-fluid  mb-5">
        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            <nav
              className="px-3 py-0 fixed-top navbar-expand-lg"
              style={styleB}
            >
              <div className="container navbar d-flex ">
                <div className="d-flex justify-content-end">
                  <div>
                    <a
                      href="/"
                      className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-dark text-decoration-none"
                    >
                      <svg
                        className="bi me-2"
                        width="40"
                        height="32"
                        role="img"
                        aria-label="Bootstrap"
                      ></svg>
                      <img
                        className="h-100 rounded"
                        style={{
                          width: "50px",
                          height: "50px",
                          marginRight: "15px",
                        }}
                        src="https://media.discordapp.net/attachments/1015235714780246077/1018164300520628315/fixlogo.jpg?width=480&height=480"
                        alt=""
                      />
                      <a style={{ fontSize: "24px" }}>TemanMain</a>
                    </a>
                  </div>
                  <div style={{ padding: 10, marginLeft: 100 }}>
                    <button
                      className="navbar-toggler"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarsExample03"
                      aria-controls="navbarsExample03"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    >
                      <span className="navbar-toggler-icon"></span>
                    </button>
                  </div>
                </div>
                <div
                  style={{ float: "buttom", flexGrow: 0 }}
                  className="collapse navbar-collapse"
                  id="navbarsExample03"
                >
                  <ul className="nav col-12 col-lg-auto my-2 d-flex justify-content-center my-md-0 text-small navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <Link to="/" className="nav-link text-dark">
                        <svg
                          className="bi d-block mx-auto mb-1"
                          width="24"
                          height="24"
                        >
                          <FaHome />
                        </svg>
                        Home
                      </Link>
                    </li>
                    {localStorage.getItem("access_token") && (
                      <li className="nav-item">
                        <Link to="/profile" className="nav-link text-dark">
                          <svg
                            className="bi d-block mx-auto mb-1"
                            width="24"
                            height="24"
                          >
                            <CgProfile />
                          </svg>
                          Profile
                        </Link>
                      </li>
                    )}
                    {localStorage.getItem("access_token") && (
                      <li className="nav-item">
                        <Link to="/my-page" className="nav-link text-dark">
                          <svg
                            className="bi d-block mx-auto mb-1"
                            width="24"
                            height="24"
                          >
                            <CgProfile />
                          </svg>
                          My Page
                        </Link>
                      </li>
                    )}
                    <li className="nav-item">
                      <a href="#" className="nav-link text-dark">
                        <svg
                          className="bi d-block mx-auto mb-1"
                          width="24"
                          height="24"
                        >
                          <VscInfo />
                        </svg>
                        About
                      </a>
                    </li>
                    {!localStorage.getItem("access_token") && (
                      <li className="nav-item">
                        <Link to="/login" className="nav-link text-dark">
                          <svg
                            className="bi d-block mx-auto mb-1"
                            width="24"
                            height="24"
                          >
                            <CgLogIn />
                          </svg>
                          Login
                        </Link>
                      </li>
                    )}
                    <li className="nav-item">
                      <Link to="/register" className="nav-link text-dark">
                        <svg
                          className="bi d-block mx-auto mb-1"
                          width="24"
                          height="24"
                        >
                          <SiGnuprivacyguard />
                        </svg>
                        Register
                      </Link>
                    </li>
                    {localStorage.getItem("access_token") && (
                      <li className="nav-item" onClick={logout}>
                        <a className="nav-link text-dark">
                          <svg
                            className="bi d-block mx-auto mb-1"
                            width="24"
                            height="24"
                          >
                            <CgLogOut />
                          </svg>
                          Logout
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

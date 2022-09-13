import { Link, useNavigate } from "react-router-dom";
import { FaHome } from 'react-icons/fa'
import { CgProfile, CgLogIn, CgLogOut } from 'react-icons/cg'
import { SiGnuprivacyguard } from 'react-icons/si'
import { VscInfo } from 'react-icons/vsc'

export default function NavBar() {
  const navigate = useNavigate()
  const logout = () => {
    localStorage.clear()
    navigate('/login')
  }
  return (
    <header>
      <nav class="px-3 py-2 bg-light fixed-top navbar-expand-lg">
        <div class="container navbar justify-content-center">
          <div class="d-flex justify-content-center">
            <div>
              <a
                href="/"
                class="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-dark text-decoration-none"
              >
                <svg
                  class="bi me-2"
                  width="40"
                  height="32"
                  role="img"
                  aria-label="Bootstrap"
                ></svg>
                <img
                  className="h-100"
                  style={{ width: "40px", height: "40px", marginRight: "15px" }}
                  src="https://media.discordapp.net/attachments/1015235714780246077/1018164300520628315/fixlogo.jpg?width=480&height=480"
                  alt=""
                />
                TemanMain
              </a>
            </div>
            <div style={{ padding: 10, marginLeft: 100 }}>
              <button
                class="navbar-toggler"
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
            <div
              className="collapse navbar-collapse d-flex justify-content-end"
              // id="navbarSupportedContent"
              style={{ float: "buttom" }}
              class="collapse navbar-collapse"
              id="navbarsExample03"
            >
              <ul class="nav col-12 col-lg-auto my-2  my-md-0 text-small navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a href="#" class="nav-link text-dark">
                    <svg class="bi d-block mx-auto mb-1" width="24" height="24">
                      <FaHome />
                    </svg>
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" class="nav-link text-dark">
                    <svg class="bi d-block mx-auto mb-1" width="24" height="24">
                      <CgProfile />
                    </svg>
                    Profile
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" class="nav-link text-dark">
                    <svg class="bi d-block mx-auto mb-1" width="24" height="24">
                      <VscInfo />
                    </svg>
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" class="nav-link text-dark">
                    <svg class="bi d-block mx-auto mb-1" width="24" height="24">
                      <CgLogIn />
                    </svg>
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" class="nav-link text-dark">
                    <svg class="bi d-block mx-auto mb-1" width="24" height="24">
                      <SiGnuprivacyguard />
                    </svg>
                    Register
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" class="nav-link text-dark">
                    <svg class="bi d-block mx-auto mb-1" width="24" height="24">
                      <CgLogOut />
                    </svg>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div class="px-3 py-2 border-bottom mb-3">
        <div class="container d-flex flex-wrap justify-content-center">
          <form class="col-12 col-lg-auto mb-2 mb-lg-0 me-lg-auto">
            <input
              type="search"
              class="form-control"
              placeholder="Search..."
              aria-label="Search"
            />
          </form>
        </div>
      </div>
    </header>
  );
}
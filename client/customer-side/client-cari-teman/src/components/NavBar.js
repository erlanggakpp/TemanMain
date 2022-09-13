import { Link, useNavigate } from "react-router-dom";
import { FaBeer, FaHome } from "react-icons/fa";
import { CgProfile, CgLogIn, CgLogOut } from "react-icons/cg";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import { SiGnuprivacyguard } from "react-icons/si";
import { VscInfo } from "react-icons/vsc";

export default function NavBar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    // <nav className="navbar navbar-expand-lg bg-light fixed-top " style={{padding : " 0 50px", height : "75px"}}>
    //   <div className="container-fluid">
    //     <div style={{ height: "10px" }} className="navbar-brand"></div>
    //     <a className="navbar-brand" href="#">
    //       <img
    //         src="https://cdn.discordapp.com/attachments/1015235714780246077/1018164300520628315/fixlogo.jpg"
    //         alt=""
    //         className=""
    //         style={{ height: "35px" , borderRadius : "5px", marginRight : "10px"}}
    //       />
    //       TemanMain
    //     </a>
    //     <button
    //       className="navbar-toggler"
    //       type="button"
    //       data-bs-toggle="collapse"
    //       data-bs-target="#navbarSupportedContent"
    //       aria-controls="navbarSupportedContent"
    //       aria-expanded="false"
    //       aria-label="Toggle navigation"
    //     >
    //       <span className="navbar-toggler-icon"></span>
    //     </button>
    //     <div className="collapse navbar-collapse" id="navbarSupportedContent">
    //       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    //         <li className="nav-item">
    //           <Link className="nav-link active" aria-current="page" to={'/'}>
    //             Home
    //           </Link>
    //         </li>
    //         <li className="nav-item">
    //           <Link className="nav-link" to={'/profile'}>
    //             Profile
    //           </Link>
    //         </li>
    //         <li className="nav-item dropdown">
    //           <a
    //             className="nav-link dropdown-toggle"
    //             href="#"
    //             role="button"
    //             data-bs-toggle="dropdown"
    //             aria-expanded="false"
    //           >
    //             Dropdown
    //           </a>
    //           <ul className="dropdown-menu">
    //             <li>
    //               <a className="dropdown-item" href="#">
    //                 Action
    //               </a>
    //             </li>
    //             <li>
    //               <a className="dropdown-item" href="#">
    //                 Another action
    //               </a>
    //             </li>
    //             <li>
    //               <hr className="dropdown-divider" />
    //             </li>
    //             <li>
    //               <a className="dropdown-item" href="#">
    //                 Something else here
    //               </a>
    //             </li>
    //           </ul>
    //         </li>
    //         <li className="nav-item">
    //           <a className="nav-link disabled">Disabled</a>
    //         </li>
    //         <li className="nav-item">
    //           {/* <button className="nav-link" onClick={()=>{logout()}}>logout</button> */}
    //         </li>
    //       </ul>
    //       <form className="d-flex" role="search">
    //         <input
    //           className="form-control me-2"
    //           type="search"
    //           placeholder="Search"
    //           aria-label="Search"
    //         />
    //         <button className="btn btn-outline-success" type="submit">
    //           Search
    //         </button>
    //       </form>
    //     </div>
    //   </div>
    // </nav>
    <header>
      <div class="px-3 py-2 bg-light fixed-top navbar-expand-lg">
        <div class="container navbar">
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
            <div>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
            <div
              className="collapse navbar-collapse d-flex justify-content-end"
              id="navbarSupportedContent"
              style={{ float: "right" }}
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
      </div>
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

import { useState } from "react";
// import "../assets/LoginPage.css";
// import { loginHandlerAction } from "../store/action/userAction";
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
// import Swal from "sweetalert2";
// import { useEffect } from 'react'
import { loadingSet } from "../store/action/events";
import { loginUser } from "../store/action/users";

function LoginPage() {

  const [loginInput, setLoginInput] = useState({
    email : "",
    password : ""
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const changeUser = (e) => {
    const { name, value } = e.target;
    setLoginInput({
      ...loginInput,
      [name]: value,
    });
  };
  
  const userSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(loginInput))
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
console.log(error);
      })
      .finally(() => dispatch(loadingSet(false)));
  };
  
  // useEffect(() => dispatch(loginHandlerAction(loginInput)), [setLoginInput]);

  // function onChangeAtForm(e) {
  //   const { name, value } = e.target;
  //   setLoginInput({
  //     ...loginInput,
  //     [name]: value,
  //   });
  // }

  // const submitHandler = (e) => {
  //   e.preventDefault()
  //   dispatch(loginHandlerAction(loginInput))
  //     .then(() => navigate("/"))
  //     .catch((err) => {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Oops...",
  //         text: err.message,
  //       });
  //     });
  // }

  return (
    <div className="login-page" id="box-login">
      <div class="item">
        <div id="img-login">
          <img
            src="https://media.discordapp.net/attachments/1015235714780246077/1018784654372913182/loginTemanMain.jpg?width=483&height=683"
            alt=""
          />
        </div>
        <div id="content-login">
          <h1>login</h1>
          <form onSubmit={userSubmit}>
            <input
              type="text"
              class="input-login"
              placeholder="email"
              name="email"
              value={loginInput.description}
              onChange={changeUser}
            />
            <input
              type="password"
              class="input-login"
              placeholder="password"
      
              name="password"
              value={loginInput.price}
              onChange={changeUser}
            />
            <br />

            <button class="btn-login">Login</button>
          </form>
          <div id="btn-google">
            <div id="google-button-login"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

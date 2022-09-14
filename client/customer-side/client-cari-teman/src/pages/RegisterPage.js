import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loadingSet } from "../store/action/events";
import { addUser } from "../store/action/users";

export default function RegisterPage() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "Visitor",
    phoneNumber: "",
    address: "",
    birthdate: "",
    profilePict: "",
    instagramAccount: "",
    twitterAccount: "",
    gender: "",
  });

  const { loading } = useSelector((e) => e.events);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeUser = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  const userSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
    dispatch(addUser(userData))
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {})
      .finally(() => dispatch(loadingSet(false)));
  };
  return (
    <div id="add-food">
      <div
        className="d-flex justify-content-center"
        style={{ marginTop: "60px" }}
      >
        <div className="card shadow">
          <div className="card-body" style={{ width: "400px" }}>
            <form onSubmit={userSubmit}>
              <h3>Register Admin</h3>
              <div className="form-floating mb-3">
                <input
                  value={userData.firstName}
                  onChange={changeUser}
                  type="text"
                  className="form-control"
                  placeholder="firstName"
                  name="firstName"
                />
                <label htmlFor="floatingInput">firstName</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  value={userData.lastName}
                  onChange={changeUser}
                  type="text"
                  className="form-control"
                  id="addName"
                  placeholder="lastName"
                  name="lastName"
                />
                <label htmlFor="floatingInput">lastName</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  name="email"
                  value={userData.email}
                  onChange={changeUser}
                  type="text"
                  className="form-control"
                  id="addDescription"
                  placeholder="Email"
                />
                <label htmlFor="floatingDescription">Email</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  name="password"
                  value={userData.password}
                  onChange={changeUser}
                  type="password"
                  className="form-control"
                  id="addPrice"
                  placeholder="Password"
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  name="phoneNumber"
                  value={userData.phoneNumber}
                  onChange={changeUser}
                  type="number"
                  className="form-control"
                  id=""
                  placeholder="phoneNumber"
                />
                <label htmlFor="addImage">Phone Number</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  name="address"
                  value={userData.address}
                  onChange={changeUser}
                  type="text"
                  className="form-control"
                  placeholder="address"
                />
                <label htmlFor="addImage">Address</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  name="birthdate"
                  value={userData.birthdate}
                  onChange={changeUser}
                  type="date"
                  className="form-control"
                  placeholder="birthdate"
                />
                <label htmlFor="addImage">birthdate</label>
              </div>
              <div className="form-floating mb-3">
                <select
                  name="gender"
                  value={userData.gender}
                  onChange={changeUser}
                  type="text"
                  className="form-control"
                  placeholder="gender"
                >
                  <option value={"Male"}>Male</option>
                  <option value={"Female"}>Female</option>
                </select>
                <label htmlFor="addImage">gender</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  name="profilePict"
                  value={userData.profilePict}
                  onChange={changeUser}
                  type="text"
                  className="form-control"
                  placeholder="profilePict"
                />
                <label htmlFor="addImage">profilePict</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  name="instagramAccount"
                  value={userData.instagramAccount}
                  onChange={changeUser}
                  type="text"
                  className="form-control"
                  placeholder="instagramAccount"
                />
                <label htmlFor="addImage">instagramAccount</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  name="twitterAccount"
                  value={userData.twitterAccount}
                  onChange={changeUser}
                  type="text"
                  className="form-control"
                  placeholder="twitterAccount"
                />
                <label htmlFor="addImage">twitterAccount</label>
              </div>
              <div className="d-flex flex-row justify-content-end">
                <Link
                  to={"/"}
                  type="button"
                  className="btn main-button btn-outline-primary"
                  id=""
                >
                  Cancel
                </Link>
                <button
                  className="btn btn-primary ms-2"
                  id="addFood"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

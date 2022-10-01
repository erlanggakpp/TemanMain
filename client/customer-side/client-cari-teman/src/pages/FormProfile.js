import { useDispatch, useSelector } from "react-redux";
import { editMyProfile, fetchMyProfile } from "../store/action/users";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Swal = require("sweetalert2");

export default function FormProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    address: "",
    birthdate: "",
    email: "",
    firstName: "",
    gender: "",
    instagramAccount: "",
    lastName: "",
    phoneNumber: "",
    profilePict: "",
    twitterAccount: "",
  });
  useEffect(() => {
    dispatch(fetchMyProfile())
      .then((data) => {
        const {
          address,
          birthdate,
          email,
          firstName,
          gender,
          instagramAccount,
          lastName,
          phoneNumber,
          profilePict,
          twitterAccount,
        } = data.data;
        setUser({
          address,
          birthdate,
          email,
          firstName,
          gender,
          instagramAccount,
          lastName,
          phoneNumber,
          profilePict,
          twitterAccount,
        });
      })
      .catch((err) => console.log(err));
  }, []);
  const changeUserForm = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const formUser = (e) => {
    e.preventDefault();
    dispatch(editMyProfile(user))
      .then((data) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: data.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .then(() => {
        navigate("/");
      });
  };
  return (
    <>
      <div className="container rounded bg-white mt-5">
        <div className="row">
          <div className="col-md-4 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                className="rounded-circle mt-5"
                src={user.profilePict}
                width="90"
              />
              <span className="font-weight-bold">
                {user.firstName + " " + user.lastName}
              </span>
              <span className="text-black-50">{user.email}</span>
              <span>{user.address}</span>
            </div>
          </div>
          <div className="col-md-8">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex flex-row align-items-center back">
                  <i className="fa fa-long-arrow-left mr-1 mb-1"></i>
                  <h6>Edit Profile</h6>
                </div>
              </div>
              <form onSubmit={(e) => formUser(e)}>
                <div className="row mt-2">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="first name"
                      value={user.firstName}
                      onChange={(e) => changeUserForm(e)}
                      name="firstName"
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      value={user.lastName}
                      onChange={(e) => changeUserForm(e)}
                      name="lastName"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Email"
                      value={user.email}
                      onChange={(e) => changeUserForm(e)}
                      name="email"
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      value={user.profilePict}
                      onChange={(e) => changeUserForm(e)}
                      name="profilePict"
                      placeholder="Profile Picture"
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="address"
                      value={user.address}
                      onChange={(e) => changeUserForm(e)}
                      name="address"
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="date"
                      className="form-control"
                      value={user.birthdate}
                      onChange={(e) => changeUserForm(e)}
                      name="birthdate"
                      placeholder="date of birth"
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="instagram"
                      value={user.instagramAccount}
                      onChange={(e) => changeUserForm(e)}
                      name="instagramAccount"
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      value={user.twitterAccount}
                      onChange={(e) => changeUserForm(e)}
                      name="twitterAccount"
                      placeholder="tiwtter"
                    />
                  </div>
                </div>
                <div className="mt-5 text-right">
                  <button
                    className="btn btn-primary profile-button"
                    type="submit"
                  >
                    Save Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

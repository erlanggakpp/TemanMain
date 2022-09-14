import { useEffect, useState } from "react";
import { detailEvent, fetchEvent, loadingSet } from "../store/action/events";
import { fetchMagnetsByUserId } from "../store/action/magnets";
import {
  getMyInvitation,
  acceptInvitationFromStore,
} from "../store/action/invitation";
import { fetchMyProfile } from "../store/action/users";
import {
  getMyRequest,
  acceptRequestFromStore,
  rejectRequestFromStore,
} from "../store/action/requests";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import EditMagnet from "../compDetailEvent/EditMagnet";
import { addMagnets, detailMagnet, editMagnet } from "../store/action/magnets";
const Swal = require("sweetalert2");

export default function UserPage() {
  const navigate = useNavigate();
  const { loading } = useSelector((e) => e.events);
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [myMagnets, setMyMagnets] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [myInvitations, setMyInvitations] = useState([]);
  useEffect(() => {
    dispatch(fetchMagnetsByUserId()).then((data) => {
      // console.log(data, "IMI DATA");
      setMyMagnets(data.data);
    });
  }, []);
  const [dataForm, setDataForm] = useState({
    id: "",
    UserId: "",
    EventId: "",
    confirmationDate: "2022/10/03",
    ageRequirement: "",
    specialRequirement: "",
    magnetDescription: "",
    participant: "",
    vacantParticipant: "",
  });
  useEffect(() => {
    dispatch(detailMagnet(15)).then((data) => {
      console.log(data, "ini kepanggil asu");
      setDataForm(data);
    });
  }, []);
  const changeForm = (e) => {
    const { name, value } = e.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    console.log(dataForm);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, create it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // dispatch()
        dispatch(editMagnet(dataForm))
          .then(() => {
            // dispatch(detailEvent(dataForm.EventId));
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Success create Magnet",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((err) => {
            console.log(err, "errrr");
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: err.response.data.message,
            });
            console.log(err.response.data.message, "<<err");
          })
          .finally(() => {
            dispatch(loadingSet(false));
            navigate(`/my-page`);
          });
      }
    });
  };
  useEffect(() => {
    dispatch(getMyInvitation())
      .then((data) => {
        setMyInvitations(data.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        dispatch(loadingSet(false));
      });
  }, []);
  useEffect(() => {
    dispatch(getMyRequest())
      .then((data) => {
        setMyRequests(data.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        dispatch(loadingSet(false));
      });
  }, []);
  useEffect(() => {
    dispatch(fetchMyProfile())
      .then((data) => {
        setUser(data.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        dispatch(loadingSet(false));
      });
  }, []);

  const toMagnetDetail = (data) => {
    navigate(`/events/${data.eventId}/magnets/${data.magnetId}`);
  };
  const acceptRequest = (id) => {
    dispatch(acceptRequestFromStore(id)).then((data) => {
      dispatch(loadingSet(true));
      dispatch(getMyRequest())
        .then((data) => {
          setMyRequests(data.data);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          dispatch(loadingSet(false));
        });
    });
  };
  const rejectRequest = (id) => {
    dispatch(rejectRequestFromStore(id)).then((data) => {
      console.log(data);
      dispatch(getMyRequest())
        .then((data) => {
          setMyRequests(data.data);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          dispatch(loadingSet(false));
        });
    });
  };
  const acceptInvitation = (id) => {
    // console.log(id);
    dispatch(acceptInvitationFromStore(id)).then((data) => {
      console.log(data);
      dispatch(getMyInvitation())
        .then((data) => {
          setMyInvitations(data.data);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          dispatch(loadingSet(false));
        });
    });
  };
  // console.log(myMagnets, "ini magnet dari page<<<<<<<<<<<<");
  // console.log(myRequests, "<<<<<<<<<<<<");
  console.log(myInvitations, "<<<<<<<<<<<<");
  // console.log(user, "<<<<<<<<<<<<");
  return (
    <div className="containet-fluid">
      {loading ? (
        <h1>Loading ... </h1>
      ) : (
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-md-12" style={{ height: "300px" }}>
              <img
                className="img-fill card-img-top"
                src="https://wallpaperaccess.com/full/1382359.jpg"
                alt=""
                style={{ objectFit: "cover", height: "100%", margin: 0 }}
              />
            </div>
            <div
              style={{
                width: "50%",
                height: "200px",
                position: "absolute",
                margin: "200px 0px",
              }}
              className=""
            >
              <div className="row">
                <div className="col-md-4 h-100 mb-3">
                  {/* <h1 className="text-white">
                     ini buat gambar yagesya sip aasd
                   </h1> */}
                  <img
                    className="rounded-circle"
                    src="https://media-exp1.licdn.com/dms/image/C4E03AQEA2hq7k-y8iQ/profile-displayphoto-shrink_200_200/0/1625029397449?e=2147483647&v=beta&t=ZFojw_cAobe7-gi_NJ-gMOoheyV85ucCW6PQWwOVxbc"
                    alt=""
                    style={{
                      width: "200px",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="col-md-8 d-flex justify-content-center align-items-end">
                  <div>
                    <h1>
                      {user.firstName} {user.lastName}
                    </h1>
                    <p> </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12" style={{ height: "150px" }}></div>
          </div>
          <div className="row d-flex justify-content-center mt-5">
            <div className="col-10 bg-light d-flex justify-content-center p-0">
              <div className="row g-5">
                <div className="col-md-8">
                  <div>
                    <div className="col-12 bg-dark rounded d-flex align-item-center justify-content-center py-2 text-light opacity-49">
                      <h2>My Magnets</h2>
                    </div>
                    <div className="d-flex align-item-center justify-content-start">
                      {!myMagnets.length === 0 && (
                        <>
                          <h1>You haven't created any magnet yet</h1>
                        </>
                      )}
                      {myMagnets.length && (
                        <>
                          <table className="table">
                            <thead>
                              <tr>
                                <th scope="col">No</th>
                                <th scope="col">Event</th>
                                <th scope="col">Participant</th>
                                <th scope="col">Action</th>
                              </tr>
                            </thead>

                            <tbody>
                              {myMagnets.map((el, idx) => (
                                <tr>
                                  {/* <EditMagnet updateMagnet={el} /> */}
                                  <th scope="row">{idx + 1}</th>
                                  <td>{el.Event.name}</td>
                                  <td>
                                    <strong>
                                      {el.vacantParticipant}/{el.participant}
                                    </strong>
                                  </td>
                                  <td>
                                    <button
                                      className="btn btn-primary"
                                      onClick={() =>
                                        toMagnetDetail({
                                          magnetId: el.id,
                                          eventId: el.Event.id,
                                        })
                                      }
                                    >
                                      View
                                    </button>
                                    <button
                                      type="button"
                                      className="btn text-primary"
                                      data-bs-toggle="modal"
                                      data-bs-target={`#editMagnet${el.id}`}
                                      style={{ backgroundColor: "#EAF6F6" }}
                                    >
                                      <h3>Edit Magnet</h3>
                                    </button>
                                    {/* <div
                                      className="modal fade"
                                      id={`editMagnet${el.id}`}
                                      tabIndex="-1"
                                    >
                                      <div className="modal-dialog">
                                        <div className="modal-content">
                                          <div className="modal-header">
                                            <h5
                                              className="modal-title"
                                              id="exampleModalLabel"
                                            >
                                              Form Create Magnets
                                            </h5>
                                            <button
                                              type="button"
                                              className="btn-close"
                                              data-bs-dismiss="modal"
                                            ></button>
                                          </div>
                                          <div
                                            className="modal-body"
                                            style={{ marginTop: 150 }}
                                          >
                                            <div className="container-fluid">
                                              <div className="container">
                                                <div className="row">
                                                  <div className="col-12">
                                                    <form onSubmit={formSubmit}>
                                                      <fieldset>
                                                        
                                                        <div>
                                                          <label
                                                            htmlFor="disabledTextInput"
                                                            className="form-label"
                                                          >
                                                            Age Requirement
                                                          </label>
                                                          <input
                                                            value={
                                                              dataForm.ageRequirement
                                                            }
                                                            onChange={
                                                              changeForm
                                                            }
                                                            name="ageRequirement"
                                                            type="number"
                                                            className="form-control"
                                                            placeholder="input number, ex :18"
                                                          />
                                                        </div>
                                                        <div>
                                                          <label
                                                            htmlFor="disabledSelect"
                                                            className="form-label"
                                                          >
                                                            Gender Requirement
                                                          </label>
                                                          <select
                                                            value={
                                                              dataForm.specialRequirement
                                                            }
                                                            onChange={
                                                              changeForm
                                                            }
                                                            name="specialRequirement"
                                                            id="disabledSelect"
                                                            className="form-select"
                                                          >
                                                            <option
                                                              hidden
                                                              defaultValue
                                                            >
                                                              -- Select --
                                                            </option>
                                                            <option
                                                              value={
                                                                "All Gender"
                                                              }
                                                            >
                                                              All Gender
                                                            </option>
                                                            <option
                                                              value={"Man Only"}
                                                            >
                                                              Man Only
                                                            </option>
                                                            <option
                                                              value={
                                                                "Female Only"
                                                              }
                                                            >
                                                              Female Only
                                                            </option>
                                                          </select>
                                                        </div>
                                                        <div className="mb-3">
                                                          <label
                                                            htmlFor="exampleFormControlTextarea1"
                                                            className="form-label"
                                                          >
                                                            Magnet Description
                                                          </label>
                                                          <textarea
                                                            value={
                                                              dataForm.magnetDescription
                                                            }
                                                            onChange={
                                                              changeForm
                                                            }
                                                            name="magnetDescription"
                                                            className="form-control"
                                                            id="exampleFormControlTextarea1"
                                                            placeholder="description"
                                                            rows="3"
                                                          ></textarea>
                                                        </div>
                                                        <div className="row">
                                                          <div className="col-6">
                                                            {" "}
                                                            <div>
                                                              <label
                                                                htmlFor="disabledTextInput"
                                                                className="form-label"
                                                              >
                                                                Available Slot
                                                              </label>
                                                              <input
                                                                value={
                                                                  dataForm.vacantParticipant
                                                                }
                                                                onChange={
                                                                  changeForm
                                                                }
                                                                name="vacantParticipant"
                                                                type="number"
                                                                className="form-control"
                                                                placeholder="input number, ex :8"
                                                              />
                                                            </div>
                                                          </div>
                                                          <div className="col-6">
                                                            {" "}
                                                            <div>
                                                              <label
                                                                htmlFor="disabledTextInput"
                                                                className="form-label"
                                                              >
                                                                Total
                                                                Participant
                                                              </label>
                                                              <input
                                                                value={
                                                                  dataForm.participant
                                                                }
                                                                onChange={
                                                                  changeForm
                                                                }
                                                                name="participant"
                                                                type="number"
                                                                className="form-control"
                                                                placeholder="input number, ex :10"
                                                              />
                                                            </div>
                                                          </div>
                                                        </div>
                                                        <br />

                                                        <div className="modal-footer">
                                                          <button
                                                            data-bs-dismiss="modal"
                                                            type="submit"
                                                            className="btn btn-primary"
                                                          >
                                                            Submit
                                                          </button>
                                                          <button
                                                            type="button"
                                                            className="btn btn-secondary"
                                                            data-bs-dismiss="modal"
                                                          >
                                                            Close
                                                          </button>
                                                        </div>
                                                      </fieldset>
                                                    </form>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      class="modal fade"
                                      id="exampleModal"
                                      tabindex="-1"
                                      aria-labelledby="exampleModalLabel"
                                      aria-hidden="true"
                                    >
                                      <div class="modal-dialog">
                                        <div class="modal-content">
                                          <div class="modal-header">
                                            <h5
                                              class="modal-title"
                                              id="exampleModalLabel"
                                            >
                                              Modal title
                                            </h5>
                                            <button
                                              type="button"
                                              class="btn-close"
                                              data-bs-dismiss="modal"
                                              aria-label="Close"
                                            ></button>
                                          </div>
                                          <div class="modal-body">...</div>
                                          <div class="modal-footer">
                                            <button
                                              type="button"
                                              class="btn btn-secondary"
                                              data-bs-dismiss="modal"
                                            >
                                              Close
                                            </button>
                                            <button
                                              type="button"
                                              class="btn btn-primary"
                                            >
                                              Save changes
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div> */}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="col-12 bg-secondary rounded d-flex mt-5 align-item-center justify-content-start  p-1 text-light">
                    <h4 className="mx-3">My request</h4>
                  </div>
                  <div>
                    {myRequests.length === 0 && (
                      <>
                        <h1>You do not have any request yet</h1>
                      </>
                    )}
                    {myRequests.length !== 0 && (
                      <>
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">No</th>
                              <th scope="col">Name</th>
                              <th scope="col">Event</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {myRequests.map((el, idx) => (
                              <tr>
                                <th scope="row">{idx + 1}</th>
                                <td>
                                  {el.User.firstName} {el.User.lastName}
                                </td>
                                <td>{el.Magnet.Event.name}</td>

                                <td>
                                  <div
                                    className="btn-group"
                                    role="group"
                                    aria-label="Basic example"
                                  >
                                    <button
                                      type="button"
                                      className="btn btn-danger"
                                      onClick={() => rejectRequest(el.id)}
                                    >
                                      {el.status !== "Accepted"
                                        ? "Reject"
                                        : "Remove"}
                                    </button>
                                    {el.status !== "Accepted" ? (
                                      <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={() => acceptRequest(el.id)}
                                      >
                                        Accept
                                      </button>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </>
                    )}
                  </div>
                  <div className="col-12 bg-warning rounded d-flex mt-5 align-item-center justify-content-start  p-1 text-dark">
                    <h4 className="mx-3">My Invitations</h4>
                  </div>
                  <div>
                    {myInvitations.length === 0 && (
                      <h1>You do not have any invitation yet</h1>
                    )}

                    {myInvitations.length !== 0 && (
                      <>
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">No</th>
                              <th scope="col">Invitor</th>
                              <th scope="col">Event</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {myInvitations.map((el, idx) => (
                              <tr>
                                <th scope="row">{idx + 1}</th>
                                <td>
                                  {el.Invitor.firstName} {el.Invitor.lastName}
                                </td>
                                <td>{el.Magnet.Event.name}</td>

                                <td>
                                  <div
                                    className="btn-group"
                                    role="group"
                                    aria-label="Basic example"
                                  >
                                    <button
                                      type="button"
                                      className="btn btn-primary"
                                      onClick={() =>
                                        toMagnetDetail({
                                          magnetId: el.Magnet.id,
                                          eventId: el.Magnet.Event.id,
                                        })
                                      }
                                    >
                                      View Magnet
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-success"
                                      onClick={() => acceptInvitation(el.id)}
                                    >
                                      Accept
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </>
                    )}
                  </div>
                  <p className="p-4">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Aut at repudiandae totam eius ut quos explicabo, hic
                    veritatis sequi quis eveniet perferendis accusamus, in sit
                    laudantium soluta, magni cumque harum rerum tenetur? Ipsum
                    repudiandae enim recusandae, numquam veritatis odit placeat
                    accusamus. Reprehenderit minima est quas consequatur laborum
                    cumque ut, laudantium, adipisci aliquam praesentium, fugit
                    assumenda ex laboriosam magnam suscipit ullam perferendis
                    odit optio fuga in porro. Sequi dolorem molestias labore
                    repellendus dolor voluptatibus ad eum ullam voluptate atque
                    nulla omnis necessitatibus, id esse itaque accusamus
                    possimus a veritatis. Eligendi iure aliquam quo, illo
                    quisquam perspiciatis at tempore rerum natus. Aliquid amet
                    nostrum iusto magnam earum, omnis distinctio vel enim iure
                    ipsa in, neque explicabo impedit optio accusantium accusamus
                    error dicta veritatis quo? Repudiandae ab aspernatur
                    accusantium eius qui pariatur libero nemo asperiores
                    deserunt nobis, quod id, in fuga repellat placeat minus!
                    Maxime vero ut rerum est iste in, voluptate maiores. Esse
                    doloribus tempora aperiam dolor dolorem eius expedita maxime
                    nobis quae soluta distinctio, molestiae illo similique sint
                    at sunt minima accusantium explicabo.
                  </p>
                  <br />
                  <br />
                </div>
                <div className="col-md-4">
                  <div className="position-sticky" style={{ top: "2rem" }}>
                    <div className="p-4">
                      <h4 className="fst-italic">Social Media:</h4>
                      <ol className="list-unstyled mb-0">
                        <li>
                          <a href="#">Instagram</a>
                        </li>
                        <li>
                          <a href="#">FaceBook</a>
                        </li>
                        <li>
                          <a href="#">Twitter</a>
                        </li>
                        <li>
                          <a href="#">Tinder</a>
                        </li>
                        <li>
                          <a href="#">Grinder</a>
                        </li>
                        <li>
                          <a href="#">GoFWB</a>
                        </li>
                      </ol>
                    </div>
                    <div className="p-4">
                      <h4 className="fst-italic">description apa gitu:</h4>
                      <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Quis eum reiciendis sequi quibusdam suscipit quo
                        rem a. Sequi ipsum temporibus soluta minima error
                        doloremque ullam rerum optio quis, sunt est.
                      </p>

                      <button
                        type="button"
                        class="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        Launch demo modal
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

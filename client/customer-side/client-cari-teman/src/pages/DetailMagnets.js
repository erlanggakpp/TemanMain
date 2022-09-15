import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Outlet, useNavigate } from "react-router-dom";

import { loadingSet } from "../store/action/events";
import { detailMagnet, createToken } from "../store/action/magnets";
import { fetchAllUsers } from "../store/action/users";
import RoomChat from "../components/RoomChat";
import { addRequest } from "../store/action/requests";
const Swal = require("sweetalert2");

export default function DetailMagnets() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { loading } = useSelector((e) => e.events);
  const { magnetDetail } = useSelector((e) => e.magnets);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(0);
  const [flag, setFlag] = useState(false);
  const [banner, setBanner] = useState([]);
  const { loggedUser } = useSelector((e) => e.users);

  useEffect(() => {
    dispatch(detailMagnet(params.magnetId))
      .then((data) => {
        if (loggedUser.id === data.UserId) {
          setFlag(true);
        } else {
          const targetParticipant = data.Participant.find(
            (el) => el.UserId === loggedUser.id
          );
          if (targetParticipant) {
            setFlag(true);
          }
        }
        return dispatch(fetchAllUsers());
      })
      .then((data) => {
        setUsers(data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(loadingSet(false));
      });
  }, []);

  // useEffect(() => {
  //   if (loggedUser.id === magnetDetail.UserId) {
  //     setFlag(true);
  //   } else {
  //     const targetParticipant = magnetDetail.Participant.find(
  //       (el) => el.UserId === loggedUser.id
  //     );
  //     if (targetParticipant) {
  //       setFlag(true);
  //     }
  //   }
  // }, []);
  // useEffect(() => {
  //   dispatch(detailMagnet(params.magnetId)).finally(() =>
  //     dispatch(loadingSet(false))
  //   );
  // }, []);

  const [requestForm, setRequestForm] = useState({
    EventId: params.id,
    MagnetId: params.magnetId,
    requestDescription: "",
  });
  const changeRequestForm = (e) => {
    const { name, value } = e.target;
    setRequestForm({
      ...requestForm,
      [name]: value,
    });
  };
  const formRequest = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, request   it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(addRequest(requestForm))
          .then(({ data }) => {
            console.log(data, "aaaaaaaaa");
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Success send request!",
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
          })
          .finally(() => {
            dispatch(loadingSet(false));
          });
      }
    });
  };

  const gambarBanner = [
    "https://lovelytab.com/wp-content/uploads/2019/01/Tumblr-Aesthetic-Wallpapers-Free-1024x576.jpg",
    "https://studywithme.io/aesthetic-pomodoro-timer/8c50f8e334f43eee3272.jpg",
    "https://www.dictionary.com/e/wp-content/uploads/2019/07/Aesthetic_1000x700.jpg",
    "https://www.thespruce.com/thmb/DOr4WekPF1gxbfxKlE4Jw7jgv04=/420x0/filters:no_upscale():max_bytes(150000):strip_icc()/herzenstimmebedroom-0dbee000e5bf4f74b95a75078da74c76-3b0681f9eaf642e2b6b55e26cf897a97.jpg",
    "https://i.pinimg.com/736x/73/55/a0/7355a06b3c04bb8c006a0746d0ee74bd.jpg",
  ];

  useEffect(() => {
    const angkaNgasal = Math.floor(Math.random() * 5);
    setBanner(gambarBanner[angkaNgasal]);
  }, []);

  const inviteUser = (e) => {
    e.preventDefault();
    console.log(selectedUser, "<<<<<<<<<<<<<<");
  };

  const joinVideoCall = async () => {
    const channel = `Magnet${magnetDetail.id}`;
    localStorage.setItem("channelName", channel);
    await dispatch(createToken({ channel }));
    navigate("/video-call");
  };

  // console.log(magnetDetail, "ajsdjpasdjapsdjpasdj")
  if (!magnetDetail) return (
     <>
          <div className="container d-flex justify-content-center align-items-center">
            <div
              style={{ width: "200px", height: "200px", marginTop: "50px" }}
            >
              <img
                src="https://cdn.discordapp.com/attachments/1015235714780246077/1018164300940062790/loading.jpg"
                alt=""
                className="img-fluid rounded-circle"
              />
            </div>
          </div>
        </>
  );
  return (
    <>
      {loading ? (
         <>
          <div className="container d-flex justify-content-center align-items-center">
            <div
              style={{ width: "200px", height: "200px", marginTop: "50px" }}
            >
              <img
                src="https://cdn.discordapp.com/attachments/1015235714780246077/1018164300940062790/loading.jpg"
                alt=""
                className="img-fluid rounded-circle"
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <Outlet />

          <div className="containet-fluid">
            <div className="container p-0">
              <div className="row">
                <div className="col-12">
                  <img
                    src="https://cdn.discordapp.com/attachments/1015235714780246077/1019535630235095121/topdetailmagnetsa.jpg"
                    alt=""
                    className="w-100"
                  />
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row  justify-content-center">
                <div className="col-md-12  p-0" style={{ height: "300px" }}>
                  <img
                    src={magnetDetail.Event.image}
                    alt=""
                    className="img-fill card-img-top h-100 p-0"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div
                  style={{
                    width: "50%",
                    height: "200px",
                    position: "absolute",
                    margin: "200px 0px",
                  }}
                >
                  <div className="row d-flex justify-content-center">
                    <div className="col-md-6 h-100 d-flex justify-content-center">
                      <div
                        style={{
                          width: "200px",
                          height: "200px",
                          position: "center",
                        }}
                      >
                        <img
                          src={magnetDetail.User.profilePict}
                          alt=""
                          className="h-100 rounded-circle"
                        />
                      </div>
                      <div
                        className="col-md-6  text-light d-flex justify-content-center align-items-center w-100 mx-4"
                        style={{
                          borderRadius: "0 0 20px 20px",
                          opacity: "95%",
                          height: "100px",
                          marginTop: "100px",
                          backgroundColor: "#23496D",
                        }}
                      >
                        {/* {magnetDetail.specialRequirement} */}
                        <div className="row">
                          <div className="col-12  h-100 d-flex">
                            <h3 className="display-6">
                            
                                {magnetDetail.User.firstName}{" "}
                                {magnetDetail.User.lastName}
                              
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12" style={{ height: "150px" }}></div>
              </div>

              <div className="row d-flex justify-content-center">
                <div className="col-12  d-flex justify-content-center p-0">
                  <div className="row g-5" style={{ width: "100%" }}>
                    <div className="col-md-8">
                      <div className="mt-0">
                        <img
                          src="https://cdn.discordapp.com/attachments/1015235714780246077/1019532597556150312/topdetailmagnets.jpg"
                          alt=""
                          className="w-100"
                        />
                      </div>
                      <h1
                        className="w-100 text-white py-4"
                        style={{ backgroundColor: "#2E5274" }}
                      >
                        Description
                      </h1>
                      <p className="p-4">{magnetDetail.magnetDescription}</p>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Labore ipsa similique molestiae officia molestias
                        distinctio eveniet delectus dignissimos. Amet ratione
                        fuga quod repellendus hic exercitationem ad repellat
                        eius, vero numquam, temporibus aperiam impedit ab rem
                        aspernatur necessitatibus, unde dolore voluptates.
                        Laborum pariatur minus aut quae provident explicabo
                        dolorum est earum perferendis aperiam vero nobis beatae
                        repellendus atque, nesciunt, quas optio, debitis ipsum
                        commodi! Nobis error, quam aspernatur iusto ea aut
                        maxime quibusdam laudantium, repudiandae sequi cumque
                        illum rem atque nisi quae quos quia! Dicta vitae
                        doloribus quidem! Quia odit inventore libero est aperiam
                        magni rerum consequatur blanditiis voluptas repudiandae.
                        Quis.
                      </p>
                      <br />
                      <br />
                      {flag === true && (
                        <RoomChat
                          magnetId={magnetDetail.id}
                          magnetDetail={magnetDetail}
                        />
                      )}
                      <br />
                      <br />
                      {flag === true && (
                        <div className="border p-5 rounded">
                          <div
                            type="button"
                            className="w-100 bg-warning mt-10"
                            onClick={joinVideoCall}
                          >
                            <img
                              src="https://cdn.discordapp.com/attachments/1015235714780246077/1019615959201349652/vidcall.jpg"
                              alt=""
                              className="w-100"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="col-md-4">
                      <div className="position-sticky" style={{ top: "2rem" }}>
                        <div className="p-4 mb-3 rounded">
                          {magnetDetail.vacantParticipant !== 0 && (
                            <div className="mb-5 border rounded mt-2">
                              <h4 className="bg-secondary text-white  p-3">
                                request for joining
                              </h4>
                              <div className="d-flex justify-content-center align-items-center">
                                <h4 className="fst-italic">Available</h4>
                                <img
                                  src="https://cdn.discordapp.com/attachments/1015235714780246077/1019603591872401509/goyangjos.gif"
                                  alt=""
                                  className="w-25 p-2"
                                />
                              </div>
                            </div>
                          )}
                          {magnetDetail.vacantParticipant === 0 && (
                            <div className="mb-5 border rounded mt-2">
                              <h4 className="bg-secondary text-white  p-3">
                                request for joining
                              </h4>
                              <div className="d-flex justify-content-center align-items-center">
                                <h4 className="fst-italic">Not Available</h4>
                                <img
                                  src="https://media.baamboozle.com/uploads/images/488165/1634770703_15917_gif-url.gif"
                                  alt=""
                                  className="w-25 p-2"
                                />
                              </div>
                            </div>
                          )}

                          <p className="mb-0">
                            <h4 className="mb-4">Total Participant :</h4>
                            <div
                              style={{ padding: 15, borderRadius: "5px" }}
                              className="bg-warning"
                            >
                              <strong style={{ fontSize: "24px" }}>
                                {magnetDetail.vacantParticipant} /{" "}
                                {magnetDetail.participant}
                              </strong>
                            </div>
                          </p>
                          <div>
                            <button
                              type="button"
                              className="btn btn-primary my-2  w-100"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                              style={{ padding: 15, borderRadius: "5px" }}
                            >
                              request to join
                            </button>
                          </div>
                          {magnetDetail.UserId === loggedUser.id && (
                            <>
                              <div className="mt-5 border pt-3 rounded">
                                <img
                                  src="https://cdn.discordapp.com/attachments/1015235714780246077/1019591312774803550/doWantTojoin.jpg"
                                  alt=""
                                  className="w-100"
                                />
                                <div className="p-2 pt-0">
                                  <form
                                    onSubmit={(e) => inviteUser(e)}
                                    className="d-flex"
                                  >
                                    <input
                                      type="text"
                                      list="data"
                                      class="form-control"
                                      placeholder="Type to search..."
                                      id="exampleDataList"
                                      onChange={(e) =>
                                        setSelectedUser(e.target.value)
                                      }
                                    />
                                    <datalist id="data">
                                      {users.map((item, key) => (
                                        <option key={key} value={item.id}>
                                          {item.email}
                                        </option>
                                      ))}
                                    </datalist>
                                    <button
                                      type="submit"
                                      class="btn btn-dark text-white"
                                    >
                                      Send
                                    </button>
                                  </form>
                                </div>
                              </div>

                              {/* <h3>invite : </h3>
                              <div>
                                <form
                                  onSubmit={(e) => inviteUser(e)}
                                  className="d-flex"
                                >
                                  <input
                                    type="text"
                                    list="data"
                                    class="form-control"
                                    placeholder="Type to search..."
                                    id="exampleDataList"
                                    onChange={(e) =>
                                      setSelectedUser(e.target.value)
                                    }
                                  />
                                  <datalist id="data">
                                    {users.map((item, key) => (
                                      <option key={key} value={item.id}>
                                        {item.email}
                                      </option>
                                    ))}
                                  </datalist>
                                  <button
                                    type="submit"
                                    class="btn btn-dark text-white"
                                  >
                                    Send
                                  </button>
                                </form>
                              </div> */}
                            </>
                          )}
                        </div>
                        {magnetDetail.Participant.length === 0 && (
                          <h4 className="fst-italic">
                            There are no TemanMaine-ers that particpated on this
                            magnet yet
                          </h4>
                        )}

                        {magnetDetail.Participant.length !== 0 && (
                          <table class="table">
                            <thead>
                              <tr>
                                <th
                                  scope="col"
                                  className="bg-secondary text-white"
                                >
                                  No
                                </th>
                                <th scope="col">Participant List :</th>
                              </tr>
                            </thead>
                            <tbody>
                              {magnetDetail.Participant.map((el, idx) => (
                                <tr>
                                  <th
                                    scope="row"
                                    className="bg-secondary text-white"
                                  >
                                    {idx + 1}
                                  </th>
                                  <td>
                                    {el.User.firstName} {el.User.lastName}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                New message
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={formRequest}>
                <div className="mb-3">
                  <label for="message-text" className="col-form-label">
                    Message:
                  </label>
                  <textarea
                    value={requestForm.requestDescription}
                    onChange={changeRequestForm}
                    name="requestDescription"
                    className="form-control"
                    id="message-text"
                  ></textarea>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                  >
                    Send message
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

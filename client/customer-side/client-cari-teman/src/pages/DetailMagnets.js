import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Outlet } from "react-router-dom";
import { loadingSet } from "../store/action/events";
import { detailMagnet } from "../store/action/magnets";
import { fetchAllUsers } from "../store/action/users";
import RoomChat from "../components/RoomChat";
import { addRequest } from "../store/action/requests";
const Swal = require("sweetalert2");

export default function DetailMagnets() {
  const params = useParams();
  const dispatch = useDispatch();
  const { loading } = useSelector((e) => e.events);
  const { magnetDetail } = useSelector((e) => e.magnets);
  const [users, setUsers] = useState([]);
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    dispatch(fetchAllUsers())
      .then((data) => {
        setUsers(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    dispatch(detailMagnet(params.magnetId)).finally(() =>
      dispatch(loadingSet(false))
    );
  }, []);

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
            console.log(err.response.data.message, "<<err");
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

  // console.log(magnetDetail, "ajsdjpasdjapsdjpasdj")

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <Outlet />
          {/* {JSON.stringify(users)} */}
          {JSON.stringify(magnetDetail)}
          <div className="containet-fluid">
            <div className="container">
              <div className="row  justify-content-center">
                <div
                  className="col-md-12 bg-warning p-0"
                  style={{ height: "300px" }}
                >
                  <img
                    src={banner}
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
                  className="bg-primary"
                >
                  <div className="row">
                    <div className="col-md-4 bg-dark h-100">
                      <h1 className="text-white">
                        ini buat gambar yagesya sip aasd
                      </h1>
                    </div>
                    <div className="col-md-8 bg-success">
                      {" "}
                      {magnetDetail.specialRequirement}
                    </div>
                  </div>
                </div>
                <div className="col-md-12" style={{ height: "150px" }}></div>
              </div>
              <div className="row d-flex justify-content-center">
                <div className="col-10  d-flex justify-content-center p-0">
                  <div className="row g-5" style={{ width: "100%" }}>
                    <div className="col-md-8">
                      <h1>in isi ygy</h1>
                      <p className="p-4">{magnetDetail.magnetDescription}</p>
                      <br />
                      <br />
                      <RoomChat magnetId={magnetDetail.id} />
                    </div>
                    <div className="col-md-4">
                      <div className="position-sticky" style={{ top: "2rem" }}>
                        <div className="p-4 mb-3 rounded">
                          <h4 className="fst-italic">Avaiable to join</h4>
                          <p className="mb-0">
                            Total Participant :
                            <div
                              style={{ padding: 15, borderRadius: "30px" }}
                              className="bg-warning"
                            >
                              <strong>
                                {
                                  magnetDetail.vacantParticipant}{" "}
                                / {magnetDetail.participant}
                              </strong>
                            </div>
                          </p>
                          <div>
                            <button
                              type="button"
                              class="btn btn-primary my-2  w-100"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                              style={{ padding: 15, borderRadius: "30px" }}
                            >
                              request to join
                            </button>
                          </div>
                          <h3>invite : </h3>
                          <div>
                            <form action="" className="d-flex">
                              <input
                                type="text"
                                list="data"
                                class="form-control"
                                placeholder="Type to search..."
                                id="exampleDataList"
                              />
                              <datalist id="data">
                                {users.map((item, key) => (
                                  <option key={key} value={item.email} />
                                ))}
                              </datalist>
                              <button
                                type="submit"
                                class="btn btn-dark text-white"
                              >
                                send
                              </button>
                            </form>
                          </div>
                        </div>

                        <div className="p-4">
                          <h4 className="fst-italic">Participant List:</h4>
                          <ol className="list-unstyled mb-0">
                            <li>
                              <a href="#">Erlangga Teacher Goat Babat Habis</a>
                            </li>
                            <br></br>
                            <li>
                              <a href="#"></a>
                            </li>
                            <li>
                              <a href="#">Tomi Golok</a>
                            </li>
                            <li>
                              <a href="#">Winardo Celurit</a>
                            </li>
                            <li>
                              <a href="#">Mamat</a>
                            </li>
                            <li>
                              <a href="#">Rysaldi Codet</a>
                            </li>
                          </ol>
                        </div>
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
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                New message
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form onSubmit={formRequest}>
                <div class="mb-3">
                  <label for="message-text" class="col-form-label">
                    Message:
                  </label>
                  <textarea
                    value={requestForm.requestDescription}
                    onChange={changeRequestForm}
                    name="requestDescription"
                    class="form-control"
                    id="message-text"
                  ></textarea>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    class="btn btn-primary"
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

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams , Outlet} from "react-router-dom";
import { loadingSet } from "../store/action/events";
import { detailMagnet } from "../store/action/magnets";
import { fetchAllUsers } from "../store/action/users";
import RoomChat from "../components/RoomChat";
import { addRequest } from "../store/action/requests";

export default function DetailMagnets() {
  const params = useParams();
  const dispatch = useDispatch();
  const { loading } = useSelector((e) => e.events);
  const { magnetDetail } = useSelector((e) => e.magnets);
const [users, setUsers] = useState([])

useEffect(() => {
dispatch(fetchAllUsers()).then((data) => {
  setUsers(data.data)

}).catch((err) => {
  console.log(err);
})

}, [])
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
    dispatch(addRequest(requestForm))
    .then(({data})=>console.log(data, 'aaaaaaaaa'))
    .catch((err)=>console.log(err, 'errrr'))
    .finally(() => {
      dispatch(loadingSet(false));
    });
  };

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <Outlet />
          <div className="containet-fluid">
            <div className="container">
              <div className="row d-flex justify-content-center">
                <div
                  className="col-md-12 bg-warning"
                  style={{ height: "300px" }}
                >
                  <h1>ini untuk background</h1>
                  {JSON.stringify(users)}
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
                              style={{ padding: 20, borderRadius: "30px" }}
                              className="bg-warning"
                            >
                              <strong>
                                {magnetDetail.participant -
                                  magnetDetail.vacantParticipant}{" "}
                                / {magnetDetail.participant}
                              </strong>
                            </div>
                          </p>
                          <div>
                            <br />
                            <br />
                            <button
                              type="button"
                              class="btn btn-primary"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                            >
                              request to join
                            </button>
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

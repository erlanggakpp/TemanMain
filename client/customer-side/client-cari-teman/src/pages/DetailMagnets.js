import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadingSet } from "../store/action/events";
import { detailMagnet } from "../store/action/magnets";
import RoomChat from "../components/RoomChat";

export default function DetailMagnets() {
  const params = useParams();
  const dispatch = useDispatch();
  const { loading } = useSelector((e) => e.events);
  const { magnetDetail } = useSelector((e) => e.magnets);
  useEffect(() => {
    dispatch(detailMagnet(params.id)).finally(() =>
      dispatch(loadingSet(false))
    );
  }, []);
  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="containet-fluid">
          <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="col-md-12 bg-warning" style={{ height: "300px" }}>
                <h1>ini untuk background</h1>
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
              <div
                className="col-md-12 bg-light"
                style={{ height: "150px" }}
              ></div>
            </div>
            <div className="row d-flex justify-content-center">
              <div className="col-10 bg-light d-flex justify-content-center p-0">
                <div className="row g-5">
                  <div className="col-md-8">
                    <h1>in isi ygy</h1>
                    <p className="p-4">{magnetDetail.magnetDescription}</p>
                    <br />
                    <br />
                    <RoomChat />
                  </div>
                  <div className="col-md-4">
                    <div className="position-sticky" style={{ top: "2rem" }}>
                      <div className="p-4 mb-3 bg-light rounded">
                        <h4 className="fst-italic">Avaiable to join</h4>
                        <p className="mb-0">
                          <br />
                          Total Participant :{" "}
                          <span
                            style={{ padding: 20, borderRadius: "30px" }}
                            className="bg-warning"
                          >
                            <strong>
                              {magnetDetail.participant -
                                magnetDetail.vacantParticipant}{" "}
                              / {magnetDetail.participant}
                            </strong>
                          </span>
                        </p>
                        <div>
                          <br />
                          <br />
                          <button
                            type="button"
                            className="btn btn-primary btn-lg btn-block"
                          >
                            Request to join
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
      )}
    </>
  );
}

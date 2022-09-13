import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { detailEvent, loadingSet } from "../store/action/events";
import ModalMagnets from "./ModalMagnets";
export default function CardAtDetailPage({ magnets }) {
  const { loading, eventDetail } = useSelector((e) => e.events);
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailEvent(params.id)).finally(() => dispatch(loadingSet(false)));
  }, []);
  // useEffect(() => {
  //   console.log(magnets, "dari card detail magnet");
  // }, []);

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="row mb-2">
          <div
            className="row d-flex justify-content-center mb-5"
            style={{ marginLeft: "0" }}
          >
            <div
              className="col-12 d-flex align-item-center justify-content-center mt-5 py-2 text-light"
              style={{
                backgroundColor: "#2e94d1",
                borderRadius: "30px 30px 0 0 ",
              }}
            >
              <h1>Magnets</h1>
              {/* <p>{JSON.stringify(magnets)}</p> */}
            </div>
            <ModalMagnets />
          </div>
          {magnets.map((el) => {
            return (
              <div className="col-md-3" key={el.id}>
                <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                  <div className="col p-4 d-flex flex-column position-static m-2">
                    <div className=" d-flex justify-content-center">
                      <img
                        src={el.User.profilePict}
                        alt=""
                        className="img-fluid rounded-circle h-100 p-4"
                      />
                    </div>
                    <h3 className="mb-0">
                      {el.User.firstName} {el.User.lastName}
                    </h3>
                    <div className="mb-1 text-muted">{el.corfirmationDate}</div>
                    <p className="card-text mb-auto">
                      {" "}
                      participants :{" "}
                      <strong>
                        {el.vacantParticipant} / {el.participant}
                      </strong>
                    </p>
                    <strong className="d-inline-block mb-2 text-primary">
                      {el.specialRequirement}
                    </strong>
                    <Link
                      to={`magnets/${el.id}`}
                      href="#"
                      className="stretched-link"
                    ></Link>
                    <div>
                      <button
                        type="button"
                        className="btn w-100 text-white mt-3"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        style={{ backgroundColor: "#2e94d1" }}
                      >
                        <h6 style={{ color: "#white" }}>click me!</h6>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

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
  useEffect(() => {
    console.log(magnets, "dari card detail magnet");
  }, []);

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="row mb-2">
          <div
            className="row d-flex justify-content-center my-4"
            style={{ marginLeft: "0" }}
          >
            <div className="col-12 bg-dark rounded d-flex align-item-center justify-content-center py-2 text-light">
              <h1>Magnets</h1>
            </div>
            <ModalMagnets />
          </div>
          {magnets.map((el) => {
            return (
              <div className="col-md-3" key={el.id}>
                <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                  <div className="col p-4 d-flex flex-column position-static">
                    <strong className="d-inline-block mb-2 text-primary">
                      {el.specialRequirement}
                    </strong>
                    <h3 className="mb-0">
                      {el.User.firstName}
                      {el.User.lastName}
                    </h3>
                    <div className="mb-1 text-muted">Nov 12</div>
                    <p className="card-text mb-auto">{el.magnetDescription}</p>
                    <Link
                      to={`magnets/${el.id}`}
                      href="#"
                      className="stretched-link"
                    >
                      Continue reading
                    </Link>
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

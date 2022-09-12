import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchEvent, loadingSet } from "../store/action/events";

export default function MainCard() {
  const { events, eventDetail, loading } = useSelector((e) => e.events);
  const iseng = "a";
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEvent()).finally(() => {
      dispatch(loadingSet(false));
    });
  }, []);

  return (
    <>
      <section className="card py-5 " style={{ border: 0 }}>
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
          // <p>
          //   {JSON.stringify(events)}
          // </p>
          <div className="container px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-3 justify-content-center">
              {events.map((e) => (
                <div className="col mb-5" key={e.id}>
                  <div className="card h-100">
                    <img className="card-img-top" src={e.image} alt="..." />
                    <div className="card-body ">
                      <div className="text-center">
                        <h5 className="fw-bolder"> {e.name}</h5>
                        Rp. {e.ticketPrice}
                      </div>
                    </div>
                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                      <div className="text-center">
                        <div
                          className="btn-group"
                          role="group"
                          aria-label="Basic example"
                        >
                            <button type="button" className="btn btn-secondary">
                          <Link to={`/events/${e.id}`} style={{textDecorationLine : "none", color : "white"}}>
                              Detail
                          </Link>
                            </button>
                          <button type="button" className="btn btn-secondary">
                            Buy
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}

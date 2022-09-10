import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchEvent, loadingSet } from "../store/action/events";

export default function MainCard() {
  const { events, eventDetail, loading } = useSelector((e) => e.events);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEvent()).finally(() => {
      dispatch(loadingSet(false));
    });
  }, [events]);

  return (
    <main>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="album py-5 bg-light">
          <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              {events.map((e) => {
                return (
                  <div className="col" key={e.id}>
                    <div className="card shadow-sm">
                      <svg
                        className="bd-placeholder-img card-img-top"
                        width="100%"
                        height="225"
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                        aria-label="Placeholder: Thumbnail"
                        preserveAspectRatio="xMidYMid slice"
                        focusable="false"
                      >
                        <title>Placeholder</title>
                        <rect
                          style={{ position: "relative" }}
                          width="100%"
                          height="100%"
                          fill="#55595c"
                        />

                        <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                          {e.name}
                        </text>
                      </svg>
                      <img
                        src={e.image}
                        style={{
                          height: "100%",
                          width: "100%",
                        }}
                      />
                      <div className="card-body">
                        <p className="card-text">Price: {e.ticketPrice}</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="btn-group">
                            <Link to={`/events/${e.id}`}>
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-secondary"
                              >
                                View
                              </button>
                            </Link>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-secondary"
                            >
                              <a href={e.eventHomepageLink}>Event Link</a>
                            </button>
                          </div>

                          <small className="text-muted">
                            <p>{e.eventDate}</p>
                            <p>{e.eventDuration} Event</p>
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

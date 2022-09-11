import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchEvent, loadingSet } from "../store/action/events";

export default function MainCard() {
  const { events, eventDetail, loading } = useSelector((e) => e.events);
  const iseng = "a"
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEvent()).finally(() => {
      dispatch(loadingSet(false));
    });
  }, []);

  return (
    <>
      <section className="card py-5 " style={{ border: 0 }}>
        {iseng == "a" ? (
          <>
            <div className="container d-flex justify-content-center align-items-center">
              <div
                style={{ width: "200px", height: "200px" , marginTop : "50px"}}
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
          <div class="container px-4 px-lg-5">
            <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-3 justify-content-center">
              {events.map((e) => (
                <div class="col mb-5" key={e.id}>
                  <div class="card h-100">
                    <img class="card-img-top" src={e.image} alt="..." />
                    <div class="card-body ">
                      <div class="text-center">
                        <h5 class="fw-bolder"> {e.name}</h5>
                        Rp. {e.ticketPrice}
                      </div>
                    </div>
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                      <div class="text-center">
                        <div
                          class="btn-group"
                          role="group"
                          aria-label="Basic outlined example"
                        >
                          <button type="button" class="btn btn-outline-dark">
                            Detail
                          </button>
                          <button type="button" class="btn btn-outline-dark">
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

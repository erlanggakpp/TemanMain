import TopBanner from "../compDetailEvent/TopBanner";
import CardAtDetailPage from "../compDetailEvent/CardAtDetailPage";
import SideMenu from "../compDetailEvent/SideMenu";
import { useParams, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailEvent, loadingSet } from "../store/action/events";

export default function DetailEvent() {
  const params = useParams();
  const dispatch = useDispatch();
  const { loading, eventDetail } = useSelector((e) => e.events);
  const [loadingEvent, setLoadingEvent] = useState(true);
  useEffect(() => {
    dispatch(detailEvent(params.id))
      .then((data) => {
        setLoadingEvent(false);
      })
      .finally(() => {
        dispatch(loadingSet(false));
      });
  }, []);

  return (
    // <h1>hallo</h1>
    <>
      {loadingEvent ? (
        <>
          <div className="container d-flex justify-content-center align-items-center">
            <div style={{ width: "200px", height: "200px", marginTop: "50px" }}>
              <img
                src="https://cdn.discordapp.com/attachments/1015235714780246077/1018164300940062790/loading.jpg"
                alt=""
                className="img-fluid rounded-circle"
              />
              {/* <h1>loading</h1> */}
            </div>
          </div>
        </>
      ) : (
        <>
          <Outlet />
          {/* <p>{JSON.stringify(eventDetail)}</p> */}
          <div className="container" style={{ marginTop: "100px" }}>
            <div className="container">
              <TopBanner eventDetail={eventDetail} />
              {eventDetail.Magnets ? (
                <div className="container d-flex justify-content-center align-items-center">
                  <CardAtDetailPage magnets={eventDetail.Magnets} />
                </div>
              ) : (
                <>
                  <div className="container d-flex justify-content-center align-items-center">
                    <div
                      style={{
                        width: "200px",
                        height: "200px",
                        marginTop: "50px",
                      }}
                    >
                      <img
                        src="https://cdn.discordapp.com/attachments/1015235714780246077/1018164300940062790/loading.jpg"
                        alt=""
                        className="img-fluid rounded-circle"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="row g-5">
                <div className="col-md-8">
                  <div>
                    <img
                      src="https://cdn.discordapp.com/attachments/1015235714780246077/1019549816092626974/descriptionStdOut.jpg"
                      alt=""
                      className="w-100 mb-5"
                    />
                  </div>
                  <p>{eventDetail.description}</p>
                  <br />
                  <br />
                </div>
                <SideMenu
                  toSide={{
                    location: eventDetail.location,
                    eventDate: eventDetail.eventDate,
                    eventDuration: eventDetail.eventDuration,
                    price: eventDetail.ticketPrice,
                  }}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

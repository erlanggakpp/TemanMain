import TopBanner from "../compDetailEvent/TopBanner";
import CardAtDetailPage from "../compDetailEvent/CardAtDetailPage";
import SideMenu from "../compDetailEvent/SideMenu";
import { useParams, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailEvent, loadingSet } from "../store/action/events";

export default function DetailEvent() {
  const params = useParams();
  const dispatch = useDispatch();
  const { loading, eventDetail } = useSelector((e) => e.events);
  useEffect(() => {
    dispatch(detailEvent(params.id)).finally(() => dispatch(loadingSet(false)));
  }, []);

  return (
    // <h1>hallo</h1>
    <>
      {!eventDetail ? (
        <h1>Loading...</h1>
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
                <h1>Loading...</h1>
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

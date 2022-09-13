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
          <div className="container">
            <div className="container">
              <TopBanner eventDetail={eventDetail} />
              {eventDetail.Magnets ? (
                <CardAtDetailPage magnets={eventDetail.Magnets} />
              ) : (
                <h1>Loading...</h1>
              )}
              <div className="row">
                <div className="col-8 bg-warning" style={{ height: "5px" }}>
                  
                </div>
                <div className="col-4 bg-primary" style={{ height: "5px" }}>
                  
                </div>
              </div>

              <div className="row g-5">
                <div className="col-md-8">
                  <h1 className="m-5">Description</h1>
                  <p>{eventDetail.description}</p>
                  <br />
                  <br />
                  {/* <div className="row">
                    <div className="col-6 bg-warning">test</div>
                    <div className="col-6 bg-primary">haha</div>
                  </div> */}
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

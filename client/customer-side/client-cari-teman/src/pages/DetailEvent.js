import TopBanner from "../compDetailEvent/TopBanner";
import CardAtDetailPage from "../compDetailEvent/CardAtDetailPage";
import SideMenu from "../compDetailEvent/SideMenu";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailEvent, loadingSet } from "../store/action/events";

export default function DetailEvent() {
  const params = useParams();
  const dispatch = useDispatch();
  const { loading, eventDetail } = useSelector((e) => e.events);

  useEffect(() => {
    console.log("detail event");
    dispatch(detailEvent(params.id)).finally(() => dispatch(loadingSet(false)));
  }, []);
  return (
    // <h1>hallo</h1>
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="container">
          <div className="container">
            <TopBanner name={eventDetail.name} />
            <CardAtDetailPage />

            <div className="row g-5">
              <div className="col-md-8">
                <h1>in isi ygy</h1>
                <p>{eventDetail.description}</p>
                <br />
                <br />
                <div className="row">
                  <div className="col-6 bg-warning">test</div>
                  <div className="col-6 bg-primary">haha</div>
                </div>
              </div>
              <SideMenu
                toSide={{
                  location: eventDetail.location,
                  eventDate: eventDetail.eventDate,
                  eventDuration: eventDetail.eventDuration,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// import NavBar from "../components/NavBar";
import CarouselComp from "../components/CarouselComp";
import CategoryCarou from "../components/CategoryCarou";
import FilterSide from "../components/FilterSide";
import MainCard from "../components/MainCard";

import { useEffect, useState } from "react";
import { detailEvent, fetchEvent, loadingSet } from "../store/action/events";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../store/action/categories";
import { detailMagnet, fetchMagnet } from "../store/action/magnets";

// const styleRound = {width : 20%}

export default function HomePage() {
  const dispatch = useDispatch();
  const { events, eventDetail, loading } = useSelector((e) => e.events);
  const { categories } = useSelector((e) => e.categories);
  const { magnets, magnetDetail } = useSelector((e) => e.magnets);
  const [showEvents, setShowEvents] = useState([]);
  useEffect(() => {
    dispatch(fetchEvent()).finally(() => {
      dispatch(loadingSet(false));
    });
    dispatch(detailEvent(2)).finally(() => {
      dispatch(loadingSet(false));
    });
    dispatch(fetchCategory()).finally(() => {
      dispatch(loadingSet(false));
    });
    dispatch(fetchMagnet()).finally(() => {
      dispatch(loadingSet(false));
    });
    dispatch(detailMagnet(1)).finally(() => {
      console.log(magnetDetail);
      dispatch(loadingSet(false));
    });
  }, []);
  // if(events.length == 0) return(<h1>Loading...</h1>)

  return (
    <>
      <div className="container-fluid">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div style={{ height: "200px" }} className="bg-warning">
                <h1>INI BUAT LOGO</h1>
              </div>
              <CarouselComp />
              <CategoryCarou />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-3">
              <h1>ini buat filter</h1>
              <FilterSide />
            </div>
            <div className="col-9">
              <h1>ini buat card</h1>
              <MainCard showEvents={showEvents} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

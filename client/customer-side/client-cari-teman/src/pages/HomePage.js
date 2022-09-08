// import NavBar from "../components/NavBar";
import CarouselComp from "../components/CarouselComp";
import CategoryCarou from "../components/CategoryCarou";

import { useEffect, useState } from "react";
import { detailEvent, fetchEvent, loadingSet } from "../store/action/events";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../store/action/categories";
import { fetchMagnet } from "../store/action/magnets";

// const styleRound = {width : 20%}

export default function HomePage() {
  const dispatch = useDispatch();
  const { events, eventDetail, loading } = useSelector((e) => e.events);
  const { categories } = useSelector((e) => e.categories);
  const { magnets } = useSelector((e) => e.magnets);

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
  }, []);
  // if(events.length == 0) return(<h1>Loading...</h1>)
  return (
    <>
      <div className="container-fluid">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div style={{ height: "200px" }}>
                <h1>INI BUAT LOGO</h1>
              </div>
              <CarouselComp />
              <CategoryCarou />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-3 bg-warning">
              <h1>ini buat filter</h1>
            </div>
            <div className="col-9 bg-primary">
              <h1>ini buat card</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

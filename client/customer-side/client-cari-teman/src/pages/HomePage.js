import axios from "axios";
// import NavBar from "../components/NavBar";
import CarouselComp from "../components/CarouselComp";
import CategoryCarou from "../components/CategoryCarou";
import FilterSide from "../components/FilterSide";
import MainCard from "../components/MainCard";

import { useEffect, useState } from "react";
import { fetchEvent } from "../store/action/events";
import { useDispatch, useSelector } from "react-redux";

// const styleRound = {width : 20%}

export default function HomePage() {
    const dispatch = useDispatch()
    const {events} = useSelector((e)=>e.events)
    useEffect(()=>{
        dispatch(fetchEvent())
        console.log(events);
    }, [])
    // if(events.length == 0) return(<h1>Loading...</h1>)
  return (
    <>
      {/* <h1>{JSON.stringify(events)}</h1> */}
      <div className="container-fluid">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div style={{height : "200px"}} className="bg-warning">
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
              <FilterSide/>
            </div>
            <div className="col-9">
              <h1>ini buat card</h1>
              <MainCard/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


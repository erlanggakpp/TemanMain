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
  const { magnets, magnetDetail } = useSelector((e) => e.magnets);
  const { loggedUser } = useSelector((e) => e.users);
  const [showEvents, setShowEvents] = useState([]);
  const [displayedEvents, setDisplayedEvents] = useState([]);
  const [displayedMagnets, setDisplayedMagnets] = useState([]);

  const categoryFiltering = (id) => {
    if (+id === 0) {
      setDisplayedEvents(events);
    } else {
      const filteredEvents = events.filter((el) => el.CategoryId === id);
      setDisplayedEvents(filteredEvents);
    }
  };

  useEffect(() => {
    dispatch(fetchMagnet())
      .then((data) => {
        console.log(data, "<<<<<<<<<<<<");
        setDisplayedMagnets(data);
      })
      .finally(() => {
        dispatch(loadingSet(false));
      });
  }, []);
  // console.log(displayedMagnets, "masoook");
  useEffect(() => {
    dispatch(fetchEvent())
      .then((data) => {
        setDisplayedEvents(data);
      })
      .finally(() => {
        dispatch(loadingSet(false));
      });

    // dispatch(detailEvent(2)).finally(() => {
    //   dispatch(loadingSet(false));
    // });
    // dispatch(fetchMagnet()).finally(() => {
    //   dispatch(loadingSet(false));
    // });

    // dispatch(detailMagnet(1)).finally(() => {
    //   console.log(magnetDetail);
    //   dispatch(loadingSet(false));
    // });
  }, []);
  const magnetFiltering = (filt) => {
    let res = [];

    if (filt.name == "gender") {
      magnets.forEach((el) => {
        if (el.specialRequirement == filt.filter) {
          res.push(el);
        }
      });
    } else {
      magnets.forEach((el) => {
        if (
          el.ageRequirement >= filt.filter &&
          el.ageRequirement <= 18 &&
          filt.filter == 10
        ) {
          res.push(el);
        } else if (
          el.ageRequirement >= filt.filter &&
          el.ageRequirement <= 25 &&
          filt.filter == 19
        ) {
          res.push(el);
        }
        if (
          el.ageRequirement >= filt.filter &&
          el.ageRequirement <= 40 &&
          filt.filter == 26
        ) {
          res.push(el);
        }
        if (
          el.ageRequirement >= filt.filter &&
          el.ageRequirement <= 70 &&
          filt.filter == 41
        ) {
          res.push(el);
        }
      });
    }

    setDisplayedMagnets(res);
  };
  return (
    <>
      <div className="container-fluid">
        <div>
          <div className="row">
            <div className="col-12 mt-5">
              <div
                style={{ height: "150px", backgroundColor: "#2e94d1" }}
                className="d-flex justify-content-center mb-4 mt-4"
              >
                <img
                  src="https://cdn.discordapp.com/attachments/1015235714780246077/1018164301342720091/bannerTemanMain.jpg"
                  alt=""
                  className="img-fluid"
                />
              </div>
              {/* <CategoryCarou categoryFiltering={categoryFiltering} /> */}
              <div className="container">
                <img
                  src="https://cdn.discordapp.com/attachments/1015235714780246077/1019508603910103050/fixBanner_2.jpg"
                  alt=""
                  className="w-100"
                />
              </div>
              <CarouselComp />
              <div className="container mt-5">
                <img
                  src="https://cdn.discordapp.com/attachments/956894472120205352/1019499617710252093/stipevent.jpg"
                  alt=""
                  className="w-100"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-3 mt-5">
              <FilterSide
                categoryFiltering={categoryFiltering}
                magnetFiltering={magnetFiltering}
              />
            </div>
            <div className="col-9">
              {/* <h1 className="display-4 mt-2">on going events</h1> */}
              <MainCard displayedEvents={displayedEvents} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

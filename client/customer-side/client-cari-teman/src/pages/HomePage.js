// import NavBar from "../components/NavBar";
import CarouselComp from '../components/CarouselComp';
import CategoryCarou from '../components/CategoryCarou';
import FilterSide from '../components/FilterSide';
import MainCard from '../components/MainCard';

import { useEffect, useState } from 'react';
import { detailEvent, fetchEvent, loadingSet } from '../store/action/events';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory } from '../store/action/categories';
import { detailMagnet, fetchMagnet } from '../store/action/magnets';

// const styleRound = {width : 20%}

export default function HomePage() {
  const dispatch = useDispatch();
  const { events, eventDetail, loading } = useSelector((e) => e.events);
  const [displayedEvents, setDisplayedEvents] = useState([]);
  const { magnets, magnetDetail } = useSelector((e) => e.magnets);
  const [showEvents, setShowEvents] = useState([]);

  const categoryFiltering = (id) => {
    if (+id === 0) {
      setDisplayedEvents(events);
    } else {
      const filteredEvents = events.filter((el) => el.CategoryId === id);
      setDisplayedEvents(filteredEvents);
    }
  };

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
    dispatch(fetchMagnet()).finally(() => {
      dispatch(loadingSet(false));
    });

    // dispatch(detailMagnet(1)).finally(() => {
    //   console.log(magnetDetail);
    //   dispatch(loadingSet(false));
    // });
  }, []);
  // if(events.length == 0) return(<h1>Loading...</h1>)

  return (
    <>
      <div className="container-fluid">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div
                style={{ height: '150px', backgroundColor: '#2e94d1' }}
                className="d-flex justify-content-center mb-4 mt-4"
              >
                <img
                  src="https://cdn.discordapp.com/attachments/1015235714780246077/1018164301342720091/bannerTemanMain.jpg"
                  alt=""
                  className="img-fluid"
                />
              </div>
              <CarouselComp />
              {/* <CategoryCarou categoryFiltering={categoryFiltering} /> */}
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-3 mt-5">
              <FilterSide />
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

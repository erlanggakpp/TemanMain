import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { detailEvent, loadingSet } from "../store/action/events";

export default function SideMenu({ toSide }) {
  const { loading } = useSelector((e) => e.events);
  // const dispatch = useDispatch();
  // const params = useParams();
  // useEffect(() => {
  //   console.log(params.id);
  //   dispatch(detailEvent(params.id)).finally(() => {
  //     dispatch(loadingSet(false));
  //   });
  // }, []);
  useEffect(() => {
    console.log(toSide, "dari side menu");
  }, []);

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="col-md-4">
          <div className="position-sticky" style={{ top: "2rem" }}>
            <div className="p-4 mb-3 bg-light rounded">
              <h4 className="fst-italic">create magnets</h4>
              {/* <h4 className="fst-italic">WhEn UwHerre ?!</h4>
            <p className="mb-0">{toSide.location}</p>
            <p className="mb-0">{toSide.eventDate}</p>
            <p className="mb-0">{toSide.eventDuration}</p> */}
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                + magnets
              </button>
              {/* form nya ditaro di bawah tulisan magnets di halaman sebelah*/}
            </div>
            <div className="p-4 mb-3 bg-light rounded">
              <h4 className="fst-italic">About</h4>
              <p className="mb-0">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Officia sint molestiae, veritatis eligendi consequatur possimus
                illo consectetur accusamus voluptas pariatur!
              </p>
            </div>

            <div className="p-4 mb-3 bg-light rounded" style={{
  overflow: "hidden",
  background: "none" ,
  height: "auto",
  width: "100%",
}}>
              <h4 className="fst-italic">Maps</h4>
              <iframe
                src="https://maps.google.com/maps?q=-6.1682337,106.828319&t=&z=13&ie=UTF8&iwloc=&output=embed"
                style={{
                  width: "100%",
                  height: "auto",
                  frameborder: 0,
                  border: 0,
                  objectFit: "cover",
                }}
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
              ></iframe>
            </div>

            <div className="p-4">
              <h4 className="fst-italic">Archives</h4>
              <ol className="list-unstyled mb-0">
                <li>
                  <a href="#">March 2021</a>
                </li>
                <li>
                  <a href="#">February 2021</a>
                </li>
                <li>
                  <a href="#">January 2021</a>
                </li>
                <li>
                  <a href="#">December 2020</a>
                </li>
                <li>
                  <a href="#">November 2020</a>
                </li>
                <li>
                  <a href="#">October 2020</a>
                </li>
                <li>
                  <a href="#">September 2020</a>
                </li>
                <li>
                  <a href="#">August 2020</a>
                </li>
                <li>
                  <a href="#">July 2020</a>
                </li>
                <li>
                  <a href="#">June 2020</a>
                </li>
                <li>
                  <a href="#">May 2020</a>
                </li>
                <li>
                  <a href="#">April 2020</a>
                </li>
              </ol>
            </div>

            <div className="p-4">
              <h4 className="fst-italic">Elsewhere</h4>
              <ol className="list-unstyled">
                <li>
                  <a href="#">GitHub</a>
                </li>
                <li>
                  <a href="#">Twitter</a>
                </li>
                <li>
                  <a href="#">Facebook</a>
                </li>
              </ol>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

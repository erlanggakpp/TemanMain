import { useEffect } from "react";
// import Carousel from "react-bootstrap/Carousel";
import { useDispatch, useSelector } from "react-redux";
import { loadingSet } from "../store/action/events";
import { fetchCategory } from "../store/action/categories";

export default function CategoryCarou() {
  const dispatch = useDispatch()

  const { categories } = useSelector((e) => e.categories);
  useEffect(() => {
    dispatch(fetchCategory()).finally(() => {
      dispatch(loadingSet(false));
    });

 
  });
  return (
    <>
      <div className="container" style={{ padding: 0 }}>
        <div className="row">
          <div className="col-12 d-flex">
            <div className="col-2">
              <img
                src="https://www.igsd.org/wp-content/uploads/2014/12/cropped-IGSD-logo.png"
                alt=""
                className="w-100 rounded-circle p-2"
              />
            </div>
            <div className="col-2">
              <img
                src="https://www.igsd.org/wp-content/uploads/2014/12/cropped-IGSD-logo.png"
                alt=""
                className="w-100 rounded-circle p-2"
              />
            </div>
            <div className="col-2">
              <img
                src="https://www.igsd.org/wp-content/uploads/2014/12/cropped-IGSD-logo.png"
                alt=""
                className="w-100 rounded-circle p-2"
              />
            </div>
            <div className="col-2">
              <img
                src="https://www.igsd.org/wp-content/uploads/2014/12/cropped-IGSD-logo.png"
                alt=""
                className="w-100 rounded-circle p-2"
              />
            </div>
            <div className="col-2">
              <img
                src="https://www.igsd.org/wp-content/uploads/2014/12/cropped-IGSD-logo.png"
                alt=""
                className="w-100 rounded-circle p-2"
              />
            </div>
            <div className="col-2">
              <img
                src="https://www.igsd.org/wp-content/uploads/2014/12/cropped-IGSD-logo.png"
                alt=""
                className="w-100 rounded-circle p-2"
              />
            </div>
            
          </div>
        </div>
      </div>
    </>
    //     <div>
    //       <div
    //         className="row"
    //         style={{
    //           display: "flex",
    //           flexWrap: "wrap",
    //           justifyContent: "space-between",
    //         }}
    //       >
    //         <div className="col-2">
    //           <img
    //             className=" img-top-fluid img-rounded-circle"
    //             src="https://img.freepik.com/free-vector/music-event-poster-template-with-colorful-shapes_1361-1591.jpg?w=2000"
    //             alt="First slide"
    //             style={styleCarousel}
    //           />
    //         </div>
    //         <div className="col-2">
    //           {" "}
    //           <img
    //             className="d-block w-100 rounded-pill"
    //             src="https://img.freepik.com/free-vector/music-event-poster-template-with-colorful-shapes_1361-1591.jpg?w=2000"
    //             alt="First slide"
    //             // style={styleCarousel}
    //           />
    //         </div>
    //         <div className="col-2">
    //           {" "}
    //           <img
    //             className="d-block w-100 rounded-pill"
    //             src="https://img.freepik.com/free-vector/music-event-poster-template-with-colorful-shapes_1361-1591.jpg?w=2000"
    //             alt="First slide"
    //             // style={styleCarousel}
    //           />
    //         </div>
    //         <div className="col-2">
    //           {" "}
    //           <img
    //             className="d-block w-100 rounded-pill"
    //             src="https://img.freepik.com/free-vector/music-event-poster-template-with-colorful-shapes_1361-1591.jpg?w=2000"
    //             alt="First slide"
    //             // style={styleCarousel}
    //           />
    //         </div>
    //         <div className="col-2">
    //           {" "}
    //           <img
    //             className="d-block w-100 rounded-pill"
    //             src="https://img.freepik.com/free-vector/music-event-poster-template-with-colorful-shapes_1361-1591.jpg?w=2000"
    //             alt="First slide"
    //             // style={styleCarousel}
    //           />
    //         </div>
    //         <div className="col-2">
    //           {" "}
    //           <img
    //             className="d-block w-100 rounded-pill"
    //             src="https://img.freepik.com/free-vector/music-event-poster-template-with-colorful-shapes_1361-1591.jpg?w=2000"
    //             alt="First slide"
    //             // style={styleCarousel}
    //           />
    //         </div>
    //       </div>
    //     </div>
    //   </div>
  );
}

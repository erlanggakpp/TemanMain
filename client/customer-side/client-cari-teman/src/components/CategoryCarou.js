import { useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";

const styleCarousel = {
  objectFit: "cover",
  margin: "30px 0px",

};

export default function CategoryCarou() {
  // useEffect(() => {});
  return (
    <div>
      <div>
        <div
          className="row"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <div className="col-2">
            <img
              className="d-block w-100 rounded-pill"
              src="https://img.freepik.com/free-vector/music-event-poster-template-with-colorful-shapes_1361-1591.jpg?w=2000"
              alt="First slide"
              style={styleCarousel}
            />
          </div>
          <div className="col-2">
            {" "}
            <img
              className="d-block w-100 rounded-pill"
              src="https://img.freepik.com/free-vector/music-event-poster-template-with-colorful-shapes_1361-1591.jpg?w=2000"
              alt="First slide"
              style={styleCarousel}
            />
          </div>
          <div className="col-2">
            {" "}
            <img
              className="d-block w-100 rounded-pill"
              src="https://img.freepik.com/free-vector/music-event-poster-template-with-colorful-shapes_1361-1591.jpg?w=2000"
              alt="First slide"
              style={styleCarousel}
            />
          </div>
          <div className="col-2">
            {" "}
            <img
              className="d-block w-100 rounded-pill"
              src="https://img.freepik.com/free-vector/music-event-poster-template-with-colorful-shapes_1361-1591.jpg?w=2000"
              alt="First slide"
              style={styleCarousel}
            />
          </div>
          <div className="col-2">
            {" "}
            <img
              className="d-block w-100 rounded-pill"
              src="https://img.freepik.com/free-vector/music-event-poster-template-with-colorful-shapes_1361-1591.jpg?w=2000"
              alt="First slide"
              style={styleCarousel}
            />
          </div>
          <div className="col-2">
            {" "}
            <img
              className="d-block w-100 rounded-pill"
              src="https://img.freepik.com/free-vector/music-event-poster-template-with-colorful-shapes_1361-1591.jpg?w=2000"
              alt="First slide"
              style={styleCarousel}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

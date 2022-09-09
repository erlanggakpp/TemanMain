import { useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";

const styleCarousel = {
  maxHeight: "300px",
  maxWidth: "20%",
  objectFit: "cover",
  margin: "30px 0px",
  borderRadius: "0.25em",
};

export default function CategoryCarou() {
  // useEffect(() => {});
  return (
    <div>
      <div>
        <div
          className="rounded"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <img
            className="d-block w-100 round"
            src="https://img.freepik.com/free-vector/music-event-poster-template-with-colorful-shapes_1361-1591.jpg?w=2000"
            alt="First slide"
            style={styleCarousel}
          />
          <img
            className="d-block w-100"
            src="https://img.freepik.com/free-vector/music-event-poster-template-with-colorful-shapes_1361-1591.jpg?w=2000"
            alt="First slide"
            style={styleCarousel}
          />
          <img
            className="d-block w-100"
            src="https://img.freepik.com/free-vector/music-event-poster-template-with-colorful-shapes_1361-1591.jpg?w=2000"
            alt="First slide"
            style={styleCarousel}
          />
          <img
            className="d-block w-100"
            src="https://img.freepik.com/free-vector/modern-music-event-poster-template_1361-1292.jpg?w=2000"
            alt="Second slide"
            style={styleCarousel}
          />
        </div>
      </div>
    </div>
  );
}

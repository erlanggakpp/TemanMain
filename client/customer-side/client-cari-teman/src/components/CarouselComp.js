import Carousel from "react-bootstrap/Carousel";

const styleCarousel = {"max-height" : "300px", "objectFit" : "cover"}

export default function CarouselComp() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://img.freepik.com/free-vector/music-event-poster-template-with-colorful-shapes_1361-1591.jpg?w=2000"
          alt="First slide"
          style={styleCarousel}
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://img.freepik.com/free-vector/modern-music-event-poster-template_1361-1292.jpg?w=2000"
          alt="Second slide"
          style={styleCarousel}
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://as1.ftcdn.net/v2/jpg/03/11/68/64/1000_F_311686471_OZgYo4O3161KrBdaSa1Xsgynq0EMsDh7.jpg"
          alt="Third slide"
          style={styleCarousel}
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

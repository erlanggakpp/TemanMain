import Carousel from "react-bootstrap/Carousel";

const styleCarousel = { maxHeight: "400px", objectFit: "cover" };

export default function CarouselComp() {
  return (
    <Carousel className="container">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://cdn.discordapp.com/attachments/956894472120205352/1019493348890923088/banner1.jpg"
          alt="First slide"
          style={styleCarousel}
        />
    
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://cdn.discordapp.com/attachments/956894472120205352/1019493349255806976/banner2.jpg"
          alt="Second slide"
          style={styleCarousel}
        />

   
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://cdn.discordapp.com/attachments/956894472120205352/1019493349511671849/banner3.jpg"
          alt="Third slide"
          style={styleCarousel}
        />

  
      </Carousel.Item>
    </Carousel>
  );
}

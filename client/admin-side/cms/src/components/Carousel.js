import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../store/actions';
import Container from 'react-bootstrap/Container';
import spinner from '../assets/spinner.gif'


export default function CarouselHome() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const { events } = useSelector((state) => state.event)

    useEffect(() => {
        dispatch(fetchEvents())
            .finally(() => setLoading(false))
    }, [])

    const image = {
        maxHeight: '450px',
        objectFit: "cover",
        marginLeft: 300,
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed!important",
        backgroundSize: "cover!important",
        backgroundPosition: "center!important"
    }

    const container = {
        padding: "20px",
    }

    const spinnercontainer = {
        display: 'flex',
        padding: "100px",
        justifyContent: 'center',
    }
    const imageLoading = {
        width: '400px',
        height: '400px',
    }

    return (
        <Container lg={true} style={container}>
            <Carousel variant="dark">
                {loading ? (
                    <Container style={spinnercontainer}>
                        <img src={spinner} style={imageLoading} />
                    </Container>
                ) : (
                    events.data.map((event) => {
                        return (
                            <Carousel.Item className="justify-content-center">
                                <img
                                    className="d-flex h-50 w-50 justify-content-center"
                                    src={event.image}
                                    style={image}
                                    alt="First slide"
                                />
                                <Carousel.Caption style={{ textDecorationColor: '#1a4065' }}>
                                    <h5>{event.name}</h5>
                                </Carousel.Caption>
                            </Carousel.Item>
                        )
                    })
                )}
            </Carousel>
        </Container>
    )
}

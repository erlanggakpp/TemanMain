import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchEventById, updateEvent, fetchCategories } from '../store/actions';
import Swal from 'sweetalert2'
import spinner from '../assets/spinner.gif'



export default function EventEdit() {
  const container = {
    padding: '150px',
  };
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { detailevents } = useSelector((state) => state.event);
  const { categories } = useSelector((state) => state.category);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    dispatch(fetchCategories())
      .finally(() => setLoading(false));
  }, []);
  const [editEvent, setEditEvent] = useState({
    name: '',
    location: '',
    description: '',
    eventDate: '',
    eventHomepageLink: '',
    eventDuration: '',
    AdmindId: 1,
    image: '',
    ticketPrice: '',
    CategoryId: '',
  });
  const changeInputEvent = (e) => {
    const { name, value } = e.target;
    setEditEvent({
      ...editEvent,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateEvent(id, editEvent))
      .then((data) => {
        Swal.fire(
          'success',
          data.data.message,
          'success'
        )
      })
      .then((_) => {
        navigate(`/listevent`);
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.message,
        })
      });
  };

  useEffect(() => {
    dispatch(fetchEventById(id))
      .finally(() => setLoading(false));
  }, []);

  const spinnercontainer = {
    display: 'flex',
    padding: "100px",
    justifyContent: 'center',
  }
  const image = {
    width: '400px',
    height: '400px',
  };

  const formatdate = (date) => {
    // console.log(date)
    const newdate = new Date(date).toISOString().split('T')[0]
    return newdate
  };
  useEffect(() => {
    if (detailevents?.data?.name) {
      setEditEvent({
        name: detailevents?.data?.name,
        location: detailevents?.data?.location,
        description: detailevents?.data?.description,
        eventDate: formatdate(detailevents?.data?.eventDate),
        eventHomepageLink: detailevents?.data?.eventHomepageLink,
        eventDuration: detailevents?.data?.eventDuration,
        AdmindId: 1,
        image: detailevents?.data?.image,
        ticketPrice: detailevents?.data?.ticketPrice,
        CategoryId: detailevents?.data?.CategoryId,
      });
    }
  }, [detailevents]);


  return (
    <Container sm>
      <Form onSubmit={handleSubmit}>
        <Col md={{ span: 7, offset: 3 }}>
          {loading ? (
            <Container style={spinnercontainer}>
              <img src={spinner} style={image} />
            </Container>
          ) : (
            <Row style={container}>
              <h2 style={{ textAlign: 'center' }}>Form Edit Event</h2>
              <div classname="container-sm mt-5">
                <Form.Group
                  className="mb-1"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name="name"
                    type="text"
                    placeholder="Name Of Event"
                    onChange={changeInputEvent}
                    value={editEvent.name}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-1"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    name="location"
                    type="text"
                    placeholder="Event location"
                    onChange={changeInputEvent}
                    value={editEvent.location}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-1"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    name="description"
                    as="textarea"
                    rows={3}
                    placeholder="Description this Event"
                    onChange={changeInputEvent}
                    value={editEvent.description}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-1"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Event Date</Form.Label>
                  <Form.Control
                    name="eventDate"
                    type="Date"
                    onChange={changeInputEvent}
                    value={editEvent.eventDate}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-1"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Event Link</Form.Label>
                  <Form.Control
                    name="eventHomepageLink"
                    type="text"
                    placeholder="Event Homepage Link"
                    onChange={changeInputEvent}
                    value={editEvent.eventHomepageLink}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-1"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Event Duration</Form.Label>
                  <Form.Control
                    name="eventDuration"
                    type="text"
                    placeholder="Event Duration in Day"
                    onChange={changeInputEvent}
                    value={editEvent.eventDuration}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-1"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    name="image"
                    type="text"
                    placeholder="Image That Event"
                    onChange={changeInputEvent}
                    value={editEvent.image}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-1"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Ticket Price</Form.Label>
                  <Form.Control
                    name="ticketPrice"
                    type="number"
                    placeholder="Ticket Price"
                    onChange={changeInputEvent}
                    value={editEvent.ticketPrice}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-1"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    name="CategoryId"
                    placeholder="Ticket Price"
                    onChange={changeInputEvent}
                    value={editEvent.CategoryId}
                  >
                    {loading ? (
                      <h1>Loading bang</h1>
                    ) : (
                      categories.data.map((el) => (
                        <option value={el.id}>{el.name}</option>
                      ))
                    )}
                  </Form.Select>
                </Form.Group>

                <Stack gap={2} direction="horizontal">
                  <Button
                    variant="primary"
                    className="justify-center"
                    type="submit"
                  >
                    Save
                  </Button>
                  <Link to={'/listevent'}>
                    <Button variant="primary" className="justify-center">
                      Cancel
                    </Button>
                  </Link>
                </Stack>
              </div>
            </Row>
          )}
        </Col>
      </Form>
    </Container >
  );
}

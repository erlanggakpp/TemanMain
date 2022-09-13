import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { postEvent, fetchCategories } from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'


export default function EventAdd() {
  const container = {
    padding: '150px',
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.category);
  const [loading, setLoading] = useState(true);

  const [addEvent, setAddEvent] = useState({
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
  useEffect(() => {
    dispatch(fetchCategories())
      .finally(() => setLoading(false));
  }, []);

  const changeInputEvent = (e) => {
    const { name, value } = e.target;
    setAddEvent({
      ...addEvent,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postEvent(addEvent))
      .then((data) => {
        Swal.fire(
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

  return (
    <Container sm>
      <Form onSubmit={handleSubmit}>
        <Row style={container}>
          <Col md={{ span: 7, offset: 3 }}>
            <h2 style={{ textAlign: 'center' }}>Form Add Event</h2>
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
                >
                  <option disabled selected>-----Select Category----</option>
                  {loading ? (
                    <h1>Loading cuy</h1>
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
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

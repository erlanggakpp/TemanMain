import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { postEvent } from '../store/actions';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

export default function EventAdd() {
  const container = {
    padding: '150px',
  };
  const dispatch = useDispatch();
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
      .then((_) => {
        console.log('success');
      })
      .catch((err) => {
        console.log(err.response.data);
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
                  <option value="1">1</option>
                  <option value="2">2</option>
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
                <Button variant="primary" className="justify-center">
                  Cancel
                </Button>
              </Stack>
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
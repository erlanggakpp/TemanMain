import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row';


export default function EventAdd() {
    const container = {
        padding: "150px",
    }
    return (
        <Container sm>
            <Form>
                <Row style={container}>
                    <Col md={{ span: 7, offset: 3 }}>
                        <h2 style={{ textAlign: 'center' }}>Form Add Event</h2>
                        <div classname="container-sm mt-5">
                            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                <Form.Label>Name</Form.Label>
                                <Form.Control name="name" type="text" placeholder="Name Of Event" />
                            </Form.Group>
                            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                <Form.Label>Location</Form.Label>
                                <Form.Control name="location" type="text" placeholder="Event location" />
                            </Form.Group>
                            <Form.Group className="mb-1" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Description</Form.Label>
                                <Form.Control name="description" as="textarea" rows={3} placeholder="Description this Event" />
                            </Form.Group>
                            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                <Form.Label>Event Date</Form.Label>
                                <Form.Control name="eventDate" type="Date" />
                            </Form.Group>
                            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                <Form.Label>Event Link</Form.Label>
                                <Form.Control name="eventHomepageLink" type="text" placeholder="Event Homepage Link" />
                            </Form.Group>
                            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                <Form.Label>Event Duration</Form.Label>
                                <Form.Control name="eventDuration" type="text" placeholder="Event Duration in Day" />
                            </Form.Group>
                            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                <Form.Label>Image</Form.Label>
                                <Form.Control name="image" type="text" placeholder="Image That Event" />
                            </Form.Group>
                            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                <Form.Label>Ticket</Form.Label>
                                <Form.Control name="ticketPrice" type="number" placeholder="Ticket Price" />
                            </Form.Group>
                            <Stack gap={2} direction="horizontal">
                                <Button variant="primary" className="justify-center">Save</Button>
                                <Button variant="primary" className="justify-center">Cancel</Button>
                            </Stack>
                        </div>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}

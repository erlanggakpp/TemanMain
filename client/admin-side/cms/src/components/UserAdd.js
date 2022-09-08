import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row';

export default function UserAdd() {
    const container = {
        padding: "150px",
    }
    return (
        <Container sm>
            <Form>
                <Row style={container}>
                    <Col md={{ span: 7, offset: 3 }}>
                        <div classname="container-sm mt-5">
                            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="Email" placeholder="Email must like this example@example.com" />
                            </Form.Group>
                            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="password " />
                            </Form.Group>
                            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="First Name" />
                            </Form.Group>
                            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Last Name" />
                            </Form.Group>
                            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                <Form.Label>Address </Form.Label>
                                <Form.Control type="text" placeholder="Address" />
                            </Form.Group>
                            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                <Form.Label>Birth of Date</Form.Label>
                                <Form.Control type="date" />
                            </Form.Group>
                            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                <Form.Label>Porfile Image Url</Form.Label>
                                <Form.Control type="text" placeholder="Url Image" />
                            </Form.Group>
                            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                <Form.Label>Instagram Account</Form.Label>
                                <Form.Control type="text" placeholder="Instgram Url" />
                            </Form.Group>
                            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                <Form.Label>Twitter Account</Form.Label>
                                <Form.Control type="text" placeholder="Twitter Url" />
                            </Form.Group>
                            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control type="text" placeholder="Url Image" />
                            </Form.Group>
                            <Form.Label>Gender</Form.Label>
                            <Form.Select className="mb-1" aria-label="Default select example">
                                <option>Gender</option>
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                            </Form.Select>
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
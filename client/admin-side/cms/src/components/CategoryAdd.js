import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row';

export default function CategoryAdd() {
    const container = {
        padding: "150px",
    }
    return (
        <Container sm>
            <Form>
                <Row style={container}>
                    <Col md={{ span: 7, offset: 3 }}>
                        <h2 style={{ textAlign: 'center' }}>Form Add Category</h2>
                        <div classname="container-sm mt-5">
                            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                <Form.Label>Name</Form.Label>
                                <Form.Control name="name" type="text" placeholder="Name Of Category" />
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
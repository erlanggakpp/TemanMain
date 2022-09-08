import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack';

export default function TableEvent() {
    const container = {
        padding: "20px"
    }
    const image = {
        width: "300px",
        height: "150px"
    }
    return (
        <Col lg={true} style={container}>
            <Container>
                <Table striped>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Event Name</th>
                            <th>Location</th>
                            <th>Event Date</th>
                            <th>Image</th>
                            <th>Event Duration</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Synchronize Fest</td>
                            <td>Kemayoran, Jakarta</td>
                            <td>2022/10/08</td>
                            <td><img src="http://vradiofm.com/uploads/news/730b2923-60ed-41f4-8895-04d6c49c325c78805a221a988e79ef3f42d7c5bfd418.jpg" style={image} /></td>
                            <td>3 Days</td>
                            <td>
                                <Stack gap={2} direction="horizontal">
                                    <Button variant="primary" className="justify-center">Edit</Button>
                                    <Button variant="danger" className="justify-center">Delete</Button>
                                </Stack>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </Col>
    )
}
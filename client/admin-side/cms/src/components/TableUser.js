import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack';

export default function TableUser() {
    const container = {
        padding: "20px"
    }
    const image = {
        width: "150px",
        height: "150px"
    }
    return (
        <Col lg={true} style={container}>
            <Container>
                <Table striped>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Profile Picture</th>
                            <th>Birth of Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>admin2</td>
                            <td>admin2</td>
                            <td><img src="https://i.pravatar.cc/300" style={image} /></td>
                            <td>01/01/1990</td>
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
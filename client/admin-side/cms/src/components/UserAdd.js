import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postUser } from '../store/actions';

export default function UserAdd() {
  const container = {
    padding: '150px',
  };
  const dispatch = useDispatch();
  const [addUser, setAddUser] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    birthdate: '',
    profilePict: '',
    instagramAccount: '',
    twitterAccount: '',
    phoneNumber: '',
    gender: '',
    role: 'Admin',
  });

  const changeInputUser = (e) => {
    const { name, value } = e.target;
    console.log(name);
    setAddUser({
      ...addUser,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postUser(addUser))
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
            <h2 style={{ textAlign: 'center' }}>Form Add User</h2>
            <div classname="container-sm mt-5">
              <Form.Group className="mb-1" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  type="Email"
                  placeholder="Email must like this example@example.com"
                  onChange={changeInputUser}
                />
              </Form.Group>
              <Form.Group className="mb-1" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="password "
                  onChange={changeInputUser}
                />
              </Form.Group>
              <Form.Group className="mb-1" controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  onChange={changeInputUser}
                />
              </Form.Group>
              <Form.Group className="mb-1" controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  onChange={changeInputUser}
                />
              </Form.Group>
              <Form.Group className="mb-1" controlId="address">
                <Form.Label>Address </Form.Label>
                <Form.Control
                  name="address"
                  type="text"
                  placeholder="Address"
                  onChange={changeInputUser}
                />
              </Form.Group>
              <Form.Group className="mb-1" controlId="birthdate">
                <Form.Label>Date Of Birth</Form.Label>
                <Form.Control
                  name="birthdate"
                  type="date"
                  onChange={changeInputUser}
                />
              </Form.Group>
              <Form.Group className="mb-1" controlId="profilePict">
                <Form.Label>Porfile Image Url</Form.Label>
                <Form.Control
                  name="profilePict"
                  type="text"
                  placeholder="Url Image"
                  onChange={changeInputUser}
                />
              </Form.Group>
              <Form.Group className="mb-1" controlId="instagramAccount">
                <Form.Label>Instagram Account</Form.Label>
                <Form.Control
                  name="instagramAccount"
                  type="text"
                  placeholder="Instgram Url"
                  onChange={changeInputUser}
                />
              </Form.Group>
              <Form.Group className="mb-1" controlId="twitterAccount">
                <Form.Label>Twitter Account</Form.Label>
                <Form.Control
                  name="twitterAccount"
                  type="text"
                  placeholder="Twitter Url"
                  onChange={changeInputUser}
                />
              </Form.Group>
              <Form.Group className="mb-1" controlId="phoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  name="phoneNumber"
                  type="text"
                  placeholder="Url Image"
                  onChange={changeInputUser}
                />
              </Form.Group>
              <Form.Label>Gender</Form.Label>
              <Form.Select
                name="gender"
                className="mb-1"
                aria-label="Default select example"
                onChange={changeInputUser}
              >
                <option>Gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </Form.Select>
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

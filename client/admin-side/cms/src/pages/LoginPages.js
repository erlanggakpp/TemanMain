import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { useState } from 'react';
import { login } from '../store/actions';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2'



export default function LoginPages() {
  const dispatch = useDispatch()
  const container = {
    padding: '150px',
  };
  const navigate = useNavigate();
  const [loginForm, setLoginFrom] = useState({
    email: '',
    password: '',
  });

  const changeInputLogin = (e) => {
    const { name, value } = e.target;
    setLoginFrom({
      ...loginForm,
      [name]: value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    login(loginForm)
      .then(({ data }) => {
        Swal.fire(
          'success',
          data.message,
          'success'
        )
        localStorage.setItem('access_token', data.access_token);
      })
      .then((_) => {
        navigate('/')
      })
      .catch((err) => {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.error,
        })
      });
  };

  return (
    <Container sm>
      <Form onSubmit={submitHandler}>
        <Row style={container}>
          <Col md={{ span: 7, offset: 3 }}>
            <h2 style={{ textAlign: 'center' }}>Login</h2>
            <div classname="container-sm mt-5">
              <Form.Group
                className="mb-1"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={changeInputLogin}
                />
              </Form.Group>
              <Form.Group
                className="mb-1"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={changeInputLogin}
                />
              </Form.Group>
              <Stack gap={2} direction="horizontal">
                <Button
                  variant="primary"
                  className="justify-center"
                  type="submit"
                >
                  Login
                </Button>
              </Stack>
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

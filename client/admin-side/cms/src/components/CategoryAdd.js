import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { postCategory } from '../store/actions';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

export default function CategoryAdd() {
  const container = {
    padding: '150px',
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addCategory, setAddCategory] = useState({
    name: '',
    image: ''
  });

  const changeInputEvent = (e) => {
    const { name, value } = e.target;
    setAddCategory({
      ...addCategory,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postCategory(addCategory))
      .then((data) => {
        Swal.fire(
          'success',
          data.data.message,
          'success'
        )
      })
      .then((_) => {
        navigate('/listcategory');
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
    <Container sm="true">
      <Form onSubmit={handleSubmit}>
        <Row style={container}>
          <Col md={{ span: 7, offset: 3 }}>
            <h2 style={{ textAlign: 'center' }}>Form Add Category</h2>
            <div className="container-sm mt-5">
              <Form.Group
                className="mb-1"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="name"
                  type="text"
                  placeholder="Name Of Category"
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
                  placeholder="Image Url"
                  onChange={changeInputEvent}
                />
              </Form.Group>
              <Stack gap={2} direction="horizontal">
                <Button
                  variant="primary"
                  className="justify-center"
                  type="submit"
                >
                  Save
                </Button>
                <Link to={'/listcategory'}>
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

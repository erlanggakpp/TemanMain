import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchCategoryById, updateCategory } from '../store/actions';

export default function CategoryEdit() {
  const container = {
    padding: '150px',
  };
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { detailcategories } = useSelector((state) => state.category);
  console.log(detailcategories);
  const [editCategory, setEditCategory] = useState({
    name: '',
    image: ''
  });
  const changeInputEvent = (e) => {
    const { name, value } = e.target;
    setEditCategory({
      ...editCategory,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCategory(id, editCategory))
      .then((_) => {
        console.log('success');
        navigate(`/listcategory`);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  useEffect(() => {
    dispatch(fetchCategoryById(id));
  }, []);

  useEffect(() => {
    setEditCategory({
      name: detailcategories?.data?.name,
      image: detailcategories?.data?.image,
    });
  }, [detailcategories]);
  return (
    <Container sm>
      <Form onSubmit={handleSubmit}>
        <Row style={container}>
          <Col md={{ span: 7, offset: 3 }}>
            <h2 style={{ textAlign: 'center' }}>Form Edit Category</h2>
            <div classname="container-sm mt-5">
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
                  value={editCategory.name}
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
                  value={editCategory.image}
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

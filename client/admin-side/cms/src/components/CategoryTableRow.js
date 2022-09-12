import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteCategory, fetchCategories } from '../store/actions';
import Swal from 'sweetalert2'

export default function CategoryTableRow({ category, i }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const image = {
    width: '300px',
    height: '150px',
  };
  const handleDelete = (e, id) => {
    e.preventDefault();
    dispatch(deleteCategory(id))
      .then((res) => {
        Swal.fire(
          res.data.message,
          'You clicked the button!',
          'success'
        )
      })
      .then((data) => {
        dispatch(fetchCategories(data))
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.message,
        })
      })
  };

  const handleEdit = (id) => {
    navigate(`/category/${id}`);
  };
  return (
    <tr>
      <td>{i + 1}</td>
      <td>{category.name}</td>
      <td>
        <img src={category.image} style={image} />
      </td>
      <td>
        <Stack gap={2} direction="horizontal">
          <Button
            variant="primary"
            className="justify-center"
            onClick={(e) => handleEdit(category.id)}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            className="justify-center"
            onClick={(e) => handleDelete(e, category.id)}
          >
            Delete
          </Button>
        </Stack>
      </td>
    </tr>
  );
}

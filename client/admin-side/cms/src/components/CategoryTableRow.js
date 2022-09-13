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

  const deleteHandler = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      background: '#000',
      color: '#fff',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCategory(id))
          .then(res => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              background: '#000',
              color: '#fff',
              title: res.data.message,
              showConfirmButton: true,
              timer: 1000
            })
              .then(data => {
                dispatch(fetchCategories())
              })
          }).catch(err => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.response.data.message,
            })
          })
      }

    })


  }


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
            onClick={() => deleteHandler(category.id)}
          >
            Delete
          </Button>
        </Stack>
      </td>
    </tr>
  );
}

import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { useNavigate } from 'react-router-dom';

import { deleteEvents, fetchEvents } from '../store/actions';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2'


export default function EventTableRow({ data, i }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const image = {
    width: '300px',
    height: '150px',
  };

  const deleteHandler = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      background: '#fff',
      color: '#000',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteEvents(id))
          .then(res => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              background: '#fff',
              color: '#000',
              title: res.data.message,
              showConfirmButton: true,
              timer: 1000
            })
              .then(data => {
                dispatch(fetchEvents())
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
    navigate(`/event/${id}`);
  };

  const formatdate = (date) => {
    const newdate = new Date(date).toLocaleDateString("en-US")
    return newdate
  };

  return (
    <tr>
      <td>{i + 1}</td>
      <td>{data.name}</td>
      <td>{data.location}</td>
      <td>{formatdate(data.eventDate)}</td>
      <td>
        <img src={data.image} style={image} />
      </td>
      <td>{data.eventDuration}</td>
      <td>
        <Stack gap={2} direction="horizontal">
          <Button
            variant="primary"
            className="justify-center"
            onClick={(e) => handleEdit(data.id)}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            className="justify-center"
            onClick={() => deleteHandler(data.id)}
          >
            Delete
          </Button>
        </Stack>
      </td>
    </tr>
  );
}

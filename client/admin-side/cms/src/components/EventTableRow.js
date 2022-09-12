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
  const handleDelete = (e, id) => {
    e.preventDefault();
    dispatch(deleteEvents(id))
      .then((res) => {
        Swal.fire(
          res.data.message,
          'You clicked the button!',
          'success'
        )
      })
      .then((data) => {
        dispatch(fetchEvents(data))
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
            onClick={(e) => handleDelete(e, data.id)}
          >
            Delete
          </Button>
        </Stack>
      </td>
    </tr>
  );
}

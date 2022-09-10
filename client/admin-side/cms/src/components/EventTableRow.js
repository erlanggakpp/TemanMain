import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { useNavigate } from 'react-router-dom';

import { deleteEvents } from '../store/actions';
import { useDispatch } from 'react-redux';

export default function EventTableRow({ data, i }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const image = {
    width: '300px',
    height: '150px',
  };
  const handleDelete = (e, id) => {
    e.preventDefault();
    dispatch(deleteEvents(id));
  };

  const handleEdit = (id) => {
    navigate(`/event/${id}`);
  };

  return (
    <tr>
      <td>{i + 1}</td>
      <td>{data.name}</td>
      <td>{data.localtion}</td>
      <td>{data.eventDate}</td>
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

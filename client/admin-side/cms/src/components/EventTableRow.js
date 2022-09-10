import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { useNavigate } from 'react-router-dom';
import { deleteEventById } from '../store/actions';
import { useDispatch } from 'react-redux'

export default function EventTableRow({ event, i }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()



    const image = {
        width: "300px",
        height: "150px"
    }
    const handleDelete = (e, id) => {
        e.preventDefault()
        dispatch(deleteEventById(id))
    }

    const handleEdit = (id) => {
        navigate()
    }

    return (
        <tr>
            <td>{i + 1}</td>
            <td>{event.name}</td>
            <td>{event.localtion}</td>
            <td>{event.eventDate}</td>
            <td><img src={event.image} style={image} /></td>
            <td>{event.eventDuration}</td>
            <td>
                <Stack gap={2} direction="horizontal">
                    <Button variant="primary" className="justify-center" onClick={(e) => handleEdit(event.id)} >Edit</Button>
                    <Button variant="danger" className="justify-center" onClick={(e) => handleDelete(e, event.id)}>Delete</Button>
                </Stack>
            </td>
        </tr>
    )
} 
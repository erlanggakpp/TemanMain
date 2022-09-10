import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../store/actions';
export default function UserTableRow({ user, i }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const image = {
        width: "150px",
        height: "150px"
    }
    const handleDelete = (e, id) => {
        e.preventDefault();
        dispatch(deleteUser(id))
    }

    const handleEdit = (id) => {
        navigate(`/user/${id}`)
    }


    return (
        <tr>
            <td>{i + 1}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td><img src={user.profilePict} style={image} /></td>
            <td>{user.birthdate}</td>
            <td>
                <Stack gap={2} direction="horizontal">
                    <Button variant="primary" className="justify-center" onClick={() => handleEdit(user.id)} >Edit</Button>
                    <Button variant="danger" className="justify-center" onClick={(e) => handleDelete(e, user.id)}>Delete</Button>
                </Stack>
            </td>
        </tr>
    )
}
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteCategory } from '../store/actions';


export default function CategoryTableRow({ category, i }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleDelete = (e, id) => {
        e.preventDefault();
        dispatch(deleteCategory(id))
    }



    return (
        <tr>
            <td>{i + 1}</td>
            <td>{category.name}</td>
            <td>
                <Stack gap={2} direction="horizontal">
                    <Button variant="primary" className="justify-center">Edit</Button>
                    <Button variant="danger" className="justify-center" onClick={(e) => handleDelete(e, category.id)}>Delete</Button>
                </Stack>
            </td>
        </tr>
    )
}
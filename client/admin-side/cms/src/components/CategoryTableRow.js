import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';


export default function CategoryTableRow({ category, i }) {
    return (
        <tr>
            <td>{i + 1}</td>
            <td>{category.name}</td>
            <td>
                <Stack gap={2} direction="horizontal">
                    <Button variant="primary" className="justify-center">Edit</Button>
                    <Button variant="danger" className="justify-center">Delete</Button>
                </Stack>
            </td>
        </tr>
    )
}
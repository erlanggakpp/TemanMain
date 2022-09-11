import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../store/actions';
import UserTableRow from './UserTableRow';

export default function TableUser() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const { users } = useSelector((state) => state.user)

    useEffect(() => {
        dispatch(fetchUsers())
            .then((_) => {
                console.log('success')
            })
            .finally(() => setLoading(false))
    }, [])


    const container = {
        padding: "20px"
    }

    return (
        <Col lg={true} style={container}>
            <Container>
                <Table striped>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Profile Picture</th>
                            <th>Birth of Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <h2>Loadingg Cuyy</h2>
                        ) : (
                            users.data.map((user, i) =>
                                <UserTableRow key={i} user={user} i={i} />
                            )
                        )}
                    </tbody>
                </Table>
            </Container>
        </Col>
    )
}
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../store/actions';
import UserTableRow from './UserTableRow';
import spinner from '../assets/spinner.gif'


export default function TableUser() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const { users } = useSelector((state) => state.user)

    useEffect(() => {
        dispatch(fetchUsers())
            .finally(() => setLoading(false))
    }, [])


    const container = {
        padding: "20px"
    }

    const spinnercontainer = {
        display: 'flex',
        padding: "100px",
        justifyContent: 'center',
    }
    const image = {
        width: '400px',
        height: '400px',
    };
    return (
        <Col lg={true} style={container}>
            <Container>
                {loading ? (<Container style={spinnercontainer}>
                    <img src={spinner} style={image} />
                </Container>) : (
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
                            {
                                users.data.map((user, i) => {
                                    return (
                                        <UserTableRow key={i} user={user} i={i} />
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                )}
            </Container>
        </Col>
    )
}
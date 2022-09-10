import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { fetchEvents } from '../store/actions';
import EventTableRow from './EventTableRow';


export default function TableEvent() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const { events } = useSelector((state) => state.event)

    useEffect(() => {
        dispatch(fetchEvents())
            .then((_) => {
                console.log('Success')
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
                            <th>Event Name</th>
                            <th>Location</th>
                            <th>Event Date</th>
                            <th>Image</th>
                            <th>Event Duration</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <h1>Loadingg cuyy ...</h1>
                        ) : (
                            events.data.map((event, i) =>
                                <EventTableRow key={i} event={event} i={i} />
                            )
                        )}
                    </tbody>
                </Table>
            </Container>
        </Col>
    )
}
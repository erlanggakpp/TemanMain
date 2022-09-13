import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { fetchEvents } from '../store/actions';
import EventTableRow from './EventTableRow';
import spinner from '../assets/spinner.gif'


export default function TableEvent() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const { events } = useSelector((state) => state.event)

    useEffect(() => {
        dispatch(fetchEvents())
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
                                <th>Event Name</th>
                                <th>Location</th>
                                <th>Event Date</th>
                                <th>Image</th>
                                <th>Event Duration</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.data.map((event, i) => {
                                return (
                                    <EventTableRow key={i} data={event} i={i} />
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
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchCategories } from '../store/actions';
import CategoryTableRow from './CategoryTableRow';
import spinner from '../assets/spinner.gif'

export default function TableCategory() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const { categories } = useSelector((state) => state.category)

    useEffect(() => {
        dispatch(fetchCategories())
            .finally(() => setLoading(false))
    }, [])


    const container = {
        padding: "20px"
    }
    const image = {
        width: '400px',
        height: '400px',
    };
    const spinnercontainer = {
        display: 'flex',
        padding: "100px",
        justifyContent: 'center',
    }
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
                                <th>Category Name</th>
                                <th>Category Image</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                categories.data.map((category, i) => {
                                    return (
                                        <CategoryTableRow key={category.id} category={category} i={i} />
                                    )

                                })
                            }
                        </tbody>
                    </Table>
                )}
            </Container>
        </Col >
    )
}
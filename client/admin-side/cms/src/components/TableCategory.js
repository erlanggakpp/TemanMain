import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchCategories } from '../store/actions';
import CategoryTableRow from './CategoryTableRow';


export default function TableCategory() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const { categories } = useSelector((state) => state.category)

    useEffect(() => {
        dispatch(fetchCategories())
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
                            <th>Category Name</th>
                            <th>Category Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <h2>Loading Cuyy ..</h2>
                        ) : (
                            categories.data.map((category, i) =>
                                <CategoryTableRow key={i} category={category} i={i} />
                            )
                        )}
                    </tbody>
                </Table>
            </Container>
        </Col >
    )
}
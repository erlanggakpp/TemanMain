import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../store/actions';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { fetchuserbyid } from '../store/actions';

export default function UserEdit() {
    const container = {
        padding: "150px",
    }
    const { id } = useParams()


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { detailusers } = useSelector((state) => state.user)

    const [editUser, setEditUser] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        birthdate: "",
        profilePict: "",
        instagramAccount: "",
        twitterAccount: "",
        phoneNumber: "",
        gender: "",
        role: "Admin"
    })

    const changeInputUser = (e) => {
        const { name, value } = e.target;
        console.log(name)
        setEditUser({
            ...editUser,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateUser(id, editUser))
            .then((_) => {
                console.log('success')
                navigate('/listuser')
            })
            .catch((err) => {
                console.log(err.response.data)
            })
    }

    useEffect(() => {
        dispatch(fetchuserbyid(id))
    }, [])


    useEffect(() => {
        if (detailusers?.data?.email) {
            setEditUser({
                email: detailusers?.data?.email,
                password: detailusers?.data?.password,
                firstName: detailusers?.data?.firstName,
                lastName: detailusers?.data?.lastName,
                address: detailusers?.data?.address,
                birthdate: detailusers?.data?.birthdate,
                profilePict: detailusers?.data?.profilePict,
                instagramAccount: detailusers?.data?.instagramAccount,
                twitterAccount: detailusers?.data?.twitterAccount,
                phoneNumber: detailusers?.data?.phoneNumber,
                gender: detailusers?.data?.gender,
                role: "Admin"
            })
        }
    }, [detailusers])



    return (
        <Container sm>
            <Form onSubmit={handleSubmit}>
                <Row style={container}>
                    <Col md={{ span: 7, offset: 3 }}>
                        <h2 style={{ textAlign: 'center' }}>Form Edit User</h2>
                        <div classname="container-sm mt-5">
                            <Form.Group className="mb-1" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control name="email" type="Email" placeholder="Email must like this example@example.com"
                                    value={editUser.email}
                                    onChange={changeInputUser} />
                            </Form.Group>
                            <Form.Group className="mb-1" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control name="password" type="password" placeholder="password " onChange={changeInputUser} value={editUser.password} />
                            </Form.Group>
                            <Form.Group className="mb-1" controlId="firstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control name="firstName" type="text" placeholder="First Name"
                                    onChange={changeInputUser} value={editUser.firstName} />
                            </Form.Group>
                            <Form.Group className="mb-1" controlId="lastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control name="lastName" type="text" placeholder="Last Name"
                                    onChange={changeInputUser} value={editUser.lastName} />
                            </Form.Group>
                            <Form.Group className="mb-1" controlId="address">
                                <Form.Label>Address </Form.Label>
                                <Form.Control name="address" type="text" placeholder="Address"
                                    onChange={changeInputUser} value={editUser.address} />
                            </Form.Group>
                            <Form.Group className="mb-1" controlId="birthdate">
                                <Form.Label>Date Of Birth</Form.Label>
                                <Form.Control name="birthdate" type="date"
                                    onChange={changeInputUser} value={editUser.birthdate} />
                            </Form.Group>
                            <Form.Group className="mb-1" controlId="profilePict">
                                <Form.Label>Porfile Image Url</Form.Label>
                                <Form.Control name="profilePict" type="text" placeholder="Url Image" onChange={changeInputUser} value={editUser.profilePict} />
                            </Form.Group>
                            <Form.Group className="mb-1" controlId="instagramAccount">
                                <Form.Label>Instagram Account</Form.Label>
                                <Form.Control name="instagramAccount" type="text" placeholder="Instgram Url" onChange={changeInputUser} value={editUser.instagramAccount} />
                            </Form.Group>
                            <Form.Group className="mb-1" controlId="twitterAccount">
                                <Form.Label>Twitter Account</Form.Label>
                                <Form.Control name="twitterAccount" type="text" placeholder="Twitter Url" onChange={changeInputUser} value={editUser.twitterAccount} />
                            </Form.Group>
                            <Form.Group className="mb-1" controlId="phoneNumber">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control name="phoneNumber" type="text" placeholder="Url Image" onChange={changeInputUser} value={editUser.phoneNumber} />
                            </Form.Group>
                            <Form.Label>Gender</Form.Label>
                            <Form.Select name="gender" className="mb-1" aria-label="Default select example" onChange={changeInputUser} value={editUser.gender} >
                                <option>Gender</option>
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                            </Form.Select>
                            <Stack gap={2} direction="horizontal">
                                <Button variant="primary" className="justify-center" type="submit">Save</Button>
                                <Link to={'/listuser'}>
                                    <Button variant="primary" className="justify-center">Cancel</Button>
                                </Link>
                            </Stack>
                        </div>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}
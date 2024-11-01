import { Button, Col, Row, Modal, Form, Card, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import useLocalStorage from "use-local-storage";
import { useNavigate } from "react-router-dom";
import BookingPage from "./BookingPage";

export default function HotelList() {
    const url = "https://3ce1259c-9b4e-4833-a33f-a58a2820b28b-00-152pggy9n8ka9.sisko.replit.dev";

    const [modalShow, setModalShow] = useState(null); // For Login modal
    const [showSignUpModal, setShowSignUpModal] = useState(false); // For Sign-Up modal
    const [hotels, setHotels] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authToken, setAuthToken] = useLocalStorage("authToken", "");
    const [isBooking, setIsBooking] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const res = await axios.get(`${url}/hotels`);
                setHotels(res.data);
            } catch (error) {
                console.error("Error fetching hotels:", error);
            }
        };
        fetchHotels();
    }, []);

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${url}/signup`, { email, password });
            console.log(res.data);
            setShowSignUpModal(false);
            const loginResponse = await handleLogin();

            if (loginResponse.success) {
                navigate(<BookingPage />);
            }

        } catch (error) {
            console.error(error);
        }
    };

    const handleLogin = async (e) => {
        if (e) e.preventDefault();
        try {
            const res = await axios.post(`${url}/login`, { email, password });
            if (res.data && res.data.auth === true && res.data.token) {
                setAuthToken(res.data.token);
                console.log("Login was successful, token saved");
                setModalShow(null);
                if (isBooking) {
                    navigate(<BookingPage />);
                }
                return { success: true };
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleClose = () => setModalShow(null);
    const handleCloseSignUp = () => setShowSignUpModal(false);

    const handleBookNow = (hotelId) => {
        if (authToken) {
            navigate(`/BookingPage/${hotelId}`);
        } else {
            setIsBooking(hotelId);
            setModalShow("Login");
        }
    };

    return (
        <Container className="mt-5">
            <Row>
                {hotels.map((hotel) => (
                    <Col sm={6} md={4} lg={3} key={hotel.id}>
                        <Card className="mb-4">
                            <Card.Img variant="top" src={hotel.image_url} alt={hotel.name} />
                            <Card.Body>
                                <Card.Title>{hotel.name}</Card.Title>
                                <Card.Text>{hotel.description}</Card.Text>
                                <Card.Text>Price: ${hotel.price}</Card.Text>
                                <Button
                                    variant="dark"
                                    onClick={() => handleBookNow(hotel.id)}
                                >
                                    Book Now
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}

                {/* Login Modal */}
                <Modal
                    show={modalShow === "Login"}
                    onHide={handleClose}
                    animation={false}
                    centered
                >
                    <Modal.Body>
                        <h2 className="mb-4" style={{ fontWeight: "bold" }}>
                            Log in to your account
                        </h2>

                        <p style={{ fontWeight: "bold" }}>
                            Log In to proceed to your booking!
                        </p>

                        <Form
                            className="d-grid gap-2 px-5"
                            onSubmit={handleLogin}
                        >
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    placeholder="Enter email"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Group>

                            <Button className="rounded-pill" type="submit">
                                Log in
                            </Button>
                        </Form>

                        <p className="mt-5" style={{ fontWeight: "bold" }}>
                            Don&apos;t have an account?
                        </p>

                        <Button
                            className="rounded-pill"
                            variant="outline-primary"
                            onClick={() => {
                                handleClose();
                                setShowSignUpModal(true);
                            }}
                        >
                            Create an account
                        </Button>

                        <p style={{ fontSize: "12px", marginTop: "20px" }}>
                            By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.
                        </p>
                    </Modal.Body>
                </Modal>

                {/* Sign-Up Modal */}
                <Modal
                    show={showSignUpModal}
                    onHide={handleCloseSignUp}
                    animation={false}
                    centered
                >
                    <Modal.Body>
                        <h2 className="mb-4" style={{ fontWeight: "bold" }}>
                            Create your account
                        </h2>

                        <Form className="d-grid gap-2 px-5" onSubmit={handleSignUp}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    placeholder="Enter email"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Group>

                            <Button className="rounded-pill" type="submit">
                                Sign up
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Row>
        </Container>
    );
}

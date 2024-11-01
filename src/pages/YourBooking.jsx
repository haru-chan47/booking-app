import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";


export default function YourBooking() {
    const { id } = useParams();
    const url = "https://3ce1259c-9b4e-4833-a33f-a58a2820b28b-00-152pggy9n8ka9.sisko.replit.dev"
    const [bookings, setBookings] = useState([]);


    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await axios.get(`${url}/bookings/${id}`);
                setBookings(res.data);
            } catch (error) {
                console.error("Error fetching hotels:", error);
            }
        };
        fetchBookings();
    }, [id]);

    return (
        <Container className="mt-5">
            <Row>
                {bookings.map((booking) => (
                    <Col sm={6} md={4} lg={3} key={booking.id}>
                        <Card className="mb-4">
                            <Card.Img variant="top" src={booking.image_url} alt="image" />
                            <Card.Body>
                                <Card.Title>{booking.name}</Card.Title>
                                <Card.Text>{booking.description}</Card.Text>
                                <Card.Text>Price: ${booking.price}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>

    )
}
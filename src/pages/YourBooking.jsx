import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function YourBooking() {
    const { id } = useParams();
    const url = "https://e4b3a13c-d8e4-4687-bac5-6001eebe3671-00-31n2czp7jgupl.pike.replit.dev";
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await axios.get(`${url}/bookings/user/${id}`);
                setBookings(res.data);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };

        fetchBookings();
    }, [id]);

    return (
        <Container className="mt-5">
            <Row>
                {bookings.length > 0 ? (
                    bookings.map((booking) => (
                        <Col sm={6} md={4} lg={3} key={booking.id}>
                            <Card className="mb-4">
                                <Card.Img variant="top" src={booking.image_url} alt="Hotel" />
                                <Card.Body>
                                    <Card.Title>{booking.hotel_name}</Card.Title>
                                    <Card.Text>
                                        Check-in: {booking.check_in_date}
                                    </Card.Text>
                                    <Card.Text>
                                        Check-out: {booking.check_out_date}
                                    </Card.Text>
                                    <Card.Text>
                                        Phone: {booking.phone_number}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <p>No bookings found.</p>
                )}
            </Row>
        </Container>
    );
}

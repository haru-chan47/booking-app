import axios from "axios";
import { useEffect, useState } from "react";
import { Card, ListGroup, Form, Button, Container } from "react-bootstrap";

export default function AdminPage() {
    const url = "https://3ce1259c-9b4e-4833-a33f-a58a2820b28b-00-152pggy9n8ka9.sisko.replit.dev";
    const [bookingInfo, setBookingInfo] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [updatedBookingData, setUpdatedBookingData] = useState({
        name: "",
        check_in_date: "",
        check_out_date: "",
    });

    const fetchBookings = async () => {
        try {
            const res = await axios.get(`${url}/bookings`);
            setBookingInfo(res.data);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const updateBooking = async (id) => {
        try {
            await axios.put(`${url}/bookings/${id}`, updatedBookingData);
            setEditingId(null);
            fetchBookings();
        } catch (error) {
            console.error("Error updating booking:", error);
        }
    };

    const deleteBooking = async (id) => {
        try {
            await axios.delete(`${url}/bookings/${id}`);
            fetchBookings();
        } catch (error) {
            console.error("Error deleting booking:", error);
        }
    };

    const handleInputChange = (e) => {
        setUpdatedBookingData({
            ...updatedBookingData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <Container className="mt-5">
            <Card className="bg-secondary">
                <Card.Body>
                    <Card.Title> <strong>Booking Details</strong></Card.Title>
                    <ListGroup>
                        {bookingInfo.map((booking) => (
                            <ListGroup.Item key={booking.id}>
                                {editingId === booking.id ? (
                                    <>
                                        <Form>
                                            <Form.Group>
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="name"
                                                    value={updatedBookingData.name}
                                                    onChange={handleInputChange}
                                                    placeholder={booking.name}
                                                />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Check-in Date</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="check_in_date"
                                                    value={updatedBookingData.check_in_date}
                                                    onChange={handleInputChange}
                                                    placeholder={booking.check_in_date}
                                                />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Check-out Date</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="check_out_date"
                                                    value={updatedBookingData.check_out_date}
                                                    onChange={handleInputChange}
                                                    placeholder={booking.check_out_date}
                                                />
                                            </Form.Group>
                                        </Form>
                                        <Button variant="dark" onClick={() => updateBooking(booking.id)}>Save</Button>
                                        <Button className="ms-3" variant="dark" onClick={() => setEditingId(null)}>Cancel</Button>
                                    </>
                                ) : (
                                    // If not editing, show booking details
                                    <>
                                        <h5>Booking ID: {booking.id}</h5>
                                        <h4>Name: {booking.name}</h4>
                                        <p>Hotel Name: {booking.hotel_name}</p>
                                        <p>Check-in Date: {booking.check_in_date}</p>
                                        <p>Check-out Date: {booking.check_out_date}</p>
                                        <Button variant="dark" onClick={() => {
                                            setEditingId(booking.id);
                                            setUpdatedBookingData({
                                                name: booking.name,
                                                check_in_date: booking.check_in_date,
                                                check_out_date: booking.check_out_date,
                                            });
                                        }}>Update</Button>
                                        <Button className="ms-3" variant="dark" onClick={() => deleteBooking(booking.id)}>Delete</Button>
                                    </>
                                )}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card.Body>
            </Card>
        </Container>
    );
}

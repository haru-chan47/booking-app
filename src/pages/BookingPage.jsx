import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

export default function BookingPage() {
    const { id } = useParams();
    const url = "https://3ce1259c-9b4e-4833-a33f-a58a2820b28b-00-152pggy9n8ka9.sisko.replit.dev";
    const [hotelInfo, setHotelInfo] = useState(null);
    const [name, setName] = useState("");
    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHotelInfo = async () => {
            try {
                const res = await axios.get(`${url}/hotels/${id}`);
                setHotelInfo(res.data);
            } catch (error) {
                console.error("Error fetching hotel information:", error);
            }
        };

        fetchHotelInfo();
    }, [id]);

    const handleBooking = async (e) => {
        e.preventDefault();

        if (!checkInDate || !checkOutDate || !phoneNumber) {
            alert("Please fill in all the required fields.");
            return;
        }

        const token = localStorage.getItem("authToken");
        if (!token) {
            alert("Please log in or sign up before booking.");
            return;
        }

        try {
            const bookingData = {
                name: name,
                check_in_date: checkInDate,
                check_out_date: checkOutDate,
                phone_number: phoneNumber,
                hotel_id: id,
            };

            const res = await axios.post(`${url}/bookings`, bookingData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Booking submitted", res.data);
            navigate("/");
        } catch (error) {
            console.error("Error submitting booking:", error);
            if (error.response && error.response.status === 401) {
                alert("Authentication failed. Please log in again.");
            }
        }
    };

    return (
        hotelInfo && (
            <Container className="mt-5">
                <h1 className="text-white">Book Your Stay at {hotelInfo.name}</h1>
                <p className="text-white">{hotelInfo.description}</p>

                <Form onSubmit={handleBooking}>
                    <Form.Group>
                        <Form.Label className="text-white">Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="text-white">Check-In Date</Form.Label>
                        <Form.Control
                            type="text"
                            value={checkInDate}
                            onChange={(e) => setCheckInDate(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="text-white">Check-Out Date</Form.Label>
                        <Form.Control
                            type="text"
                            value={checkOutDate}
                            onChange={(e) => setCheckOutDate(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="text-white">Phone Number</Form.Label>
                        <Form.Control
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Enter phone number"
                        />
                    </Form.Group>

                    <Button className="mt-3" variant="dark" type="submit">Submit Booking</Button>
                </Form>
            </Container>
        )
    );
}

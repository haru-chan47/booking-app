import { useDispatch, useSelector } from 'react-redux';
import { bookHotel } from './bookingSlice';
import { useNavigate } from 'react-router-dom';

const BookNowButton = ({ hotelId }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isSignedIn } = useSelector((state) => state.auth);

    const handleBookNow = () => {
        if (!isSignedIn) {
            // If not signed in, redirect to sign-up or sign-in page
            navigate('/signup');
        } else {
            // If signed in, dispatch booking action
            const bookingDetails = {
                hotelId,
                title: 'Booking Title', // Example title
                description: 'Booking description', // Example description
                date: '2024-10-06', // Example date
                time: '14:00', // Example time
                phone_number: '123-456-7890', // Example phone number
                email: 'user@example.com', // Example email
            };

            dispatch(bookHotel({ hotelId, bookingDetails }));
        }
    };

    return (
        <button onClick={handleBookNow} className="btn btn-primary">
            Book Now
        </button>
    );
};

export default BookNowButton;

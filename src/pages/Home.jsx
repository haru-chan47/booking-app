

import HotelList from "./HotelList"
import hotelImage from '../assets/pictures/villa2.jpg'
import { Container } from "react-bootstrap"

export default function Home() {
    return (
        <>
            <div className="row align-items-center">
                <div className="col-md-6">
                    <img src={hotelImage} alt="hotel image" className="img-fluid" />
                </div>
                <div className="col title bg-dark">
                    <hr />
                    <hr />
                    <hr />
                    <hr />
                    <hr />
                    <hr />
                    <hr />
                    <hr />
                    <hr />
                    <hr />
                    <hr />
                    <hr />
                    <hr />
                    <h1 className="text-white">Grand Seelie Hotel</h1>
                    <p className="text-white">Your search ends here. Welcome to the perfect destination where your dream vacation becomes reality. Whether you&apos;re seeking luxury, relaxation, or adventure, our hotel offers everything you need for an unforgettable stay. Explore breathtaking views, indulge in world-class amenities, and experience exceptional service that will make you feel right at home.</p>
                    <hr />
                    <hr />
                    <hr />
                    <hr />
                    <hr />
                    <hr />
                    <hr />
                    <hr />
                    <hr />
                    <hr />
                    <hr />
                    <hr />
                </div>
            </div>
            <Container>
                <HotelList />
            </Container>
        </>
    )
}
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import useLocalStorage from "use-local-storage";

export default function Navigation() {
    const { id } = useParams();
    const [authToken, setAuthToken] = useLocalStorage("authToken", "");
    const handleLogout = () => {
        setAuthToken("");
        console.log(`Token : ${authToken}`)
    };

    return (
        <nav className="navbar navbar-dark bg-dark w-100">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Grand Seelie Hotel</a>
                <ul className="navbar-nav d-flex flex-row">
                    <li className="nav-item ms-3">
                        <a className="nav-link active" aria-current="page" href="/">Home</a>
                    </li>
                    <li className="nav-item ms-3">
                        <a className="nav-link" href="/AdminPage">Admin</a>
                    </li>
                    <li className="nav-item ms-3">
                        <a className="nav-link" href={`/YourBookings/${id}`}>Your Bookings</a>
                    </li>
                    <li className="nav-item ms-3">
                        <a className="nav-link" href="/" onClick={handleLogout}>Log Out</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
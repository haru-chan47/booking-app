import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import "./App.css";
import BookingPage from "./pages/BookingPage";
import AdminPage from "./pages/AdminPage";
import Navigation from "./assets/components/Navigation";
import YourBooking from "./pages/YourBooking";

export default function App() {
  return (
    <>
      <Navigation />
      <BrowserRouter>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<BookingPage />} path="/BookingPage/:id" />
          <Route element={<AdminPage />} path="/AdminPage" />
          <Route element={<YourBooking />} path="/YourBooking/:id" />
        </Routes>
      </BrowserRouter>
    </>
  );
}
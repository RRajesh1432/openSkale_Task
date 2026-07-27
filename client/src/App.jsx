import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SearchTrain from "./pages/SearchTrain";
import BookTicket from "./pages/BookTicket";
import BookingHistory from "./pages/BookingHistory";
import AdminDashboard from "./pages/AdminDashboard";
import Footer from "./components/Footer";
import PaymentDetails from "./pages/PaymentDetails";

import Payment from "./pages/Payment";
import Success from "./pages/Success";

function App() {
  return (
    <BrowserRouter>
    
      <Navbar />

      <Routes>
        <Route path="/payment" element={<Payment />} />
        <Route path="/success" element={<Success />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<SearchTrain />} />
        <Route path="/book" element={<BookTicket />} />
        <Route path="/history" element={<BookingHistory />} /> */
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/payment-details" element={<PaymentDetails />} />
        <Route path="/book/:id" element={<BookTicket />} />
        {/* <Route path="/book/:id" element={<BookTicket />} />

        
        

        {/* <Route
          path="/history"
          element={
            <ProtectedRoute>
              <BookingHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/book/:id"
          element={
            <ProtectedRoute>
              <BookTicket />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

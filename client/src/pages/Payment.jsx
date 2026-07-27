import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Payment() {
  const navigate = useNavigate();

  const booking = JSON.parse(localStorage.getItem("booking"));
  const user = JSON.parse(localStorage.getItem("user"));

  const [method, setMethod] = useState("");

  const [payment, setPayment] = useState({
    upiId: "",
    cardHolder: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setPayment({
      ...payment,
      [e.target.name]: e.target.value,
    });
  };

  const payNow = async () => {
    if (!method) {
      alert("Select Payment Method");
      return;
    }

    setLoading(true);

    setTimeout(async () => {

      const transactionId = "TXN" + Math.floor(Math.random() * 1000000000);

      const pnr = Math.floor(1000000000 + Math.random() * 9000000000);

      await API.post("/payments", {
        userId: user.id,
        bookingId: Date.now(),
        amount: booking.train.fare,
        paymentMethod: method,
        transactionId,
        status: "Success",
      });

      await API.post("/bookings", {
        userId: user.id,

        trainId: booking.train.id,

        trainName: booking.train.trainName,

        passengerName: booking.passengerName,

        age: booking.age,

        gender: booking.gender,

        fare: booking.train.fare,

        status: "Confirmed",

        paymentStatus: "Paid",

        transactionId,

        pnr,
      });

      await API.patch(`/trains/${booking.train.id}`, {
        availableSeats: booking.train.availableSeats - 1,
      });

      localStorage.setItem("pnr", pnr);
      localStorage.setItem("transactionId", transactionId);

      setLoading(false);

      navigate("/success");
    }, 2000);
  };

  return (

    <div className="container mt-5 w-50">
      <div className="card shadow">
        <div className="card-header bg-success text-white ">
          <h3 >Payment Gateway</h3>
        </div>

        <div className="card-body">
          <h4>Amount : ₹{booking.train.fare}</h4>

          <hr />

          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              value="UPI"
              name="payment"
              onChange={(e) => setMethod(e.target.value)}
            />

            <label>UPI</label>
          </div>

          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              value="Debit Card"
              name="payment"
              onChange={(e) => setMethod(e.target.value)}
            />

            <label>Debit Card</label>
          </div>

          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              value="Credit Card"
              name="payment"
              onChange={(e) => setMethod(e.target.value)}
            />

            <label>Credit Card</label>
          </div>

          <hr />

          {method === "UPI" && (
            <input
              className="form-control"
              placeholder="Enter UPI ID"
              name="upiId"
              onChange={handleChange}
            />
          )}

          {(method === "Debit Card" || method === "Credit Card") && (
            <>
              <input
                className="form-control mb-2"
                placeholder="Card Holder Name"
                name="cardHolder"
                onChange={handleChange}
              />

              <input
                className="form-control mb-2"
                placeholder="Card Number"
                name="cardNumber"
                maxLength="16"
                onChange={handleChange}
              />

              <input
                type="month"
                className="form-control mb-2"
                name="expiry"
                onChange={handleChange}
              />

              <input
                type="password"
                className="form-control"
                placeholder="CVV"
                maxLength="3"
                name="cvv"
                onChange={handleChange}
              />
            </>
          )}

          <br />

          <button
            className="btn btn-success"
            onClick={payNow}
            disabled={loading}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Payment;

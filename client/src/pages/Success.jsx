import { Link } from "react-router-dom";

function Success() {
  const booking = JSON.parse(localStorage.getItem("booking"));

  const pnr = localStorage.getItem("pnr");

  const txn = localStorage.getItem("transactionId");

  return (
    <div className="container mt-5">
      <div className="card shadow text-center">
        <div className="card-body">
          <h1 className="text-success">Payment Successful</h1>

          <hr />

          <h4>PNR : {pnr}</h4>

          <h5>Transaction : {txn}</h5>

          <h5>Train : {booking.train.trainName}</h5>

          <h5>Passenger : {booking.passengerName}</h5>

          <h5>Amount Paid : ₹{booking.train.fare}</h5>

          <br />

          <Link to="/history" className="btn btn-primary">
            My Bookings
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Success;

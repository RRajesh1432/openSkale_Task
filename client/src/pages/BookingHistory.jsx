import { useEffect, useState } from "react";
import API from "../services/api";

function BookingHistory() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return;

    const res = await API.get("/bookings");

    const myBookings = res.data.filter((booking) => booking.userId === user.id);

    setBookings(myBookings);
  };

  const cancelBooking = async (id) => {
    if (!window.confirm("Cancel this ticket?")) {
      return;
    }

    await API.delete(`/bookings/${id}`);

    loadBookings();
  };

  return (
    <div className="container mt-5">
      <h2>My Bookings</h2>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Train</th>
            <th>Passenger</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Fare</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.trainName}</td>

              <td>{booking.passengerName}</td>

              <td>{booking.age}</td>

              <td>{booking.gender}</td>

              <td>₹{booking.fare}</td>

              <td>{booking.status}</td>

              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => cancelBooking(booking.id)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookingHistory;

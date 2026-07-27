import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

function BookTicket() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [train, setTrain] = useState({});

  const [booking, setBooking] = useState({
    passengerName: "",
    age: "",
    gender: "",
    berth: "",
    mobile: "",
  });

  useEffect(() => {
    loadTrain();
  }, []);

  const loadTrain = async () => {
    try {
      const res = await API.get(`/trains/${id}`);

      setTrain(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setBooking({
      ...booking,
      [e.target.name]: e.target.value,
    });
  };

  const proceedToPayment = (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please Login First");
      navigate("/login");
      return;
    }

    if (train.availableSeats <= 0) {
      alert("No Seats Available");
      return;
    }

    const bookingData = {
      userId: user.id,

      train: train,

      passengerName: booking.passengerName,

      age: booking.age,

      gender: booking.gender,

      berth: booking.berth,

      mobile: booking.mobile,
    };

    localStorage.setItem("booking", JSON.stringify(bookingData));

    navigate("/payment");
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h3>Book Ticket</h3>
        </div>

        <div className="card-body">
          <h4 className="mb-3">Train Details</h4>

          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>Train No</th>
                <td>{train.trainNo}</td>
              </tr>

              <tr>
                <th>Train Name</th>
                <td>{train.trainName}</td>
              </tr>

              <tr>
                <th>Source</th>
                <td>{train.source}</td>
              </tr>

              <tr>
                <th>Destination</th>
                <td>{train.destination}</td>
              </tr>

              <tr>
                <th>Available Seats</th>
                <td>{train.availableSeats}</td>
              </tr>

              <tr>
                <th>Fare</th>
                <td>₹ {train.fare}</td>
              </tr>
            </tbody>
          </table>

          <hr />

          <h4>Passenger Details</h4>

          <form onSubmit={proceedToPayment}>
            <div className="mb-3">
              <label className="form-label">Passenger Name</label>

              <input
                type="text"
                className="form-control"
                name="passengerName"
                value={booking.passengerName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="row">
              <div className="col-md-4">
                <label>Age</label>

                <input
                  type="number"
                  className="form-control"
                  name="age"
                  value={booking.age}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4">
                <label>Gender</label>

                <select
                  className="form-select"
                  name="gender"
                  value={booking.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>

                  <option value="Male">Male</option>

                  <option value="Female">Female</option>

                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="col-md-4">
                <label>Berth Preference</label>

                <select
                  className="form-select"
                  name="berth"
                  value={booking.berth}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>

                  <option value="Lower">Lower</option>

                  <option value="Middle">Middle</option>

                  <option value="Upper">Upper</option>

                  <option value="Side Lower">Side Lower</option>

                  <option value="Side Upper">Side Upper</option>
                </select>
              </div>
            </div>

            <div className="mt-3">
              <label>Mobile Number</label>

              <input
                type="tel"
                className="form-control"
                name="mobile"
                maxLength="10"
                value={booking.mobile}
                onChange={handleChange}
                required
              />
            </div>

            <hr />

            <div className="d-flex justify-content-between">
              <h4 className="text-success">Total Fare : ₹ {train.fare}</h4>

              <button type="submit" className="btn btn-success btn-lg">
                Proceed To Payment →
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookTicket;

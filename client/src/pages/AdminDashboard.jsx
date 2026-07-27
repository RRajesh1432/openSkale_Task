import { useEffect, useState } from "react";
import API from "../services/api";

function AdminDashboard() {
  const emptyTrain = {
    trainNo: "",
    trainName: "",
    source: "",
    destination: "",
    availableSeats: "",
    fare: "",
  };

  const [train, setTrain] = useState(emptyTrain);
  const [trains, setTrains] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadTrains();
  }, []);

  const loadTrains = async () => {
    const res = await API.get("/trains");
    setTrains(res.data);
  };

  const handleChange = (e) => {
    setTrain({
      ...train,
      [e.target.name]: e.target.value,
    });
  };

  const saveTrain = async (e) => {
    e.preventDefault();

    if (editId) {
      await API.put(`/trains/${editId}`, train);
      alert("Train Updated");
    } else {
      await API.post("/trains", train);
      alert("Train Added");
    }

    setTrain(emptyTrain);
    setEditId(null);
    loadTrains();
  };

  const editTrain = (train) => {
    setTrain(train);
    setEditId(train.id);
  };

  const deleteTrain = async (id) => {
    if (!window.confirm("Delete this train?")) return;

    await API.delete(`/trains/${id}`);
    loadTrains();
  };

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>

      <form onSubmit={saveTrain} className="card p-3 mb-4">
        <input
          className="form-control mb-2"
          placeholder="Train Number"
          name="trainNo"
          value={train.trainNo}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-2"
          placeholder="Train Name"
          name="trainName"
          value={train.trainName}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-2"
          placeholder="Source"
          name="source"
          value={train.source}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-2"
          placeholder="Destination"
          name="destination"
          value={train.destination}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-2"
          type="number"
          placeholder="Available Seats"
          name="availableSeats"
          value={train.availableSeats}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-3"
          type="number"
          placeholder="Fare"
          name="fare"
          value={train.fare}
          onChange={handleChange}
          required
        />

        <button className="btn btn-primary">
          {editId ? "Update Train" : "Add Train"}
        </button>
      </form>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Source</th>
            <th>Destination</th>
            <th>Seats</th>
            <th>Fare</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {trains.map((train) => (
            <tr key={train.id}>
              <td>{train.trainNo}</td>
              <td>{train.trainName}</td>
              <td>{train.source}</td>
              <td>{train.destination}</td>
              <td>{train.availableSeats}</td>
              <td>₹{train.fare}</td>

              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => editTrain(train)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteTrain(train.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;

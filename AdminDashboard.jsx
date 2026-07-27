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
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadTrains();
  }, []);

  const loadTrains = async () => {
    try {
      const res = await API.get("/trains");
      setTrains(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setTrain({
      ...train,
      [e.target.name]: e.target.value,
    });
  };

  const saveTrain = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await API.put(`/trains/${editId}`, train);
        alert("Train Updated Successfully");
      } else {
        await API.post("/trains", train);
        alert("Train Added Successfully");
      }

      setTrain(emptyTrain);
      setEditId(null);
      setShowForm(false);

      loadTrains();
    } catch (error) {
      console.log(error);
    }
  };

  const editTrain = (selectedTrain) => {
    setTrain(selectedTrain);
    setEditId(selectedTrain.id);
    setShowForm(true);
  };

  const deleteTrain = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this train?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/trains/${id}`);
      alert("Train Deleted Successfully");
      loadTrains();
    } catch (error) {
      console.log(error);
    }
  };

  const cancelForm = () => {
    setShowForm(false);
    setTrain(emptyTrain);
    setEditId(null);
  };

  return (
    <div className="container mt-4">

      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>🚆 Admin Dashboard</h2>

        <button
          className="btn btn-success"
          onClick={() => {
            setShowForm(true);
            setEditId(null);
            setTrain(emptyTrain);
          }}
        >
          + Add Train
        </button>
      </div>

      {/* Add/Edit Form */}

      {showForm && (
        <div className="card shadow mb-4">

          <div className="card-header bg-primary text-white">
            <h4 className="mb-0">
              {editId ? "Update Train" : "Add Train"}
            </h4>
          </div>

          <div className="card-body">

            <form onSubmit={saveTrain}>

              <div className="row">

                <div className="col-md-6 mb-3">
                  <label className="form-label">Train Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="trainNo"
                    value={train.trainNo}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Train Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="trainName"
                    value={train.trainName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Source</label>
                  <input
                    type="text"
                    className="form-control"
                    name="source"
                    value={train.source}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Destination</label>
                  <input
                    type="text"
                    className="form-control"
                    name="destination"
                    value={train.destination}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Available Seats</label>
                  <input
                    type="number"
                    className="form-control"
                    name="availableSeats"
                    value={train.availableSeats}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Fare (₹)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="fare"
                    value={train.fare}
                    onChange={handleChange}
                    required
                  />
                </div>

              </div>

              <div className="mt-3">

                <button
                  type="submit"
                  className="btn btn-primary me-2"
                >
                  {editId ? "Update Train" : "Save Train"}
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={cancelForm}
                >
                  Cancel
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* Train List */}

      <div className="card shadow">

        <div className="card-header bg-dark text-white">
          <h4 className="mb-0">Train List</h4>
        </div>

        <div className="card-body">

          <table className="table table-bordered table-hover text-center">

            <thead className="table-dark">

              <tr>
                <th>Train No</th>
                <th>Train Name</th>
                <th>Source</th>
                <th>Destination</th>
                <th>Seats</th>
                <th>Fare</th>
                <th>Actions</th>
              </tr>

            </thead>

            <tbody>

              {trains.length > 0 ? (
                trains.map((train) => (
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
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No Trains Available
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;
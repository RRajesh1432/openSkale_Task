import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function SearchTrain() {
  const [trains, setTrains] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");

  useEffect(() => {
    loadTrains();
  }, []);

  const loadTrains = async () => {
    const res = await API.get("/trains");
    setTrains(res.data);
    setFiltered(res.data);
  };

  const searchTrain = () => {
    const result = trains.filter(
      (train) =>

        train.source.toLowerCase().includes(source.toLowerCase().trim()) &&
        train.destination.toLowerCase().includes(destination.toLowerCase().trim()),
    );

    setFiltered(result);
  };

  return (
    <div className="container mt-5">
      <h2>Search Train</h2>

      <div className="row mb-4">
        <div className="col">
          <input
            className="form-control"
            placeholder="Source"
            onChange={(e) => setSource(e.target.value)}
          />
        </div>

        <div className="col">
          <input
            className="form-control"
            placeholder="Destination"
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>

        <div className="col">
          <button className="btn btn-primary w-100" onClick={searchTrain}>
            Search
          </button>
        </div>
      </div>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>No</th>

            <th>Name</th>

            <th>Source</th>

            <th>Destination</th>

            <th>Seats</th>

            <th>Fare</th>

            <th></th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((train) => (
            <tr key={train.id}>
              <td>{train.trainNo}</td>

              <td>{train.trainName}</td>

              <td>{train.source}</td>

              <td>{train.destination}</td>

              <td>{train.availableSeats}</td>

              <td>₹{train.fare}</td>

              <td>
               

                <Link to={`/book/${train.id}`} className="btn btn-success">
                  Book Now
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SearchTrain;

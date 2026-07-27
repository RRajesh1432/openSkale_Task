import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    alert("Logged out successfully");
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand fw-bold" to="/">
          🚆 IRCTC Booking
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Left Menu */}
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/search">
                Search Train
              </Link>
            </li>

            {user && (
              <li className="nav-item">
                <Link className="nav-link" to="/history">
                  Booking History
                </Link>
              </li>
            )}

            {user && user.role === "admin" && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">
                  Manage Trains
                </Link>
              </li>
            )}

            {user && (
              <li className="nav-item">
                <Link className="nav-link" to="/payment-details">
                  Payment Details
                </Link>
              </li>
            )}
          </ul>

          {/* Right Menu */}
          <ul className="navbar-nav">
            {user ? (
              <>
                <li className="nav-item d-flex align-items-center text-white me-3">
                  Welcome, <strong className="ms-1">{user.name}</strong>
                </li>

                <li className="nav-item">
                  <button className="btn btn-danger" onClick={logout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

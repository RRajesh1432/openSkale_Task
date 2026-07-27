import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function PaymentDetails() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [payment, setPayment] = useState({
    paymentType: "",
    cardHolder: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    upiId: "",
  });

  const handleChange = (e) => {
    setPayment({
      ...payment,
      [e.target.name]: e.target.value,
    });
  };

  const savePayment = async (e) => {
    e.preventDefault();

    await API.post("/payments", {
      userId: user.id,
      ...payment,
    });

    alert("Payment Details Saved Successfully");

    navigate("/search");
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h3>Add Payment Details</h3>
        </div>

        <div className="card-body">
          <form onSubmit={savePayment}>
            <div className="mb-3">
              <label className="form-label">Payment Type</label>

              <select
                className="form-select"
                name="paymentType"
                value={payment.paymentType}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Debit Card">Debit Card</option>
                <option value="Credit Card">Credit Card</option>
                <option value="UPI">UPI</option>
              </select>
            </div>

            {(payment.paymentType === "Debit Card" ||
              payment.paymentType === "Credit Card") && (
              <>
                <div className="mb-3">
                  <label>Card Holder Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="cardHolder"
                    value={payment.cardHolder}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label>Card Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="cardNumber"
                    maxLength="16"
                    value={payment.cardNumber}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>Expiry Date</label>
                    <input
                      type="month"
                      className="form-control"
                      name="expiry"
                      value={payment.expiry}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>CVV</label>
                    <input
                      type="password"
                      className="form-control"
                      name="cvv"
                      maxLength="3"
                      value={payment.cvv}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </>
            )}

            {payment.paymentType === "UPI" && (
              <div className="mb-3">
                <label>UPI ID</label>
                <input
                  type="text"
                  className="form-control"
                  name="upiId"
                  placeholder="example@upi"
                  value={payment.upiId}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <button className="btn btn-success">Save Payment Details</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PaymentDetails;

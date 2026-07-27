import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const register = async (e) => {

        e.preventDefault();

        const res = await API.get("/users");

        const exists = res.data.find(
            u => u.email === user.email
        );

        if (exists) {
            alert("Email already exists");
            return;
        }

        await API.post("/users", user);

        alert("Registration Successful");

        navigate("/login");
    };

    return (

        <div className="container mt-5">

            <h2>Register</h2>

            <form onSubmit={register}>

                <input
                    className="form-control mb-3"
                    placeholder="Name"
                    name="name"
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                />

                <button className="btn btn-success">
                    Register
                </button>

            </form>

        </div>
    );
}

export default Register;
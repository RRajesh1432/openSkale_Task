import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const login = async (e) => {

        e.preventDefault();

        const res = await API.get("/users");

        const user = res.data.find(
            u =>
                u.email === email &&
                u.password === password
        );

        if (!user) {

            alert("Invalid Credentials");

            return;
        }

        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );

        alert("Login Successful");

        navigate("/search");

    };

    return (

        <div className="container mt-5 w-25 ">

            <h2>Login</h2>

            <form onSubmit={login}>

                <input
                    className="form-control mb-3"
                    placeholder="Email"
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Password"
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <button className="btn btn-primary ">
                    Login
                </button>

            </form>

        </div>
    );
}

export default Login;
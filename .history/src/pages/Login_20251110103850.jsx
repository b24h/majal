import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const adminCredentials = {
        email: "admin@gmail.com",
        password: "admin123"
    };

    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email === adminCredentials.email && password === adminCredentials.password){
            localStorage.setItem("isAuthenticated", "true");
            navigate("/dashboard");
        } else {
            setError("Email ou mot de passe incorrect !");
        }
    };

    return(
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
            <div className="bg-white p-8 rounded-2x1 shadow-lg w-full max-w-md">
                <h1 className="text-2x1 font-bold text-center mb-"></h1>
            </div>
        </div>
    )
}
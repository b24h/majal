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

        if (email === adminCredentials.email &&)
    }
}
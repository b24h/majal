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
                <h1 className="text-2x1 font-bold text-center mb-6 text-gray-800">
                    Tableau de bord - Connexion
                </h1>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                            Adresse email
                        </label>
                        <input 
                            type="email" 
                            id="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="admin@gmail.com" 
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" 
                            required />
                    </div>
                    <div>
                        <label htmlFor="mdp" className="block text-gray-700 font-medium mb-2">
                            Mot de passe
                        </label>
                        <input 
                            type="password" 
                            value={password}
                            onChnage={(e) => setPassword(e.target.value)}
                            placeholder="********" />
                    </div>
                </form>
            </div>
        </div>
    )
}
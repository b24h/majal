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
            <div className="bg-cyan-900 p-8 rounded-4xl shadow-lg w-full max-w-md">
                <h1 className="text-2x1 font-poopins text-center mb-10 mt-3 text-white text-bold">
                    Se Connecter
                </h1>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-white-00 font-medium mb-2">
                            
                        </label>
                        <input 
                            type="email" 
                            id="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="admin@gmail.com" 
                            className="w-full bg-- px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-600 mb-2" 
                            required />
                    </div>
                    <div>
                        <label htmlFor="mdp" className="block text-gray-700 font-medium mb-2">
                           
                        </label>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter votre mot de pass"
                            className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-cyan-700 mb-4" 
                            required />
                    </div>
                    {error && (
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    )}
                    <div className="flex justify-center ">
                     <button className="w-1/2 py-3 bg-amber-500  text-white py-2 rounded-full hover:bg-amber-600 transition-all duration-200 font-Montserrat text-sm">
                        Se Connecter
                     </button>
                    </div>
                </form>
                <p className="text-center text-gray-400 text-sm mt-4">
                    Utilisez : <span className="font-sm">admin@gmail.com / admin123</span>
                </p>
            </div>
        </div>
    )
}
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

export default function AppRouter(){
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

    return(
        <Router>
            Routes
        </Router>
    )
}
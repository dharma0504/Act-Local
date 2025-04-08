import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import { UserProvider } from './components/UserContext';
import Signup from "./components/Signup";
import RequestList from "./components/RequestList";
import AddRequest from "./components/AddRequest";
import Volunteerdashboard from "./components/Volunteerdashboard";
import Organisationdashboard from "./components/Organisationdashboard";
import LandingPage from "./components/Landingpage";
import RequestDetail from "./components/RequestDetail";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <UserProvider>
      <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/volunteer-dashboard" element={<Volunteerdashboard />} />
        <Route path="/organization-dashboard" element={<Organisationdashboard />} />
        <Route path="/requests" element={<RequestList/>} />
        <Route path="/requests/:id" element={<RequestDetail />} />
        <Route
          path="/add-request"
          element={
            user?.role === "organization" ? (
              <AddRequest />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/addrequest" element={<AddRequest></AddRequest>}/>
      </Routes>
    </Router>
    </UserProvider>
  );
}

export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Import necessary components from react-router-dom

import Login from './Components/Login';
import NavigationBar from './Components/NavigationBar';
import PizzaGrid from './Components/PizzaGrid';
import axios from 'axios';
import Payment from './Components/Payments';





function App() {


  // Manage login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Handle login success (for example, set to true when login is successful)
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div className="App">
        {isLoggedIn && <NavigationBar />} {/* Show the navigation bar only after login */}
        <Routes>
          <Route
            path="/login"
            element={!isLoggedIn ? <Login onLoginSuccess={handleLoginSuccess} /> : <Navigate to="/" />}
          />
          <Route path="/payment" element={<Payment />} />
          <Route
            path="/"
            element={isLoggedIn ? <PizzaGrid /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

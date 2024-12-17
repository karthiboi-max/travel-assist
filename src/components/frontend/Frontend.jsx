import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Header";
import Homepage from "./pages/Homepage";
import Loginpage from "./pages/Loginpage";
import Bookingpage from "./pages/Bookingpage";
import AIRecommendations from "./pages/AIRecommendations";

const Frontend = () => (
  <Router>
    <Header />
    <main>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/recommendations" element={<AIRecommendations />} />
      </Routes>
    </main>
  </Router>
);

export default Frontend;

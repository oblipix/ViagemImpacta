import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Packages from '../pages/Packages';
import PackageDetailsPage from '../pages/PackageDetailsPage';
import Booking from '../pages/Booking';
import Login from '../pages/Login';
import HotelsPage from '../pages/HotelsPage';
import HotelDetailsPage from '../pages/HotelDetailsPage';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/packages/:id" element={<PackageDetailsPage />} />
        <Route path="/packages/search" element={<Packages />} />
        <Route path="/hotels" element={<HotelsPage />} />
        <Route path="/hotels/:id" element={<HotelDetailsPage />} />
        <Route path="/hotels/stars/:stars" element={<Packages />} />
        <Route path="/hotels/amenities" element={<Packages />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
    ''
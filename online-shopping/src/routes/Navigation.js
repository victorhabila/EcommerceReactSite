import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // to be able to use Link
import Cart from "../components/Cart";
import Home from "../components/Home";
import Narvbar from "../components/common/Narvbar";
import Footer from "../components/common/Footer";
import NotFound from "../components/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navigation = () => {
  return (
    <Router>
      <Narvbar />
      <ToastContainer />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/cart" element={<Cart />}></Route>
        <Route exact path="/not-found" element={<NotFound />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default Navigation;

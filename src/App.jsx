import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import FormContent from "./pages/FormContent/FormContent";
import NewForm from "./pages/NewForm/NewForm";
import Navbar from "./components/Navbar/Navbar";
import FormMake from "./pages/FormMake/FormMake";
import { Pagination } from "react-bootstrap";
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/form" element={<NewForm />}></Route>
        <Route path="/form/:formID" element={<FormMake />}></Route>
        <Route path="/formdata/:id" element={<FormContent />}></Route>
      </Routes>
    </Router>
  );
};

export default App;

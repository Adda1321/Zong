import { React } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";

import "./App.css";
// import Table from "./components/Table";
import Layout from "./Pages/layout/Layout";
import NavBar from "./components/Home/AppBar";
import Home from "./Pages/home/Home";
import Extension from "./Pages/extension/Extension";
import IVR from "./Pages/IVR/Ivr";
import Queue from "./Pages/Queue/Queue";

function App() {
  return (
    <>
      <Router>
         
        <NavBar>
         <Routes>
            <Route path="/" element={<Navigate replace to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/extension" element={<Extension />} />
            <Route path="/ivr" element={<IVR />} />
            <Route path="/queue" element={<Queue />} />
            
          </Routes> 
        </NavBar>
        {/* </Layout> */}
      </Router>
    </>
  );
}

export default App;

import React, { useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";

import "./App.css";
// import Table from "./components/Table";
import Layout from "./Pages/layout/Layout";
import NavBar from "./components/Home/AppBar";
import Home from "./Pages/home/Home";
import Extension from "./Pages/extension/Extension";
import IVR from "./Pages/IVR/Ivr";
import Queue from "./Pages/Queue/Queue";
import Login from "./Pages/LoginPage/Login";
import { useSelector } from "react-redux";
import LandingPage from "./Pages/LoginPage/LandingPage";
import SystemSound from "./Pages/SystemSound/SystemSound";
import MOHClass from "./Pages/MOHClass/MOHClass";
import VoiceMail from "./Pages/VoiceMail/VoiceMail";
import Announcement from "./Pages/Announcement/Announcement";
import Analytics from "./Analytics";
import CommunicationRecords from "./CommunicationRecords";
import TimingCondition from "./Pages/TimingConditions/TimingCondition";
import Call from "./Pages/Call/Call";
import CallMessage from "./Pages/CallMessages/CallMessages";
function App() {
  // const [token, setToken] = React.useState('');
  // alert('R O U T E')
  const isLoggedIn = useSelector((state) => state.Login.isLoggedIn);
  // if(!token) {
  //   return <Login setToken={setToken} />

  // }
  const token = localStorage.getItem("token");

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LandingPage />} />
          <Route
            path="/"
            element={
              token ? <Outlet /> : <Navigate to="/login" replace={true} />
            }
          >
            <Route path="/" element={<NavBar />}>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<Home />} />
              <Route path="/extension" element={<Extension />} />
              <Route path="/ivr" element={<IVR />} />
              <Route path="/queue" element={<Queue />} />
              <Route path="/SystSound" element={<SystemSound />} />
              <Route path="/MOHClass" element={<MOHClass />} />
              <Route path="/Vmail" element={<VoiceMail />} />
              <Route path="/announcement" element={<Announcement />} />
              <Route path="/analytic" element={<Analytics />} />
              <Route path="/commRecord" element={<CommunicationRecords />} />
              <Route path="/TimingCondition" element={<TimingCondition />} />
              <Route path="/call" element={<Call />} />
              <Route path="/messages" element={<CallMessage/>} />
              
              

            </Route>
          </Route>
        </Routes>
        {/* </Layout> */}
      </Router>
    </>
  );
}

const ProtectedRoute = ({ path, component: Component, ...rest }) => {
  const token = localStorage.getItem("token");
  return (
    <>
      <Route
        path={path}
        {...rest}
        element={
          token ? <Component {...rest} /> : <Navigate to="/login" replace />
        }
      />
    </>
  );
};

{
  /* <Route
  path="/home"
  element={
    <>
      <NavBar />
      <Home />
    </>
  }
/>; */
}

export default App;

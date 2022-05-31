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
          <Route path="/login" element={<Login />} />
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

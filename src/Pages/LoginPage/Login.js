import React, { useState } from "react";
import LoginCall from "../../APICalls/LogInCall/LoginCall";
import { BaseURL, GetLogin } from "../../Constants";
import { getUser } from "../../store/UserCall";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Success = useSelector((state=> state.Login.isSuccess))
// const Error = useSelector((state=> state.Login.message))
  const handleSubmit = async (e) => {
    e.preventDefault();
    var bodyFormData = new FormData();
    bodyFormData.append("user_name", username);
    bodyFormData.append("password", password);
    dispatch(getUser({ bodyFormData, navigate }));
  };
  const LoginWrapper = {
    display: "flex",
    alignItems: "center",
  };
  return (
    <div className={LoginWrapper}>
      {/* {body.password & body.user_name && <LoginCall body={body} />} */}
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={(e) => setUserName(e.target.value)} />
          {/* <div style={{color:'red' , fontSize:10}}>
          {Error && Error}
          </div> */}
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <div style={{color:'red' , fontSize:10}}>
          {Error && Error}
          </div> */}
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

// Login.propTypes = {
//   setToken: PropTypes.func.isRequired
// };

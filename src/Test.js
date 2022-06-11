import * as React from "react";
import { NavLink } from "react-router-dom";
import "./App.css";

export default function NavList() {
  // This styling will be applied to a <NavLink> when the
  // route that it links to is currently selected.
  let activeStyle = {
    textDecoration: "none",
    color: "pink",
  };

  let activeClassName = "underline";
  const arr = ["test", "message", "momo"];
  return (
    <div>
      {arr.map((val) => (
        <NavLink
          to={val}
          // className={({isActive}) => isActive ?'test2' : 'test3' }
          className={({ isActive }) =>
                  isActive ? 'test' : 'test2'
                  }
        >
          <div>

          {val}

          </div>
          
        </NavLink>
      ))}
    </div>
  );
}

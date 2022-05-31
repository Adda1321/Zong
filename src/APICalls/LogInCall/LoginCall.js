import React, { useState, useEffect } from "react";
import axios from "axios";
import { ZongPortal } from "../../Service/ZongPortal";

function LoginCall({ body }) {
  useEffect(() => {
    console.log("choos->", body);
    ZongPortal.Login(body)
      .then((res) => {
        // props.isLoading(true);
        console.log("CHOOSE", res.data.token);
        // props.parentCallback(res.data.dial_lists);
        // handleDestination
        // props.isLoading(false);
      })
      .catch((err) => {
        console.log("Erro-", err);
        // props.ErrorCallback(err);
      });
  }, []);

  // return posts
}

export default LoginCall;

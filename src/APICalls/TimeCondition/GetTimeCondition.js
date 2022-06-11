import React, { useState, useEffect } from "react";
import axios from "axios";
import { ZongPortal } from "../../Service/ZongPortal";

function GetTimeCondition(props) {
  useEffect(() => {
    ZongPortal.FetchTimeCondition()
      .then((res) => {
        // props.isLoading(true);
        // console.log('CHOOSE' , res.data.dial_lists)
        props.parentCallback(res.data.time_conditions);
        // handleDestination
        // props.isLoading(false);
      })
      .catch((err) => {
        console.log("Extension-", err);
        props.ErrorCallback(err);
      });
  }, []);

  // return posts
}

export default GetTimeCondition;

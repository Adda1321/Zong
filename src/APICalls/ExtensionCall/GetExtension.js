import React, { useState, useEffect } from "react";
import axios from "axios";
import { ZongPortal } from "../../Service/ZongPortal";

function GetExtension(props) {
  useEffect(() => {
    ZongPortal.FetchExtension()
      .then((res) => {
        props.isLoading(true);
        // console.log('CHOOSE' , res.data.dial_lists)
        props.parentCallback(res.data.dial_lists);
        // handleDestination
        props.isLoading(false);
      })
      .catch((err) => {
        console.log("Extension-", err);
        props.ErrorCallback(err);
      });
  }, []);

  // return posts
}

export default GetExtension;

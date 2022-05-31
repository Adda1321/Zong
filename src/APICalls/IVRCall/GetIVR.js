import React, { useState, useEffect } from "react";
import axios from "axios";
import { ZongPortal } from "../../Service/ZongPortal";

function GetIVR(props) {
    
  useEffect(() => {
    ZongPortal.FetchIVR()
      .then((res) => {
        // props.isLoading(true)
        props.parentCallback(res.data .ivrs);
        console.log('IVR Resp' , res.data .ivrs)
        // props.isLoading(false)
      })
      .catch((err) => {
        console.log("Extension-", err);
        // props.ErrorCallback(err);
      })

    //   .finally(() => {
    //     setLoading(false);
    //   });
  }, []);

  // return posts
}

export default GetIVR;

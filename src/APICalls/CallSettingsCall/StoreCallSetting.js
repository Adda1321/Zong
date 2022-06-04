import React, { useState, useEffect } from "react";
import axios from "axios";
import { ZongPortal } from "../../Service/ZongPortal";

function StoreCallSetting({ body, Error , Success}) {


  useEffect(() => {
    // alert(body.textField + body.NameField);

    ZongPortal.StoreCallSetting(body)
      .then((res) => {
        console.log("CHOOSE RESPONSE Store Call", res);
        Success(res.data)
        // props.parentCallback(res.data.dial_lists);
      })
      .catch((err) => {
        console.log("CHOOSE Call  ERROR", err);

        if (err.response) {
          Error(err.response.data.error);

          console.log("STATUS DATA", err.response.data.error.List_Name);
        }
      });

    //   .finally(() => {
    //     setLoading(false);
    //   });
  }, [body]);
}

export default StoreCallSetting;

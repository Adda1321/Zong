import React, { useState, useEffect } from "react";
import axios from "axios";
import { ZongPortal } from "../../Service/ZongPortal";

function StoreTimeCondition({ body, Error , Success}) {

  //   const { body } = props;

  useEffect(() => {
    // alert(body.textField + body.NameField);

    ZongPortal.StoreTimeCondition(body)
      .then((res) => {
        console.log("CHOOSE RESPONSE Store Timing Condition", res);
        Success(res.data)
        // props.parentCallback(res.data.dial_lists);
      })
      .catch((err) => {
        console.log("CHOOSE Timing STORE Condition  ERROR",err.response.data.error);

        if (err.response) {
          Error(err.response.data.error);

          console.log("STATUS DATA", err.response.data.error);
        }
      });

    //   .finally(() => {
    //     setLoading(false);
    //   });
  }, [body]);
}

export default StoreTimeCondition;

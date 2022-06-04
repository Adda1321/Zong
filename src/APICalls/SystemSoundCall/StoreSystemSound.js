import React, { useState, useEffect } from "react";
import axios from "axios";
import { ZongPortal } from "../../Service/ZongPortal";

function StoreSystemSound({ body, Error, Success, isLoading }) {
  //   alert("VLALLA");
  // const [error, setError] = useState({
  //   List_Name: null,
  //   // Num_1
  // });
  //   const { body } = props;

  useEffect(() => {
    // alert(body.textField + body.NameField);

    isLoading(true);
    ZongPortal.StoreSystemSound(body)
      .then((res) => {
        console.log("CHOOSE RESPONSE Store SYST SOUND", res);
        Success(res.data);
        isLoading(false);
        // props.parentCallback(res.data.dial_lists);
      })
      .catch((err) => {
        console.log("CHOOSE SYST SOUND  ERROR", err.request);

        if (err.response) {
          Error(err.response.data.error);

          console.log("STATUS DATA", err.response.data.error);
        }
      })

      .finally(() => {
        isLoading(false);
      });
  }, [body]);
}

export default StoreSystemSound;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { ZongPortal } from "../../Service/ZongPortal";

function CreateTimeConditions({ body, parentCallback, Error, Success }) {


  useEffect(() => {
    // alert(body.textField + body.NameField);

    ZongPortal.CreateTimeConditions(body)
      .then((res) => {
        console.log("CHOOSE SUCCESS Create Timing Conditions", res.data.sounds);

        // Success(res.data)
       parentCallback(res.data.dayOptions);
      })
      .catch((err) => {
        console.log("CHOOSE ERROR  create Timing Conditions", err);

        // if (err.response) {
        //   Error(err.response.data.error);

        //   console.log("STATUS DATA", err.response.data.error.List_Name);
        // }
      });

    //   .finally(() => {
    //     setLoading(false);
    //   });
  }, [body]);
}

export default CreateTimeConditions;

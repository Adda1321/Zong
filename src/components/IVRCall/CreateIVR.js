import React, { useState, useEffect } from "react";
import axios from "axios";
import { ZongPortal } from "../../Service/ZongPortal";

function CreateIVR({ body, SSO, ITO, ILO, Error, Success }) {
  //   alert("VLALLA");
  // const [error, setError] = useState({
  //   List_Name: null,
  //   // Num_1
  // });
  //   const { body } = props;

  useEffect(() => {
    // alert(body.textField + body.NameField);

    ZongPortal.CreateIVR(body)
      .then((res) => {
        console.log("CHOOSE SUCCESS Create IVR", res.data.systemSoundsOptions);

        SSO(res.data.systemSoundsOptions);
        ITO(res.data.inputTimeoutOptions);
        ILO(res.data.inputLengthOptions);
        // Success(res.data)
        // props.parentCallback(res.data.dial_lists);
      })
      .catch((err) => {
        console.log("CHOOSE IVR  ERROR", err);

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

export default CreateIVR;

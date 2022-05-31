import React, { useState, useEffect } from "react";
import axios from "axios";
import { ZongPortal } from "../../Service/ZongPortal";

function UpdateExtension({ body, Error, Success }) {
  //   alert("VLALLA");
  // const [error, setError] = useState({
  //   List_Name: null,
  //   // Num_1
  // });
  //   const { body } = props;
  // for (var key of body?.entries()) {
  //   console.log("CHOOSE UPDATE BODY", key[0] + ", " + key[1]);
  // }

  useEffect(() => {

    ZongPortal.UpdateExtension(body)
      .then((res) => {
        console.log("CHOOSE RESPONSE UPDATE Extension", res);
        Success(res.data);
        // props.parentCallback(res.data.dial_lists);
      })
      .catch((err) => {
        console.log("CHOOSE Extension UPDATE ERROR", err);

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

export default UpdateExtension;

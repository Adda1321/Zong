

import React, { useState, useEffect } from "react";
import axios from "axios";
import { ZongPortal } from "../../Service/ZongPortal";

function UpdateProfile({ body, parentCallback, Error, Success }) {
  useEffect(() => {
    //   for (var key of body.entries()) {
    //     console.log("FormData->", key[0] + ", " + key[1]);
    //   }
    ZongPortal.UpdateProfile(body)
      .then((res) => {
        console.log("CHOOSE SUCCESS UPDATE Profile", res.data);

        Success(res.data);
        // parentCallback(res.data.user);
      })
      .catch((err) => {
        console.log("CHOOSE UPDATE Profile  ERRRR", err.response.data.error);

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

export default UpdateProfile;

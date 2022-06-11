import React, { useState, useEffect } from "react";
import axios from "axios";
import { ZongPortal } from "../../Service/ZongPortal";

function EditProfile({ body, parentCallback, Error, Success }) {
 
    useEffect(() => {
        const userID = localStorage.getItem("userID");
        var bodyFormData = new FormData();
        bodyFormData.append("id", userID);
 

//   for (var key of body.entries()) {
//     console.log("FormData-", key[0] + ", " + key[1]);
//   }
    ZongPortal.EditProfile(bodyFormData)
      .then((res) => {
        console.log("CHOOSE SUCCESS Edit Profile", res.data.user);

        // Success(res.data)
       parentCallback(res.data.user);
      })
      .catch((err) => {
        console.log("CHOOSE Edit Profile  ERRRR", err.response.data.error);

        // if (err.response) {
        //   Error(err.response.data.error);

        //   console.log("STATUS DATA", err.response.data.error.List_Name);
        // }
      });

    //   .finally(() => {
    //     setLoading(false);
    //   });
  }, []);
}

export default EditProfile;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { ZongPortal } from "../../Service/ZongPortal";

function CreateAnnouncement({ body, parentCallback, Error, Success }) {


  useEffect(() => {
    // alert(body.textField + body.NameField);

    ZongPortal.CreateAnnouncement(body)
      .then((res) => {
        console.log("CHOOSE SUCCESS Create announcement", res.data.sounds);

        // Success(res.data)
       parentCallback(res.data.sounds);
      })
      .catch((err) => {
        console.log("CHOOSE IVR  Announcement", err);

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

export default CreateAnnouncement;

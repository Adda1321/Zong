import React, { useState, useEffect } from "react";
import axios from "axios";
import { ZongPortal } from "../../Service/ZongPortal";

function CreateSystemSound({ body, DataToShow, DataMOH }) {
  useEffect(() => {
    // alert(body.textField + body.NameField);

    ZongPortal.CreateSystemSound(body)
      .then((res) => {
        console.log("CHOOSE SUCCESS Create SYSTEMSOUND", res.data.musiconhold);
        DataMOH(res.data.musiconhold);
        DataToShow(res.data.categories);
      })
      .catch((err) => {
        console.log("CHOOSE ERR  SYSTEMSOUND", err);

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

export default CreateSystemSound;

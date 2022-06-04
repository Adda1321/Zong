import React, { useState, useEffect } from "react";
import axios from "axios";
import { ZongPortal } from "../../Service/ZongPortal";

function StoreVoiceMail({ body, Error , Success}) {
  

  useEffect(() => {
    // alert(body.textField + body.NameField);

    ZongPortal.StoreVoiceMail(body)
      .then((res) => {
        console.log("CHOOSE- RESPONSE Store VOICEMAIL", res);
        Success(res.data)
        // props.parentCallback(res.data.dial_lists);
      })
      .catch((err) => {
        console.log("CHOOSE- VOICEMAIL  ERROR", err);

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

export default StoreVoiceMail;

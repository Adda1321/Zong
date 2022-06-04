import React, { useState, useEffect } from "react";
import axios from "axios";
import { ZongPortal } from "../../Service/ZongPortal";

function StoreAnnouncement({ body, Error , Success}) {
  //   alert("VLALLA");
  // const [error, setError] = useState({
  //   List_Name: null,
  //   // Num_1
  // });
  //   const { body } = props;

  useEffect(() => {
    // alert(body.textField + body.NameField);

    ZongPortal.StoreAnnouncement(body)
      .then((res) => {
        console.log("CHOOSE RESPONSE  StoreAnnouncement", res);
        Success(res.data)
        // props.parentCallback(res.data.dial_lists);
      })
      .catch((err) => {
        console.log("CHOOSE StoreAnnouncement  ERROR", err);

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

export default StoreAnnouncement;

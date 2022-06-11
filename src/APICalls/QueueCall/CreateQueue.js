import React, { useState, useEffect } from "react";
import axios from "axios";
import { ZongPortal } from "../../Service/ZongPortal";

function CreateQueue({ body, DataToShow, DataMOH, DataAgent }) {
  useEffect(() => {
    // alert(body.textField + body.NameField);

    ZongPortal.CreateQueue(body)
      .then((res) => {
        console.log("CHOOSE SUCCESS Create QUEUE", res.data.ringOptions);
        DataToShow(res.data.ringOptions);
        DataMOH(res.data.mohSounds);
        // DataAgent(res.data.agents)
        DataAgent([
          {
            id: 3,
            user_name: "shopive",
          },
          {
            id: 4,
            user_name: "beehive",
          },
          {
            id: 5,
            user_name: "essdome",
          },
        ]);
      })
      .catch((err) => {
        console.log("CHOOSE QUEUE  ERROR", err);

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

export default CreateQueue;

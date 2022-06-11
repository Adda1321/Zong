
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ZongPortal } from "../../Service/ZongPortal";

function SearchIncoming({ body, Error , DataToShow}) {
   
  useEffect(() => {
    // alert(body.textField + body.NameField);

    ZongPortal.SearchIncoming (body)
      .then((res) => {
        console.log("CHOOSE RESPONSE Search OutGoing", res.data);
        DataToShow(res.data.search_result)
        // props.parentCallback(res.data.dial_lists);
      })
      .catch((err) => {
        // console.log("CHOOSE Search OutGoing  ERROR", err);

        if (err.response) {
          Error(err.response.data.error);

          console.log("STATUS DATA Error-", err.response.data.error);
        }
      });

    //   .finally(() => {
    //     setLoading(false);
    //   });
  }, [body]);
}

export default SearchIncoming ;

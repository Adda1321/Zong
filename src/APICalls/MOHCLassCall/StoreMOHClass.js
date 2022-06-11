import React, { useState, useEffect } from "react";
import axios from "axios";
import { ZongPortal } from "../../Service/ZongPortal";
import { isReloading } from "../../store/Reload";

import { useDispatch } from "react-redux";
function StoreMOHClass({ body, Error , Success}) {
  const dispatch=useDispatch();
 
    alert("VLALLA");
  // const [error, setError] = useState({
  //   List_Name: null,
  //   // Num_1
  // });
  //   const { body } = props;

  useEffect(() => {
    // alert(body.textField + body.NameField);

    ZongPortal.StoreMOHCall(body)
      .then((res) => {
        console.log("CHOOSE RESPONSE Store MOH", res);
        Success(res.data);
        // dispatch(isReloading(`${mode}StoreSuccess`))
        // props.parentCallback(res.data.dial_lists);
      })
      .catch((err) => {
        console.log("CHOOSE MOH  ERROR", err);

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

export default StoreMOHClass;

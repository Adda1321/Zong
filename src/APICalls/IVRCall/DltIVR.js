import React, { useState, useEffect } from "react";
import axios from "axios";
import { ZongPortal } from "../../Service/ZongPortal";

function DeleteIVR({body , parentDLT}) {
//   alert("DLT");
  const [posts, setposts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
//   const { body } = props;
 
  useEffect(() => {
     
    // alert(body.textField + body.NameField);

    ZongPortal.DeleteIvr(body)
      .then((res) => {
        console.log("CHOOSE  IVr DLT Successfully", res);
        parentDLT(res.data.status)
        // props.parentCallback(res.data.dial_lists);
    
      })
      .catch((err) => {
        console.log("CHOOSE IVR DLT", err); 
        parentDLT(err.request.withCredentials)
      })

    //   .finally(() => {
    //     setLoading(false);
    //   });
  },[body]);
  
}

export default DeleteIVR  ;

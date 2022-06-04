import React, { useState, useEffect } from "react";
import axios from "axios";
import { ZongPortal } from "../../Service/ZongPortal";

function DeleteSystemSound({body , parentDLT}) {
//   alert("DLT");
  const [posts, setposts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
//   const { body } = props;
 
  useEffect(() => {
     
    // alert(body.textField + body.NameField);

    ZongPortal.DeleteSystemSound(body)
      .then((res) => {
        console.log("CHOOSE SYSTEM SOUND DLT Successfully", res);
        parentDLT(res.data.status)
        // props.parentCallback(res.data.dial_lists);
    
      })
      .catch((err) => {
        console.log("CHOOSE  SYSTEM SOUND DLT", err);
        parentDLT(err.request.withCredentials)
      })

    //   .finally(() => {
    //     setLoading(false);
    //   });
  },[body]);
  
}

export default DeleteSystemSound ;

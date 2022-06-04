import React, { useState, useEffect } from "react";
import axios from "axios";
import { ZongPortal } from "../../Service/ZongPortal";

function DeleteMOHClass({body , parentDLT}) {
//   alert("DLT");
  const [posts, setposts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
//   const { body } = props;
 
  useEffect(() => {
     
    // alert(body.textField + body.NameField);

    ZongPortal.DeleteMOHClass(body)
      .then((res) => {
        console.log("CHOOSE MOH Call DLT Successfully", res);
        parentDLT(res.data.status)
        // props.parentCallback(res.data.dial_lists);
    
      })
      .catch((err) => {
        console.log("CHOOSE  MOH Call DLT", err);
        parentDLT(err.request.withCredentials)
      })

    //   .finally(() => {
    //     setLoading(false);
    //   });
  },[body]);
  
}

export default DeleteMOHClass ;

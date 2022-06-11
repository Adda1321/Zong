import React, { useState, useEffect } from "react";
import axios from "axios";
import { ZongPortal } from "../../Service/ZongPortal";

function EditTimeCondition({body , parentEdit}) {
//   alert("DLT");
  const [posts, setposts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
//   const { body } = props;
 
  useEffect(() => {
     
    // alert(body.textField + body.NameField);

    ZongPortal.EditTimeCondition(body)
      .then((res) => {
        console.log("CHOOSE RESPONSE Edit TimeCondition Successfully", res.data);
        parentEdit(res.data)
        // props.parentCallback(res.data.dial_lists);
    
      })
      .catch((err) => {
        console.log("CHOOSE TimeCondition Edit ERROR", err);
        // parentDLT(err.request.withCredentials)
      })

    //   .finally(() => {
    //     setLoading(false);
    //   });
  },[body]);
  
}

export default EditTimeCondition  ;

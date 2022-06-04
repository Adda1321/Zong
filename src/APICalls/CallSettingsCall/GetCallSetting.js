import React, { useState, useEffect } from "react";
import axios from "axios";
import { ZongPortal } from "../../Service/ZongPortal";

function GetCallSetting(props) {
    
  const [posts, setposts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    ZongPortal.GetCallSetting()
      .then((res) => {
        // props.isLoading(true)
        console.log('CHOOSE Call FETCH' , res.data)
        props.parentCallback(res.data);
        // props.isLoading(false)
      })
      .catch((err) => {
        console.log("EXT ERROR MOH", err);
        // props.ErrorCallback(err);
      })

      .finally(() => {
        setLoading(false);
      });
  }, []);

  // return posts
}

export default GetCallSetting;

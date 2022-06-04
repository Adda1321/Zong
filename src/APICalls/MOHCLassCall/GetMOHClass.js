import React, { useState, useEffect } from "react";
import axios from "axios";
import { ZongPortal } from "../../Service/ZongPortal";

function GetMOHClass(props) {
    
  const [posts, setposts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    ZongPortal.FetchMOHClass()
      .then((res) => {
        // props.isLoading(true)
        console.log('CHOOSE MOH FETCH' , res.data.musiconholds)
        props.parentCallback(res.data.musiconholds);
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

export default GetMOHClass;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { ZongPortal } from "../../Service/ZongPortal";

function GetExtension(props) {
    
  const [posts, setposts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    ZongPortal.FetchExtension()
      .then((res) => {
        props.isLoading(true)
        props.parentCallback(res.data.dial_lists);
        props.isLoading(false)
      })
      .catch((err) => {
        console.log("Extension-", err);
        props.ErrorCallback(err);
      })

      .finally(() => {
        setLoading(false);
      });
  }, []);

  // return posts
}

export default GetExtension;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { ZongPortal } from "../../Service/ZongPortal";

function GetQueue(props) {
    
  const [posts, setposts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    ZongPortal.FetchQueue()
      .then((res) => {
        // props.isLoading(true)
        console.log('CHOOSE Queue' , res.data.queues)
        props.parentCallback(res.data.queues);
        // props.isLoading(false)
      })
      .catch((err) => {
        console.log("Extension-", err);
        // props.ErrorCallback(err);
      })

      .finally(() => {
        setLoading(false);
      });
  }, []);

  // return posts
}

export default GetQueue;

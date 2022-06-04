import React, { useState, useEffect } from "react";
import axios from "axios";
import { ZongPortal } from "../../Service/ZongPortal";

function GetAnnouncement(props) {
  useEffect(() => {
    ZongPortal.FetchAnnouncement()
      .then((res) => {
        props.isLoading(true);
        console.log('CHOOSE Announcment FETCH' , res.data.announcement_sounds)
        props.parentCallback(res.data.announcement_sounds);
        // handleDestination
        props.isLoading(false);
      })
      .catch((err) => {
        console.log("Error Announcement Fetch", err);
        props.ErrorCallback(err);
      });
  }, []);

  // return posts
}

export default GetAnnouncement;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { ZongPortal } from "../../Service/ZongPortal";

function GetVoiceMail(props) {
  useEffect(() => {
    ZongPortal.FetchVoiceMail()
      .then((res) => {
        // props.isLoading(true);
        console.log('CHOOSE VOICE MAIL SUCCESS' , res.data.voicemail)
        props.parentCallback(res.data.voicemail);
        props.SelectionList(res.data.voice_sounds);
        
        // handleDestination
        // props.isLoading(false);
      })
      .catch((err) => {
        console.log("VOICE MAIL ERROR-", err);
        props.ErrorCallback(err);
      });
  }, []);

  // return posts
}

export default GetVoiceMail;

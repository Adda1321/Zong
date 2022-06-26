import { Button, Divider } from "@mui/material";
import React, { useState, useEffect } from "react";
import GetExtension from "../../APICalls/ExtensionCall/GetExtension";
import { makeStyles, withStyles } from "@mui/styles";
import GetIVR from "../../APICalls/IVRCall/GetIVR";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
  addDestinationType,
  addDestinationID,
  handleModal,
  selectDestination,
  select_TimeMatch,
  add_TM_DestinationID,
  add_TM_DestinationType,
  select_TimeNotMatch,
  add_TNM_DestinationID,
  add_TNM_DestinationType,
} from "../../store/Module";

import { useDispatch, useSelector } from "react-redux";
import GetTimeCondition from "../../APICalls/TimeCondition/GetTimeCondition";
import GetQueue from "../../APICalls/QueueCall/GetQueue";
import { Announcement } from "@mui/icons-material";
import GetAnnouncement from "../../APICalls/AnnouncementCall/GetAnnouncement";

const StyledButton = withStyles({
  root: {
    //   backgroundColor: '#3c52b2',
    //   color: '#fff',
    "&:hover": {
      backgroundColor: "#caccc6",
      color: "#fff",
    },
  },
})(Button);

function AnnouncementData(props) {
  const [data, setData] = useState();
  const Dest_ID = useSelector((state) => state.Dest.Destination_id);
  const dispatch = useDispatch();
  const TimeMatch = useSelector((state) => state.Dest.TimeMatches);
  const TimeNotMatch = useSelector((state) => state.Dest.TimeNotMatches);
  useEffect(() => {
    // alert("DATA");
  }, []);

  const handleClick = (CD) => {
    setData(CD);
  };
  //   console.log('dikk' , data)
  const DestinationSelected = (ID) => (
    TimeMatch &&
      (
        // alert('in Time MAch'),
        dispatch(add_TM_DestinationID(ID)),
      dispatch(add_TM_DestinationType(props.Modle_Name))),
    TimeNotMatch &&
      (
        // alert('in Time NOT MAtch'),
        dispatch(add_TNM_DestinationID(ID)),
      dispatch(add_TNM_DestinationType(props.Modle_Name))),
      
    dispatch(addDestinationType(props.Modle_Name)),
    dispatch(addDestinationID(ID)),

    dispatch(handleModal(false)),
    dispatch(select_TimeMatch(false)),
    dispatch(select_TimeNotMatch(false))
    // dispatch(selectDestination(true));
  );
  return (
    <div>
      {/* {!data &&} */}
      

      <GetAnnouncement isLoading={()=>{}} ErrorCallback={()=>{}} parentCallback={handleClick} />
      {data ? (
        <div>
          {data?.map((val, key) => (
            <React.Fragment key={key}>
              <div
                style={{
                  marginLeft: 15,
                  marginTop: 7,
                  marginBottom: 7,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <StyledButton
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                    // alignItems: "center",
                    backgroundColor:Dest_ID == val.id ? 'lightgray' : ''
                  }}
                  onClick={() => DestinationSelected(val.id)}
                >
                  <div style={{ height: 40 }}>
                    <span> {val.Dest_After_Play} </span>

                    <div style={{ marginLeft: 7 }}>Category: {val.catid} Deyail: {val.detail}</div>
                  </div>
                </StyledButton>

                {Dest_ID == val.id && (
                  <div style={{ alignContent: "center", marginTop: 10, marginRight:10 }}>
                    
                    <CheckCircleOutlineIcon fontSize="large" color="success" />
                  </div>
                )}
              </div>
              <Divider />
            </React.Fragment>
          ))}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 540,
          }}
        >
          {" "}
          Loading ....{" "}
        </div>
      )}
    </div>
  );
}

export default AnnouncementData;

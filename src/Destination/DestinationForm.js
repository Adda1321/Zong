import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button, Divider, Typography } from "@mui/material";
import { makeStyles, withStyles } from "@mui/styles";
import GetExtension from "../APICalls/ExtensionCall/GetExtension";
import ExtData from "./DataHandle/ExtData";
import { objectOf } from "prop-types";
import IVRData from "./DataHandle/IVRData";
import { useSelector } from "react-redux";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import TimeConditionData from "./DataHandle/TimeCondData";
import QueueData from "./DataHandle/QueueData";
import AnnouncementData from "./DataHandle/AnnouncementData";
import VoiceMailData from "./DataHandle/VoiceMailData";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 50,
}));

const Obj_List = [
  { name: "Extensions List", val: "DialList" },
  { name: "Time Conditions", val: "TimeCondition" },
  { name: "IVR", val: "IVR" },
  { name: "Queue", val: "Queue" },
  { name: "Announcement", val: "Announcement" },
  { name: "Voice Mail", val: "Voicemail" },
  // { name: "Hangup", val: "Hangup" },
];
const header = {
  bgcolor: "#8dc63f",
  pl: 2,
  py: 0.51,
};

const useStyles = makeStyles({
  flexGrow: {
    flex: "1",
  },
  button: {
    backgroundColor: "#a4d461",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#fff",
      color: "#fff",
    },
  },
});

const StyledButton = withStyles({
  root: {
    //   backgroundColor: '#3c52b2',
    //   color: '#fff',
    "&:hover": {
      backgroundColor: "#8dc63f",
      color: "#fff",
    },
  },
})(Button);

export default function DestinationForm() {
  const Dest_ID = useSelector((state) => state.Dest.Destination_id);
  const Dest_Type = useSelector((state) => state.Dest.Destination_type);

  

  const [component, setComponent] = useState({
    name: Dest_Type || "Extensions List", //This check is for opening Destination if it is selected by type
    val: "DialList",
  });

  useEffect(() => {
    console.log("COMPONENET-", component);
  }, [component]);

  const classes = useStyles();
  const SaveHandle = (name) => {
    const obj = {
      name: "",
      val: "",
    };
    obj.name = name.name;
    obj.val = name.val;
    setComponent(obj);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={header}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ color: "white", fontSize: 21 }}
        >
          Destination
        </Typography>
      </Box>
      <Grid container spacing={0}>
        <Grid item xs={4}>
          <Paper
            elevation={0}
            sx={{
              height: 540,
              textAlign: "center",
              //   width: 100,
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
            }}
          >
            {Obj_List.map((name, key) => {
              return (
                <>
                  <Grid item xs={12} sx={{ py: 1 }} key={key}>
                    <StyledButton
                      className={
                        component.name === name.name ? classes.button : ""
                      }
                      sx={{ pl: 2, py: 2, width: "100%" }}
                      onClick={() => SaveHandle(name)}
                    >
                      {name.name}
                    </StyledButton>
                  </Grid>
                </>
              );
            })}
          </Paper>
        </Grid>
        {/* <Divider orientation="vertical" /> */}

        <Grid item xs={8} sx={{ height: 1400 }}>
          <Paper
            elevation={0}
            sx={{
              height: 550,
              //   width: 100,
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
            }}
          >
            {/* <Item> */}
            <div style={{ height: "100%", overflow: "auto" }}>
              {(() => {
                switch (component.name) {
                  case "Extensions List":
                    return <ExtData Modle_Name={component.name} />;
                  case "Time Conditions":
                    return <TimeConditionData Modle_Name={component.name} />;
                  case "IVR":
                    return <IVRData Modle_Name={component.name} />;
                  case "Queue":
                    return <QueueData Modle_Name={component.name} />;
                  case "Announcement":
                    return <AnnouncementData Modle_Name={component.name} />;
                    case "Voice Mail":
                      
                      return <VoiceMailData Modle_Name={component.name} />;
                  //   case "Hungup":
                  //     return <Won handleClick={handleClick} />;
                  default:
                    return null;
                }
              })()}
            </div>

            {/* </Item> */}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

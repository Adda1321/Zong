import React, { useState } from "react";
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
  { name: "Announcement", val: "SystemSound" },
  { name: "Voice Mail", val: "Voicemail" },
  { name: "Hangup", val: "Hangup" },
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
  const [component, setComponent] = useState({
    name: "Extensions List",
    val: "DialList",
  });

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
                <Grid  item xs={12} sx={{ py: 1 }} key={key}>
                  <StyledButton
                    className={component.name === name.name ? classes.button : ""}
                    sx={{ pl: 2, py: 2, width: "100%" }}
                    onClick={() => SaveHandle(name)}
                  >
                    {name.name}
                  </StyledButton>
                </Grid>
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
                  //   case "Time Conditions":
                  //     return <Playing handleClick={handleClick} />;
                    case "IVR":
                      return  <IVRData Modle_Name={component.name} /> ;
                  //   case "Queue":
                  //     return <Won handleClick={handleClick} />;
                  //   case "Announcement":
                  //     return <Lost handleClick={handleClick} />;
                  //   case "Voice Mail":
                  //     return <Won handleClick={handleClick} />;
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

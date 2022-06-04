import React, { useState, useEffect } from "react";
import Table from "../../components/Table";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { Divider } from "@mui/material";
import "../../App.css";

import GetExtension from "../../APICalls/ExtensionCall/GetExtension";

import { addModule } from "../../store/Module";
import GetAnnouncement from "../../APICalls/AnnouncementCall/GetAnnouncement";
import Destination from "../../Destination";




function Announcement() {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [loading, setloading] = React.useState();
  const [error, setError] = useState("");

  // alert('extension CALLED')

  function createData(first, sec, thir, forth, emp) {
    return { first, sec, thir, forth, emp };
  }
 

  const header = ["Announcement Name", "Play", "Destination Type", "Destination Name", "Action"];
  const handleCallback = (childData) => {
    setData(
      childData.map((user) =>
        createData(
          // user.id.toString(),
          user.file_Name,
          user.file_Path,
          user.Dest_After_Play,
          user.Dest_After_Play_ID,
          // user.id.toString()
        )
      )
    );
  };
  const handleLoading = (childData) => {
    setloading(childData);
  };
  const ErrorHandling = (ChildData) => {
    setError(ChildData);
  };
  console.log("loading", loading);

  return (
    <div>
      <GetAnnouncement
        parentCallback={handleCallback}
        isLoading={handleLoading}
        ErrorCallback={ErrorHandling}
      />
      
      <Typography
        variant="h5"
        // component="div"
        sx={{ ml: 3, mt: 2, color: "#4a4a4a", fontWeight: 500 }}
      >
        Announcement
      </Typography>
      <Divider />
      <div
      // style={{display:'flex' , justifyContent:'space-evenly' , backgroundColor:'red'}}
      >
        {/* {!data ? 'ASD------' :  */}
        <Table
          search={true}
          rows={data}
          header={header}
          Error={error}
          mode={'announcement'}
          pagination={3}
        />
        {/* } */}
      </div>
<Destination/>
      {/* here gate is a prop that opens the Modal and get_state closes the modal (it is a callback fucntion) */}
      {/* <NewExt gate={open} get_state={handleClose} /> */}
    </div>
  );
}

export default Announcement;

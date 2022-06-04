import React, { useState, useEffect } from "react";
import Table from "../../components/Table";
import { Typography } from "@mui/material";
import { Divider } from "@mui/material";
import GetMOHClass from "../../APICalls/MOHCLassCall/GetMOHClass";

function MOHClass() {
  const [data, setData] = useState([]);

  function createData(first, sec, emp) {
    return { first, sec, emp };
  }

  //   console.log("ROW", rows);
  const header = ["ID", "Name", "Action"];
  const handleCallback = (childData) => {
    setData(
      childData.map((moh) =>
        createData(
          moh.id.toString(),
          moh.name,
          moh.id.toString()
        )
      )
    );
  };
  return (
    <div>
      <GetMOHClass parentCallback={handleCallback} />

      <Typography
        variant="h5"
        // component="div"
        sx={{ ml: 3, mt: 4, color: "#4a4a4a", fontWeight: 500 }}
      >
        MOH Class
      </Typography>
      <Divider />
      <Table
        search={true}
        rows={data}
        editt={true}
        header={header}
        pagination={1}
        mode={"mohClass"}
      />
    </div>
  );
}

export default MOHClass;

import React,{useState  ,useEffect} from "react";
import Table from "../../components/Table";
import { Typography } from "@mui/material";
import { Divider } from "@mui/material";
import GetIVR from "../../components/IVRCall/GetIVR";
import Destination from '../../Destination';


function IVR() {

  const [data, setData] = useState([]);
 
 

  function createData(first, sec, thir, forth , emp) {
    return { first, sec, thir, forth,emp };
  }

  const rows = [
    createData("1240", "Mp3", "1", "testivr"),
    createData("2v41", "MP3", "11", "testing phase 2"),
    createData("2342", "MP4", "2", "optional test"),
    createData("2943", "Welcome", "3", "random"),
    createData("2444", "MP4", "4", "volume "),
    createData("245", "HEllo Test", "6", "setback"),
  ];

  //   console.log("ROW", rows);
  const header = ["ID", "IVR Name", "Number of Options", "IVR Sound", "Action"];
  const handleCallback = (childData) => {
    setData(
      childData.map((ivr) =>
        createData(
          ivr.id.toString(),
          ivr.IVR_Name,
          ivr.IVR_Sound_ID,
          ivr.TO_App,
          ivr.id.toString(),
        )
      )
    );
  };
  return (
    <div>
      <GetIVR parentCallback={handleCallback} />
      <Typography
        variant="h5"
        // component="div"
        sx={{ ml: 3, mt: 4, color: "#4a4a4a", fontWeight: 500 }}
      >
        IVRs
      </Typography>
      <Divider />
      <Table search={true} rows={data} header={header} mode={'ivr'}/>

      <Destination />
    </div>
  );
}

export default IVR;

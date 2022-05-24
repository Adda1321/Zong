import React,{useState} from "react";
import Table from "../../components/Table";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Divider } from "@mui/material";
import "../../App.css";

import GetExtension from "../../components/ExtensionCall/GetExtension";

function Extension() {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [loading, setloading] = React.useState();
  const [error, setError] = useState('')

  

  function createData(first, sec, thir, forth,emp) {
    return { first, sec, thir, forth , emp };
  }

  const rows = [
    createData("121c340", "e92334", "0000", "02334244552"),
   
  ];

  const header = ["ID", "Name", "Code", "Primary Number", "Action"];
  const handleCallback = (childData) => {
    setData(
      childData.map((user) =>
        createData(
          user.id.toString(),
          user.List_Name,
          user.ext_code,
          user.Num_1,
          user.id.toString(),
        )
      )
    );
  };
  const handleLoading = (childData) => {
    setloading(childData);
  };
  const ErrorHandling = (ChildData)=>{
    setError(ChildData)
  }
  console.log("loading", loading);

  return (
    <div>
      <GetExtension parentCallback={handleCallback} isLoading={handleLoading} ErrorCallback={ErrorHandling}/>
      <Typography
        variant="h5"
        // component="div"
        sx={{ ml: 3, mt: 4, color: "#4a4a4a", fontWeight: 500 }}
      >
        Extension
      </Typography>
      <Divider />
      <div
      // style={{display:'flex' , justifyContent:'space-evenly' , backgroundColor:'red'}}
      >
        {/* {!data ? 'ASD------' :  */}
        <Table search={true} rows={data} header={header} Error={error} ext={true}/>
        {/* } */}

    
      </div>

      {/* here gate is a prop that opens the Modal and get_state closes the modal (it is a callback fucntion) */}
      {/* <NewExt gate={open} get_state={handleClose} /> */}
    </div>
  );
}

export default Extension;

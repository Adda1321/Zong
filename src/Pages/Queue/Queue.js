import React,{useState  ,useEffect} from "react";
import Table from "../../components/Table";
import { Typography } from "@mui/material";
import { Divider } from "@mui/material";
import GetIVR from "../../components/IVRCall/GetIVR";

import GetQueue from "../../components/QueueCall/GetQueue";

function Queue() {

  const [data, setData] = useState([]);


 


  function createData(first, sec, thir , emp) {
    return { first, sec, thir,emp };
  }

 

  //   console.log("ROW", rows);
  const header = ["ID", "Queue Name", "Memebers", "Action"];
  const handleCallback = (childData) => {
    setData(
      childData.map((queue) =>
        createData(
            queue.id.toString(),
            queue.queue_name,
            queue.name,
          
            queue.id.toString(),
        )
      )
    );
  };
  return (
    <div>
      <GetQueue parentCallback={handleCallback} />
      
      <Typography
        variant="h5"
        // component="div"
        sx={{ ml: 3, mt: 4, color: "#4a4a4a", fontWeight: 500 }}
      >
    Queue
      </Typography>
      <Divider />
      <Table search={true} rows={data} header={header} mode={'queue'}/>
    </div>
  );
}

export default Queue;

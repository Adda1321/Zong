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
} from "../../store/Module";

import { useDispatch, useSelector } from "react-redux";

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

function IVRData(props) {
  const [data, setData] = useState();
  const Dest_ID = useSelector((state) => state.Dest.Destination_id);
  const dispatch = useDispatch();

  useEffect(() => {
    // alert("DATA");
  }, []);

  const handleClick = (CD) => {
    setData(CD);
  };
  //   console.log('dikk' , data)

  return (
    <div>
      {/* {!data &&} */}

      <GetIVR parentCallback={handleClick} />
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
                  onClick={() => {
                    // console.log("GETVALUE", props.Modle_Name, val.id);
                    dispatch(addDestinationType(props.Modle_Name));
                    dispatch(addDestinationID(val.id));
                    dispatch(handleModal(false));
                    // dispatch(selectDestination(true));
                  }}
                >
                  <div style={{ height: 40 }}>
                    <span> {val.IVR_Name} </span>

                    <span style={{ marginLeft: 7 }}>Count: {val.id}</span>
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

export default IVRData;

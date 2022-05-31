import { Button, Divider } from "@mui/material";
import React, { useState, useEffect } from "react";
import GetExtension from "../../APICalls/ExtensionCall/GetExtension";
import { makeStyles, withStyles } from "@mui/styles";
import GetIVR from "../../APICalls/IVRCall/GetIVR";

import {
  addDestinationType,
  addDestinationID,
  handleModal,
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
      <GetExtension
        parentCallback={handleClick}
        ErrorCallback={() => {}}
        isLoading={() => {}}
      />
      <GetIVR parentCallback={handleClick} />
      {data ? (
        <div>
          {data?.map((val, key) => (
            <React.Fragment key={key}>
              <div style={{ marginLeft: 15, marginTop: 7, marginBottom: 7 }}>
                <StyledButton
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                  onClick={() => {
                    // console.log("GETVALUE", props.Modle_Name, val.id);
                    dispatch(addDestinationType(props.Modle_Name));
                    dispatch(addDestinationID(val.id));
                    dispatch(handleModal(false));
                  }}
                >
                  <div style={{ height: 40 }}>
                    <span> {val.IVR_Name} </span>

                    <span style={{ marginLeft: 7 }}>Count: {val.DTMFs}</span>
                  </div>
                </StyledButton>
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
          NO INTERNET ....{" "}
        </div>
      )}
    </div>
  );
}

export default IVRData;

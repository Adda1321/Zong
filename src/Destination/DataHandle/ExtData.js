import { Button, Divider } from "@mui/material";
import React, { useState, useEffect } from "react";
import GetExtension from "../../APICalls/ExtensionCall/GetExtension";
import { makeStyles, withStyles } from "@mui/styles";

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

function ExtData(props) {
  const [data, setData] = useState();
const dispatch=useDispatch();
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
                    alignItems: "center",
                  }}
                  onClick={() => {
                    dispatch(addDestinationType(props.Modle_Name));
                    dispatch(addDestinationID(val.id));
                    dispatch(handleModal(false));
                  }}
                >
                  <div style={{ height: 40 }}>
                    <div>
                      <span> {val.List_Name} </span>
                      <span style={{ marginLeft: 7 }}>({val.ext_code})</span>
                    </div>
                    <div>{val.Num_1}</div>
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

export default ExtData;

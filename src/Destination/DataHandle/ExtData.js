import { Button, Divider } from "@mui/material";
import React, { useState, useEffect } from "react";
import GetExtension from "../../APICalls/ExtensionCall/GetExtension";
import { makeStyles, withStyles } from "@mui/styles";
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

function ExtData(props) {
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const Dest_Type = useSelector((state) => state.Dest.Destination_type);
  const Dest_ID = useSelector((state) => state.Dest.Destination_id);
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
            // <React.Fragment key={key}>
            <div>
              <div
                style={{
                  marginLeft: 15,
                  marginTop: 7,
                  marginBottom: 7,
                  display: "flex",
                  justifyContent: "space-between",
                  // alignItems: "center",
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
                      dispatch(addDestinationType(props.Modle_Name));
                      dispatch(addDestinationID(val.id));
                      dispatch(handleModal(false));
                      // dispatch(selectDestination(true));
                    }}
                  >
                    <div style={{ height: 40 }}>
                      <div>
                        <span> {val.List_Name} </span>
                        <span style={{ marginLeft: 7 }}>({val.id})</span>
                      </div>
                      <div>{val.Num_1}</div>
                    </div>
                  </StyledButton>
                
                {Dest_ID == val.id && (
                  <div style={{ alignContent: "center", marginTop: 10, marginRight:10 }}>
                    <CheckCircleOutlineIcon fontSize="large" color="success" />
                  </div>
                )}
              </div>
              <Divider />
            </div>
            // {/* </React.Fragment> */}
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

export default ExtData;

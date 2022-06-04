import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Divider, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import CustomTextField from "../../components/TextField";
import CustomCheckBox from "../../components/CheckBox";
import MultiPhone from "../../components/MultiPhone";
import StoreExtension from "../../APICalls/ExtensionCall/StoreExtension";
import GetExtension from "../../APICalls/ExtensionCall/GetExtension";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { Modal_OpenClose } from "../../store/Modal";
import {
  handleModal,
  selectDestination,
  addDestinationID,
  addDestinationType,
} from "../../store/Module";
import { pink, red } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import CreateIVR from "../../APICalls/IVRCall/CreateIVR";
import { OnlinePredictionSharp } from "@mui/icons-material";
import { resetWarningCache } from "prop-types";
import CreateQueue from "../../APICalls/QueueCall/CreateQueue";
import StoreQueue from "../../APICalls/QueueCall/StoreQueue";
import StoreMOHClass from "../../APICalls/MOHCLassCall/StoreMOHClass";

export default function MOHClassForm(props) {
  const Dest_Type = useSelector((state) => state.Dest.Destination_type);
  const Dest_ID = useSelector((state) => state.Dest.Destination_id);
  const DestinationSelected = useSelector(
    (state) => state.Dest.selectDestination
  );
  const { EditData, parentModal } = props;
  const EditedData = EditData?.dial_list;

  const [ExtensionShow, setExtensionShow] = React.useState(false);
  const [Data, setData] = useState({});
  const [useTime, setuseTime] = useState(false);

  const [InputLength, setInputLength] = React.useState(0); //InputLength Select
  const [InputTimeout, setInputTimeout] = React.useState(0); //InputTimeout Select

  const [Error, setError] = useState(null);
  const [Success, setSuccess] = useState(null);
  const [CreateData, setCreateData] = useState([]); //For Ring Plan
  const [MOH, setMOH] = useState([]); //For MOH
  const [openForm, setOpenForm] = useState(false);
  // const [OpenDest, setOpenDest] = useState(false);

  //STATES to store related data of API RESPONSE
  const [Syst_SO, setSSO] = useState(null);
  const [Input_TO, setITO] = useState(null);
  const [Input_LO, setILO] = useState(null);

  const accent = pink.A200;
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    register,
    reset,
    setValue,

    formState: { errors },
  } = useForm({
    defaultValues: {
        MOHName: "",
    },
  });

  const style = {
    position: "absolute",
    left: "50%",
    right: "50%",
    top: "50%",
    // bottom: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    bgcolor: "background.paper",
    boxShadow: 24,
  };

  useEffect(() => {
    setOpenForm(true);
  }, []);

  const header = {
    bgcolor: "#8dc63f",
    pl: 2,
    py: 0.51,
  };

  const onSubmit = ({ MOHName }) => {
    setExtensionShow(true);
    var bodyFormData = new FormData();

    bodyFormData.append("name", MOHName);

    // setData(bodyFormData);
  };
  const succesHandle = (CD) => {
    setSuccess(CD);
  };
  // console.log("SHOW", Error);

  const SSO = (CD) => {
    setSSO(CD);
  };
  const ILO = (CD) => {
    // console.log("SOWww", CD);
    setILO(CD);
  };
  const ITO = (CD) => {
    setITO(CD);
  };
  const handleDataGet = (CD) => {
    setCreateData(CD);
  };
  const handleMOH = (CD) => {
    setMOH(CD);
  };
  return (
    <div>
      {ExtensionShow && (
          <StoreMOHClass
        
          body={Data}
          Success={succesHandle}
          Error={(err) => {
            setError(err);
          }}
        />
      )}

      <Box sx={style}>
        <Box sx={header}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ color: "white", fontSize: 21 }}
          >
            Add MOH Class
          </Typography>
        </Box>
        {Success && (
          <>
            <Stack
              sx={{
                width: "100%",
                position: "absolute",
                zIndex: 2,
                top: 15,
                mt: 0,
                py: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              spacing={2}
            >
              <Alert
                variant="filled"
                severity="success"
                action={
                  <Button
                    onClick={() => dispatch(Modal_OpenClose(false))}
                    color="inherit"
                    size="small"
                  >
                    OK
                  </Button>
                }
              >
                {/* <AlertTitle>Success</AlertTitle> */}
                <strong> {Success?.message}</strong>
              </Alert>
            </Stack>
          </>
        )}
        <Box>
          <Box sx={{ flexGrow: 1, p: 2 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Typography sx={{ color: "#8dc63f", fontSize: 20 }}>
                Basic
              </Typography>
              <Divider sx={{ py: 0.5 }} />
              <Grid container sx={{ py: 1 }} spacing={2}>
                <Grid item xs={6}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <label style={{ marginRight: 10 }} htmlFor="MOHName">
                      MOH Class Name
                    </label>

                    <Controller
                      control={control}
                      name="MOHName"
                      // defaultValue=""

                      render={({ field }) => (
                        <CustomTextField
                          // name="namefield"
                          size="small"
                          id="MOHName"
                          {...field}
                          label="MOH Name"
                          inputRef={field.ref}
                          //   defaultValue={EditedData?.List_Name}
                          //   error={Error?.List_Name ? true : false}
                          //   helperText={Error?.List_Name?.toString()}
                        />
                      )}
                    />
                  </div>
                </Grid>
              </Grid>

              <Grid container sx={{ py: 1 }} spacing={2}>
                <Grid item xs={2}>
                  <Button type="submit" variant="contained">
                    Save
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

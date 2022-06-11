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
// import MultiPhone from "../../components/MultiPhone";
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
  select_TimeMatch,
  add_TM_DestinationID,
  add_TM_DestinationType,
  select_TimeNotMatch,
  addDestinationID,
  addDestinationType,
  add_TNM_DestinationID,
  add_TNM_DestinationType,
} from "../../store/Module";
import { useDispatch, useSelector } from "react-redux";

// ----------------- DataRange-------------------
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
// --------------------------------
// import { makeStyles } from '@material-ui/core/styles';
import { pink, red } from "@mui/material/colors";
import UpdateExtension from "../../APICalls/ExtensionCall/UpdateExtension";
import StoreTimeCondition from "../../APICalls/TimeCondition/StoreTimeCondition";
import CreateTimeConditions from "../../APICalls/TimeCondition/CreateTimeConditions";

// const useStyles = makeStyles({
//   flexGrow: {
//     flex: '1',
//   },
//   button: {
//     backgroundColor: '#3c52b2',
//     color: '#fff',
//     '&:hover': {
//       backgroundColor: '#fff',
//       color: '#3c52b2',
//   },
// }})

export default function TimingConditionForm(props) {
  const { EditData, parentModal } = props;
  const EditedData = EditData?.time_condition;

  const [NumArr, setNumArr] = useState([]);
  const [Day, setDay] = React.useState([]);

  const [FromTime, setFromTime] = React.useState(null);
  const [ToTime, setToTime] = React.useState(null);
  if (EditedData?.Num_2) {
    NumArr[0] = Number(EditedData?.Num_2);
    NumArr[1] = Number(EditedData?.Num_3);
    NumArr[2] = Number(EditedData?.Num_4);
    NumArr[3] = Number(EditedData?.Num_5);
  }
  // console.log("Arr--", NumArr);
  const [openForm, setOpenForm] = useState(false);
  const [ExtensionShow, setExtensionShow] = React.useState(false);
  const [update, setupdate] = useState(false);
  const [Data, setData] = useState({});
  const [CallBack, setCallBack] = useState(false);
  // const [SoundFile, setSoundFile] = React.useState(
  //   EditedData?.List_Length || 0
  // );
  const [Error, setError] = useState(null);
  const [Success, setSuccess] = useState(null);
  const [List, setList] = useState("");
  const accent = pink.A200;
  const dispatch = useDispatch();

  const TM_Type = useSelector((state) => state.Dest.TM_Destination_Type);
  const TM_ID = useSelector((state) => state.Dest.TM_Destination_id);

  const TNM_Type = useSelector((state) => state.Dest.TNM_Destination_Type);
  const TNM_ID = useSelector((state) => state.Dest.TNM_Destination_id);

  const [inPutFieldCount, setinPutFieldCount] = useState(0);
  // const [errors, setErrors] = useState(null)

  const { handleSubmit, control, register } = useForm({
    defaultValues: {
      NameField: EditedData ? EditedData?.TC_Name : "",
      FromDay: "",

      EndDay: EditedData?.List_Length || 1,
    },
  });
  useEffect(() => {
    setOpenForm(true);
  }, []);
  //   console.log("PRimary Daata", EditData);
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "PhoneMulti", // unique name for your Field Array
    }
  );

  useEffect(() => {
      if ( EditedData?.DEST_false_App) {
          dispatch(add_TNM_DestinationType(EditedData?.DEST_false_App));
          dispatch(add_TNM_DestinationID(EditedData?.DEST_false_ID))
        }
    if (EditedData?.DEST_true_App) {
      dispatch(add_TM_DestinationType(EditedData?.DEST_true_App));
      dispatch(add_TM_DestinationID(EditedData?.DEST_true_ID))
    }
    
  }, []);



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
  const ValidationTextField = styled(TextField)({
    "& input:valid + fieldset": {
      borderColor: "green",
      borderWidth: 2,
    },
    "& input:invalid + fieldset": {
      borderLeftWidth: 6,
      padding: "4px !important",
    },
    "& input:valid:focus + fieldset": {
      borderLeftWidth: 6,
      borderColor: "red",
      padding: "4px !important", // override inline-style
    },
  });

  const header = {
    bgcolor: "#8dc63f",
    pl: 2,
    py: 0.51,
  };

  const handlecallback = (ChildData) => {
    setList(ChildData);
  };
  //   console.log("Phone-", List[0]?.phone);
  const onSubmit = ({ NameField, FromDay, EndDay }) => {
    // debugger

    setExtensionShow(true);
    var bodyFormData = new FormData();
    bodyFormData.append("tc_name", NameField);
    bodyFormData.append("start_day", FromDay);
    bodyFormData.append("end_day", EndDay);
    bodyFormData.append(
      "start_time",
      FromTime.toLocaleTimeString(["it"], {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
    bodyFormData.append(
      "end_time",
      ToTime.toLocaleTimeString(["it"], { hour: "2-digit", minute: "2-digit" })
    );
    bodyFormData.append("tc_matched_id", TM_ID);
    bodyFormData.append("tc_matched_type", TM_Type);
    bodyFormData.append("tc_notMatched_id", TNM_ID);
    bodyFormData.append("tc_notMatched_type", TNM_Type);


    
     setData(bodyFormData);
  };
  const succesHandle = (CD) => {
    setSuccess(CD);
  };
  // console.log("SHOW", Error);
  const handleDay = (CD) => {
    setDay(CD);
  };
  return (
    <div>
      {openForm && <CreateTimeConditions parentCallback={handleDay} />}
      {ExtensionShow & !update && (
        <StoreTimeCondition
          body={Data}
          Success={succesHandle}
          Error={(err) => {
            setError(err);
          }}
        />
      )}

      {/* {update && (
        <UpdateExtension
          body={Data}
          Success={succesHandle}
          Error={(err) => {
            setError(err);
          }}
        />
        
      )} */}
      <Box sx={style}>
        <Box sx={header}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ color: "white", fontSize: 21 }}
          >
            Add New Timing Condition
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
                    onClick={() => {
                      dispatch(Modal_OpenClose(false));
                      setExtensionShow(false);
                      setupdate(false);
                      // Success('');
                      // Error('')
                    }}
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
                Add New Timing Condition
              </Typography>
              <Divider sx={{ py: 0.5 }} />
              <Grid container sx={{ py: 1 }} spacing={2}>
                <Grid item xs={7}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <label style={{ marginRight: 10 }} htmlFor="NameField">
                      Name
                    </label>

                    <Controller
                      control={control}
                      name="NameField"
                      // defaultValue=""

                      render={({ field }) => (
                        <CustomTextField
                          // name="namefield"
                          size="small"
                          id="NameField"
                          {...field}
                          label="Text field"
                          inputRef={field.ref}
                          //   defaultValue={EditedData?.List_Name}
                          //   error={Error?.List_Name ? true : false}
                          //   helperText={Error?.List_Name?.toString()}
                        />
                      )}
                    />
                  </div>
                </Grid>

                <Grid item xs={6}>
                  <Box>
                    <label style={{ marginRight: 15 }} htmlFor="FromDay">
                      From Day
                    </label>

                    <Controller
                      name="FromDay"
                      control={control}
                      render={({ field }) => (
                        <Select
                          sx={{ width: 250 }}
                          // fullWidth
                          size="small"
                          label="FromDay"
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={field.value}
                          // defaultValue=""
                          onChange={(e) => field.onChange(e.target.value)}
                        >
                          {Object.keys(Day)?.map((val, key) => (
                            <MenuItem value={val}>{Day[val]}</MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Box>
                    <label style={{ marginRight: 15 }} htmlFor="EndDay">
                      End Day
                    </label>
                    <Controller
                      name="EndDay"
                      control={control}
                      render={({ field }) => (
                        <Select
                          sx={{ width: 250 }}
                          // fullWidth
                          size="small"
                          labelId="EndDay"
                          value={field.value}
                          // defaultValue=""
                          onChange={(e) => field.onChange(e.target.value)}
                        >
                          {Object.keys(Day)?.map((val, key) => (
                            <MenuItem value={val}>{Day[val]}</MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                      label="From Time"
                      value={FromTime}
                      
                      onChange={(newValue) => {
                        // console.log("FROM TIME", newValue.toLocaleTimeString(['it'], { hour: '2-digit', minute: '2-digit' }));
                        setFromTime(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                      label="To Time"
                      value={ToTime}
                      onChange={(newValue) => {
                        setToTime(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>

              <Typography sx={{ color: "#8dc63f", fontSize: 20, mt: 5 }}>
                Destination When Time Matches
              </Typography>
              <Divider sx={{ py: 0.5 }} />

              <Grid container sx={{ py: 1 }} spacing={2}>
                <Grid item xs={6} sx={{ mt: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <label style={{ marginRight: 10 }} htmlFor="Members">
                      Destination
                    </label>
                    <Button
                      variant="contained"
                      onClick={() => {
                        dispatch(handleModal(true));
                        dispatch(select_TimeMatch(true));
                        dispatch(addDestinationID(""));
                        dispatch(addDestinationType(""));
                      }}
                    >
                      Destination
                    </Button>
                    <label style={{ marginRight: 10 }} htmlFor="Members">
                      {TM_ID && `${TM_ID}: ${TM_Type}`}
                    </label>
                  </div>
                </Grid>
              </Grid>
              <Typography sx={{ color: "#8dc63f", fontSize: 20, mt: 5 }}>
                Destination When Time Not Matches
              </Typography>
              <Divider sx={{ py: 0.5 }} />

              <Grid item xs={6} sx={{ mt: 2 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <label style={{ marginRight: 10 }} htmlFor="Members">
                    Destination
                  </label>
                  <Button
                    variant="contained"
                    onClick={() => {
                      dispatch(handleModal(true));
                      dispatch(select_TimeNotMatch(true));
                      dispatch(addDestinationID(""));
                      dispatch(addDestinationType(""));
                    }}
                  >
                    Destination
                  </Button>
                  <label style={{ marginRight: 10 }} htmlFor="Members">
                    {TNM_ID && `${TNM_ID}: ${TNM_Type}`}
                    {/* llll------------------------------------------ */}
                  </label>
                </div>
              </Grid>

              <Grid container sx={{ py: 1 }} spacing={2}>
                {EditedData ? (
                  <>
                    <Grid item xs={10} />

                    <Grid item xs={2}>
                      <Button
                        type="submit"
                        sx={{ mx: 2, backgroundColor: "" }}
                        variant="contained"
                        onClick={() => {
                          setupdate(true);
                          //  onSubmit();
                        }}
                      >
                        UPDATE
                      </Button>
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid item xs={10} />

                    <Grid item xs={2}>
                      <Button type="submit" variant="contained">
                        Save
                      </Button>
                    </Grid>
                  </>
                )}
              </Grid>
            </form>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

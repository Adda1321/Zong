import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useForm, Controller } from "react-hook-form";
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
import { handleModal } from "../../store/Module";
import { pink, red } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import CreateIVR from "../../APICalls/IVRCall/CreateIVR";

export default function IVRForm(props) {

  const Dest_Type = useSelector((state) => state.Dest.Destination_type);
  const Dest_ID = useSelector((state) => state.Dest.Destination_id);


  const { EditData, parentModal } = props;
  const EditedData = EditData?.dial_list;

  const [NumArr, setNumArr] = useState([]);

  if (EditedData?.Num_2)
    for (let i = 0; i < 1; i++) {
      NumArr[i] = Number(EditedData?.Num_2);
      NumArr[i + 1] = Number(EditedData?.Num_3);
      NumArr[i + 2] = Number(EditedData?.Num_4);
      NumArr[i + 3] = Number(EditedData?.Num_5);
    }
  // console.log("Arr--", NumArr);

  const [ExtensionShow, setExtensionShow] = React.useState(false);
  const [Data, setData] = useState({});
  const [useTime, setuseTime] = useState(false);
  const [SoundFile, setSoundFile] = React.useState(0); //sound file Select
  const [InvalidMsg, setInvalidMsg] = React.useState(0); //Invalid Msg Select
  const [TimeOut, setTimeOut] = React.useState(0); //TimeOut msg Select
  const [InputLength, setInputLength] = React.useState(0); //InputLength Select
  const [InputTimeout, setInputTimeout] = React.useState(0); //InputTimeout Select

  const [Error, setError] = useState(null);
  const [Success, setSuccess] = useState(null);
  const [List, setList] = useState("");
  const [openForm, setOpenForm] = useState(false);

  //STATES to store related data of API RESPONSE
  const [Syst_SO, setSSO] = useState(null);
  const [Input_TO, setITO] = useState(null);
  const [Input_LO, setILO] = useState(null);

  const accent = pink.A200;
  const dispatch = useDispatch();
  // const [errors, setErrors] = useState(null)

  // const classes = useStyles()
  // console.log("FIELD--> ", CallBack);

  const handleChange_SSO = (event) => {
    setSoundFile(event.target.value);
  };
  const handleChange_InvalidMsg = (event) => {
    setInvalidMsg(event.target.value);
  };
  const handleChange_TimeOut = (event) => {
    setTimeOut(event.target.value);
  };

  const handleChange_InputLength = (event) => {
    setInputLength(event.target.value);
  };

  const handleChange_InputTimeOut = (event) => {
    setInputTimeout(event.target.value);
  };

  //enableAutoAttend
  //useTimeDest
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
  useEffect(() => {
    setOpenForm(true);
  }, []);

  const header = {
    bgcolor: "#8dc63f",
    pl: 2,
    py: 0.51,
  };

  const {
    handleSubmit,
    control,

    formState: { errors },
  } = useForm({
    defaultValues: {
      // ExtField: "",
      // NameField: "",
    },
  });
  const handlecallback = (ChildData) => {
    setList(ChildData);
  };
  console.log("Phone-", List[0]?.phone);
  const onSubmit = ({ IVRName, useTimeDestination, auto_attendant }) => {
    // debugger
    setExtensionShow(true);
    var bodyFormData = new FormData();
    bodyFormData.append("IVRName", IVRName);
    bodyFormData.append("auto_attendant", auto_attendant);
    bodyFormData.append("useTimeDestination", useTimeDestination);
    // bodyFormData.append("outgoingcall", outCall ? 1 : 0);
    // bodyFormData.append("callbackdetection", CallbackDetect ? 1 : 0);
    // bodyFormData.append("incomingrecording", incRec ? 1 : 0);
    // bodyFormData.append("outgoingrecording", outRec ? 1 : 0);
    // bodyFormData.append("sound", SoundFile);
    // bodyFormData.append("credit_limit", 10);
    // bodyFormData.append("Num_2", List[0]?.phone || 0);
    // bodyFormData.append("Num_3", List[1]?.phone || 0);
    // bodyFormData.append("Num_4", List[2]?.phone || 0);
    // bodyFormData.append("Num_5", List[3]?.phone || 0);
    // bodyFormData.append("onnet_minutes", 10);
    // bodyFormData.append("offet_minutes", 10);
console.log('TYPE-- ' , Dest_Type)
console.log('ID-- ' , Dest_ID)

    setData(bodyFormData);
  };
  const succesHandle = (CD) => {
    console.log("test", CD);
    setSuccess(CD);

    // setSuccess(CD)
  };
  // console.log("SHOW", Error);

  const SSO = (CD) => {
    setSSO(CD);
  };
  const ILO = (CD) => {
    console.log("SOWww", CD);
    setILO(CD);
  };
  const ITO = (CD) => {
    setITO(CD);
  };

  return (
    <div>
      {openForm && <CreateIVR SSO={SSO} ITO={ITO} ILO={ILO} />}
      {ExtensionShow && (
        <StoreExtension
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
            Add New IVR
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
                    <label style={{ marginRight: 10 }} htmlFor="IVRName">
                      IVR Name
                    </label>

                    <Controller
                      control={control}
                      name="IVRName"
                      // defaultValue=""

                      render={({ field }) => (
                        <CustomTextField
                          // name="namefield"
                          size="small"
                          id="IVRName"
                          {...field}
                          label="Text field"
                          // inputRef={field.ref}
                          defaultValue={EditedData?.List_Name}
                          error={Error?.List_Name ? true : false}
                          helperText={Error?.List_Name?.toString()}
                        />
                      )}
                    />
                  </div>
                </Grid>

                <Grid item xs={6}>
                  <Box>
                    {/* <FormControl fullWidth> */}

                    <label style={{ marginRight: 15 }} htmlFor="PrimaryField">
                      Sound Files
                    </label>
                    <Select
                      sx={{ width: 250 }}
                      // fullWidth
                      size="small"
                      labelId="PrimaryField"
                      id="PrimaryField"
                      value={EditedData?.List_Length || SoundFile}
                      required
                      // label="Age"
                      onChange={handleChange_SSO}
                    >
                      {/* {console.log('LLLL' , Syst_SO)} */}
                      {Syst_SO?.map((val, key) => (
                        <MenuItem value={val?.client_id}>
                          {val?.file_Name}
                        </MenuItem>
                      ))}
                    </Select>

                    {/* </FormControl> */}
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Box>
                    {/* <FormControl fullWidth> */}

                    <label style={{ marginRight: 15 }} htmlFor="PrimaryField">
                      Invalid Messages
                    </label>
                    <Select
                      sx={{ width: 250 }}
                      // fullWidth
                      size="small"
                      labelId="PrimaryField"
                      id="PrimaryField"
                      value={EditedData?.List_Length || SoundFile}
                      required
                      // label="Age"
                      onChange={handleChange_InvalidMsg}
                    >
                      {Syst_SO?.map((val, key) => (
                        <MenuItem key={key} value={val?.client_id}>
                          {val?.file_Name}
                        </MenuItem>
                      ))}
                    </Select>

                    {/* </FormControl> */}
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Box>
                    {/* <FormControl fullWidth> */}

                    <label style={{ marginRight: 15 }} htmlFor="PrimaryField">
                      TimeOut Messages
                    </label>
                    <Select
                      sx={{ width: 250 }}
                      // fullWidth
                      size="small"
                      labelId="PrimaryField"
                      id="PrimaryField"
                      value={EditedData?.List_Length || SoundFile}
                      required
                      // label="Age"
                      onChange={handleChange_TimeOut}
                    >
                      {Syst_SO?.map((val, key) => (
                        <MenuItem key={key} value={val?.client_id}>
                          {val?.file_Name}
                        </MenuItem>
                      ))}
                    </Select>

                    {/* </FormControl> */}
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Box>
                    {/* <FormControl fullWidth> */}

                    <label style={{ marginRight: 15 }} htmlFor="PrimaryField">
                      Input Length
                    </label>
                    <Select
                      sx={{ width: 250 }}
                      // fullWidth
                      size="small"
                      labelId="PrimaryField"
                      id="PrimaryField"
                      value={EditedData?.List_Length || SoundFile}
                      required
                      // label="Age"
                      onChange={handleChange_InputLength}
                    >
                      {Input_LO &&
                        Object.entries(Input_LO).map((val, key) => (
                          // console.log('dekhh' , val[0] , key)
                          <MenuItem key={key} value={Number(val[0])}>
                            {val[1]}
                          </MenuItem>
                        ))}
                    </Select>

                    {/* </FormControl> */}
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Box>
                    {/* <FormControl fullWidth> */}
                    <label style={{ marginRight: 15 }} htmlFor="PrimaryField">
                      Input TimeOut
                    </label>
                    <Select
                      sx={{ width: 250 }}
                      // fullWidth
                      size="small"
                      labelId="PrimaryField"
                      id="PrimaryField"
                      value={EditedData?.List_Length || SoundFile}
                      required
                      // label="Age"
                      onChange={handleChange_InputTimeOut}
                    >
                      {Input_TO &&
                        Object.entries(Input_TO).map((val, key) => (
                          <MenuItem key={key} value={Number(val[0])}>
                            {val[1]}
                          </MenuItem>
                        ))}
                    </Select>

                    {/* </FormControl> */}
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Controller
                    name="auto_attendant"
                    control={control}
                    render={({ field }) => (
                      <CustomCheckBox
                        name="Enable Auto Attendent"
                        onChange={(e) => field.onChange(e.target.checked)}
                        check={field.value}
                        defaultCk={Number(EditedData?.rec_flag) || field.value}
                        // inputRef={field.ref}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <div style={{display:'flex' , justifyContent:'center' , alignItems:'center'}}>

                  <Controller
                    name="useTimeDestination"
                    control={control}
                    render={({ field }) => (
                      <CustomCheckBox
                        name="use Time Destination"
                        onChange={(e) => {field.onChange(e.target.checked)
                        setuseTime(e.target.checked)
                        }}
                        check={field.value}
                        defaultCk={field.value}
                        // inputRef={field.ref}
                      />
                    )}
                  />
{useTime && 
<Button variant="contained"  onClick={()=>dispatch(handleModal(true))} >
  Destination
</Button>
}
</div>


                </Grid>
              </Grid>

              <Typography sx={{ color: "#8dc63f", fontSize: 20 }}>
                Dialing List
              </Typography>
              <Divider sx={{ py: 0.5 }} />

              <Grid container sx={{ py: 1 }} spacing={2}>
                <Grid item xs={12}>
                  <div>
                    <span
                      style={{
                        marginRight: 10,
                        backgroundColor: " ",
                        fontWeight: "",
                        fontSize: "18px",
                      }}
                    >
                      Phone
                    </span>
                    {/* <Controller
                      control={control}
                      name="PrimaryField"
                      render={({ ...field }) => (  */}
                    <MultiPhone
                      parentCallback={handlecallback}
                      size="small"
                      // {...field}
                      label="Primary Number"
                      placeholder="Enter Primary Number"
                      Width="true"
                      arr={NumArr}
                      // inputRef={field.ref}
                    />
                    {/* )} 
                    /> */}
                  </div>
                </Grid>

                {EditedData ? (
                  <>
                    <Grid item xs={10} />

                    <Grid item xs={2}>
                      <Button
                        type="submit"
                        sx={{ mx: 2, backgroundColor: "" }}
                        variant="contained"
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

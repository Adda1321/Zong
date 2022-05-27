import React, { useState } from "react";
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
import StoreExtension from "../../components/ExtensionCall/StoreExtension";
import GetExtension from "../../components/ExtensionCall/GetExtension";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import {Modal_OpenClose} from '../../store/Modal';

import { useDispatch, useSelector } from 'react-redux';

// import { makeStyles } from '@material-ui/core/styles';
import { pink, red } from "@mui/material/colors";

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

export default function ExtForm(props) {
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
    console.log('Arr--' , NumArr)

  const [ExtensionShow, setExtensionShow] = React.useState(false);
  const [Data, setData] = useState({});
  const [CallBack, setCallBack] = useState(false);
  const [SoundFile, setSoundFile] = React.useState(0);
  const [Error, setError] = useState(null);
  const [Success, setSuccess] = useState(null);
  const [List, setList] = useState("");
  const accent = pink.A200;
  const dispatch = useDispatch();
  // const [errors, setErrors] = useState(null)

  // const classes = useStyles()
  console.log("FIELD--> ", CallBack);

  const handleChange = (event) => {
    // console.log('SELECT' , event.target)
    setSoundFile(event.target.value);
  };

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
  const onSubmit = ({
    ExtField,
    NameField,
    incRec,
    CallbackDetect,
    outRec,
    outCall,
    PtoExt,
    PrimaryField,
  }) => {
    // debugger
    setExtensionShow(true);
    var bodyFormData = new FormData();
    bodyFormData.append("List_Name", NameField);
    bodyFormData.append("ext_code", ExtField);
    bodyFormData.append("Num_1", PrimaryField);
    bodyFormData.append("outgoingcall", outCall ? 1 : 0);
    bodyFormData.append("callbackdetection", CallbackDetect ? 1 : 0);
    bodyFormData.append("incomingrecording", incRec ? 1 : 0);
    bodyFormData.append("outgoingrecording", outRec ? 1 : 0);
    bodyFormData.append("sound", SoundFile);
    bodyFormData.append("credit_limit", 10);
    bodyFormData.append("Num_2", List[0]?.phone || 0);
    bodyFormData.append("Num_3", List[1]?.phone || 0);
    bodyFormData.append("Num_4", List[2]?.phone || 0);
    bodyFormData.append("Num_5", List[3]?.phone || 0);
    bodyFormData.append("onnet_minutes", 10);
    bodyFormData.append("offet_minutes", 10);

    setData(bodyFormData);
  };
  const succesHandle = (CD) => {
    console.log("test", CD);
    setSuccess(CD);

    // setSuccess(CD)
  };
  // console.log("SHOW", Error);

  return (
    <div>
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
            Add New Extension
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
                Extension
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
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <label style={{ marginRight: 10 }} htmlFor="">
                      Extension
                    </label>

                    <Controller
                      control={control}
                      name="ExtField"
                      render={({ field }) => (
                        <CustomTextField
                          size="small"
                          name="ExtensionFiled"
                          {...field}
                          label="Extension field"
                          inputRef={field.ref}
                          defaultValue={EditedData?.ext_code}
                          error={Error?.ext_code ? true : false}
                          helperText={Error?.ext_code?.toString()}
                        />
                      )}
                    />
                  </div>
                </Grid>

                <Grid item xs={6}>
                  <Controller
                    name="incRec"
                    control={control}
                    render={({ field }) => (
                      <CustomCheckBox
                        name="Incomming Recording"
                        onChange={(e) => field.onChange(e.target.checked)}
                        check={field.value}
                        defaultCk={Number(EditedData?.rec_flag) || field.value}
                        // inputRef={field.ref}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={4}>
                  <Controller
                    name="outRec"
                    control={control}
                    render={({ field }) => (
                      <CustomCheckBox
                        name="OutGoing Recording"
                        onChange={(e) => field.onChange(e.target.checked)}
                        check={field.value}
                        defaultCk={
                          Number(EditedData?.outgoing_recording) || field.value
                        }

                        // inputRef={field.ref}
                      />
                    )}
                  />
                </Grid>
              </Grid>

              <Typography sx={{ color: "#8dc63f", fontSize: 20 }}>
                Dialing List
              </Typography>
              <Divider sx={{ py: 0.5 }} />

              <Grid container sx={{ py: 1 }} spacing={2}>
                <Grid item xs={4}>
                  {/* {console.log('sHOWWW', CallBack)} */}
                  <Controller
                    name="outCall"
                    control={control}
                    render={({ field }) => (
                      <CustomCheckBox
                        name="OutGoing Calls"
                        onChange={(e) => {
                          field.onChange(e.target.checked);
                          console.log("tttt", field.value);
                        }}
                        check={
                          CallBack || Number(EditedData?.cb_detection)
                            ? true
                            : field.value === undefined || field.value === false
                            ? 0
                            : 1
                        }
                        // check={undefined}
                        defaultCk={Number(EditedData?.cb_detection)}
                        // inputRef={field.ref}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={4}>
                  <Controller
                    name="PtoExt"
                    control={control}
                    render={({ field }) => (
                      <CustomCheckBox
                        name="portal.Ext to Ext Calls"
                        onChange={(e) => field.onChange(e.target.checked)}
                        defaultCk={EditedData?.exten_call || field.value}
                        check={field.value}
                        inputRef={field.ref}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={4}>
                  <Controller
                    name="CallbackDetect"
                    control={control}
                    render={({ field }) => (
                      <CustomCheckBox
                        name=" Call Back  detection"
                        onChange={(e) => {
                          field.onChange(e.target.checked);
                          console.log("SHOWW", e.target.checked);
                          setCallBack(e.target.checked);
                          console.log(
                            "ttt",
                            typeof Number(EditedData?.cb_detection),
                            "field val ",
                            field
                          );
                        }}
                        check={
                          Number(EditedData?.cb_detection)
                            ? Number(EditedData?.cb_detection)
                            : field.value
                        }
                        defaultCk={
                          Number(EditedData?.cb_detection)
                            ? Number(EditedData?.cb_detection)
                            : field.value
                        }
                        // inputRef={field.ref}
                      />
                    )}
                  />
                </Grid>

                {CallBack || Number(EditedData?.cb_detection) ? (
                  <Grid item xs={4}>
                    <Box>
                      <FormControl fullWidth>
                        {/* <InputLabel id="demo-simple-select-label">
                          Sound Files
                        </InputLabel> */}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                          }}
                        >
                          <label
                            // sx={{ marginRight: 120 }}
                            htmlFor="PrimaryField"
                          >
                            Sound Files
                          </label>
                          <Select
                            // sx={{marginLeft: 20}}
                            fullWidth
                            size="small"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={EditedData?.List_Length || SoundFile}
                            required
                            // label="Age"
                            onChange={handleChange}
                          >
                            {/* <MenuItem value={0}>-</MenuItem> */}
                            <MenuItem value={1}>callback</MenuItem>
                            <MenuItem value={2}>callbackTesting</MenuItem>
                            <MenuItem value={3}>call back</MenuItem>
                          </Select>
                        </div>
                      </FormControl>
                    </Box>
                  </Grid>
                ) : (
                  ""
                )}

                <Grid item xs={12}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <label style={{ marginRight: 10 }} htmlFor="PrimaryField">
                      Primary Number
                    </label>

                    <Controller
                      control={control}
                      name="PrimaryField"
                      render={({ field }) => (
                        <CustomTextField
                          size="small"
                          {...field}
                          label="Primary Number"
                          placeholder="Enter Primary Number"
                          Width="true"
                          inputRef={field.ref}
                          defaultValue={EditedData?.Num_1}
                          error={Error?.Num_1 ? true : false}
                          helperText={Error?.Num_1?.toString()}
                        />
                      )}
                    />
                  </div>
                </Grid>
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

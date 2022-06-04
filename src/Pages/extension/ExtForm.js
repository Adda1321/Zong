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

import { useDispatch, useSelector } from "react-redux";

// import { makeStyles } from '@material-ui/core/styles';
import { pink, red } from "@mui/material/colors";
import UpdateExtension from "../../APICalls/ExtensionCall/UpdateExtension";

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
 
  if (EditedData?.Num_2) {
    NumArr[0] = Number(EditedData?.Num_2);
    NumArr[1] = Number(EditedData?.Num_3);
    NumArr[2] = Number(EditedData?.Num_4);
    NumArr[3] = Number(EditedData?.Num_5);
  }
  // console.log("Arr--", NumArr);

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
  const [inPutFieldCount, setinPutFieldCount] = useState(0);
  // const [errors, setErrors] = useState(null)

  const { handleSubmit, control, register } = useForm({
    defaultValues: {
      NameField: EditedData ? EditedData?.List_Name : "",
      ExtField: EditedData ? EditedData?.ext_code : "",
      incRec: EditedData ? Boolean(Number(EditedData?.rec_flag)) : false,
      outRec: EditedData
        ? Boolean(Number(EditedData?.outgoing_recording))
        : false,
      outCall: EditedData ? Boolean(Number(EditedData?.cb_detection)) : false,
      PtoExt: EditData ? Boolean(EditedData?.exten_call) : false,
      CallbackDetect: EditedData
        ? Boolean(Number(EditedData?.cb_detection))
        : false,
      PrimaryField: EditedData ? EditedData?.Num_1 : "",
      PhoneMulti: EditedData
        ? [
            { value: EditedData?.Num_2 },
            { value: EditedData?.Num_3 },
            { value: EditedData?.Num_4 },
            { value: EditedData?.Num_5 },
          ]
        : "",
        SoundFile: EditedData?.List_Length || 1
    },
  });
  console.log("PRimary Daata",  EditData);
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "PhoneMulti", // unique name for your Field Array
    }
  ); 
  useEffect(
    () =>
      !EditData
        ? (append({}), setinPutFieldCount((prevcount) => prevcount + 1))
        : setinPutFieldCount(
            (prevcount) =>
              prevcount + Number(fields.filter((x) => x.value !== null).length)
          ),
    []
  );

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
  console.log("Phone-", List[0]?.phone);
  const onSubmit = ({
    ExtField,
    NameField,
    incRec,
    CallbackDetect,
    outRec,
    outCall,
    SoundFile,
    PtoExt,
    PrimaryField,
    PhoneMulti,
  }) => {
    // debugger
    console.log("PRimary Daata", EditedData?.List_Length);
    setExtensionShow(true);
    var bodyFormData = new FormData();
    bodyFormData.append("List_Name", NameField);
    bodyFormData.append("ext_code", ExtField);
    bodyFormData.append("Num_1", PrimaryField);
    bodyFormData.append("outgoingcall", outCall ? 1 : 0);
    bodyFormData.append("callbackdetection", CallbackDetect ? 1 : 0);
    bodyFormData.append("incomingrecording", incRec ? 1 : 0);
    bodyFormData.append("outgoingrecording", outRec ? 1 : 0);
    bodyFormData.append("sound",SoundFile);
    bodyFormData.append("credit_limit", 10);
    bodyFormData.append("Num_2", PhoneMulti[0]?.value || 0);
    bodyFormData.append("Num_3", PhoneMulti[1]?.value || 0);
    bodyFormData.append("Num_4", PhoneMulti[2]?.value || 0);
    bodyFormData.append("Num_5", PhoneMulti[3]?.value || 0);
    bodyFormData.append("onnet_minutes", 10);
    bodyFormData.append("offet_minutes", 10);
    {
      props.update_id && bodyFormData.append("id", props.update_id);
    }

    setData(bodyFormData);
  };
  const succesHandle = (CD) => {
    setSuccess(CD);
  };
  // console.log("SHOW", Error);

  return (
    <div>
      {ExtensionShow & !update && (
        <StoreExtension
          body={Data}
          Success={succesHandle}
          Error={(err) => {
            setError(err);
          }}
        />
      )}

      {update && (
        <UpdateExtension
          body={Data}
          Success={succesHandle}
          Error={(err) => {
            setError(err);
          }}
        />
        // setUpdate(false)
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
                          inputRef={field.ref}
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
                    // defaultValue={Number(EditedData?.rec_flag)}
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
                    // defaultValue={Number(EditedData?.outgoing_recording)}
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
                  <Controller
                    name="outCall"
                    control={control}
                    // defaultValue={Number(EditedData?.cb_detection)}
                    render={({ field }) => (
                      <CustomCheckBox
                        name="OutGoing Calls"
                        onChange={(e) => {
                          field.onChange(e.target.checked);

                          // console.log("tttt", field.value);
                        }}
                        check={
                          CallBack || Boolean(Number(EditedData?.cb_detection))
                            ? true
                            : field.value === undefined || field.value === false
                            ? false
                            : true
                        }
                        // check={field.value}
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
                    // defaultValue={EditedData?.exten_call}
                    render={({ field }) => (
                      <CustomCheckBox
                        name="portal.Ext to Ext Calls"
                        onChange={(e) => field.onChange(e.target.checked)}
                        defaultCk={
                          Boolean(EditedData?.exten_call) || field.value
                        }
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
                    // defaultValue={Number(EditedData?.cb_detection)}
                    render={({ field }) => (
                      <CustomCheckBox
                        name=" Call Back  detection"
                        onChange={(e) => {
                          field.onChange(e.target.checked);
                          // console.log("SHOWW", e.target.checked);
                          setCallBack(e.target.checked);
                          // console.log(
                          //   "ttt",
                          //   typeof Number(EditedData?.cb_detection),
                          //   "field val ",
                          //   field
                          // );
                        }}
                        check={
                          Boolean(Number(EditedData?.cb_detection)) ||
                          field.value
                        }
                        // defaultCk={
                        //   Number(EditedData?.cb_detection)
                        //     ? Number(EditedData?.cb_detection)
                        //     : field.value
                        // }
                        // inputRef={field.ref}
                      />
                    )}
                  />
                </Grid>

                {CallBack || Number(EditedData?.cb_detection) ? (
                  <Grid item xs={4}>
                    <Box>
                      {/* <FormControl fullWidth> */}
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
                        <Controller
                          name="SoundFile"
                          control={control}
                          // defaultValue={Number(EditedData?.rec_flag)}
                          render={({ field }) => (
                            <Select
                              
                              fullWidth
                              size="small"
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              required
                              value={field.value}
                              // label="Age"

                              defaultValue=""
                              onChange={(e) => field.onChange(e.target.checked)}
                            >
                              <MenuItem value={0}>-</MenuItem>
                              <MenuItem value={1}>callback</MenuItem>
                              <MenuItem value={2}>callbackTesting</MenuItem>
                              <MenuItem value={3}>call back</MenuItem>
                            </Select>
                          )}
                        />
                      </div>
                      {/* </FormControl> */}
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
                      // defaultValue={EditedData?.Num_1}
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
                      name="MultiPhone"
                      render={({ ...field }) => (  */}
                    {fields.map(({ id, name, type, amount }, index) => {
                      return (
                        <div key={id}>
                          {fields[index].value !== null && (
                            <>
                              {console.log("WHAT FIELD", fields[index].value)}
                              <TextField
                                {...register(`PhoneMulti.${index}.value`)}
                                size="small"
                                type="number"
                                style={{ width: "60%", marginBottom: 5 }}
                                placeholder="Phone number"
                                error={Error ? true : false}
                                helperText={
                                  Error?.Num_2 && Error?.Num_2?.toString()
                                }
                              />
                              <Button
                                //   className="btn btn-outline-danger"
                                sx={{ ml: 1.5 }}
                                variant="contained"
                                onClick={() => (
                                  remove(index),
                                  setinPutFieldCount(
                                    (prevcount) => prevcount - 1
                                  )
                                )}
                              >
                                Remove
                              </Button>
                            </>
                          )}
                        </div>
                      );
                    })}

                    {/* <input type="submit" /> */}
                    {inPutFieldCount < 4 &&
                      (console.log("INPUTT", inPutFieldCount),
                      (
                        <Button
                          // className="btn btn-outline-success "
                          sx={{ ml: 1.5 }}
                          variant="contained"
                          onClick={() => (
                            append({}),
                            setinPutFieldCount((prevcount) => prevcount + 1)
                          )}
                        >
                          ADD NEW
                        </Button>
                      ))}

                    {/* )} 
                    />  */}
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

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

export default function IVRForm(props) {
  const Dest_Type = useSelector((state) => state.Dest.Destination_type);
  const Dest_ID = useSelector((state) => state.Dest.Destination_id);
  const DestinationSelected = useSelector(
    (state) => state.Dest.selectDestination
  );
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
  const [inPutFieldCount, setinPutFieldCount] = useState(0);
  const [Error, setError] = useState(null);
  const [Success, setSuccess] = useState(null);
  const [List, setList] = useState("");
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
      IVRName: "",
      auto_attendant: false,
      useTimeDestination: false,
      SoundFile: "",
      InvalidMsg: "",
      InputLength: "",
      TimeoutMsg: "",
      InputTimeout: "",
      Options: [
        {
          Opt_key: "",
          OptionName: "",
          // Dest:{
          destID: "",
          destType: "",
          // }
        },
      ],
    },
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "Options",
    }
  );

  // useEffect(
  //   () =>
  // (append({Key:'' , OptionName:''}), setinPutFieldCount((prevcount) => prevcount + 1)),
  // !EditData
  //   ? (append({Key:'' , OptionName:''}), setinPutFieldCount((prevcount) => prevcount + 1))
  //   : setinPutFieldCount(
  //       (prevcount) =>
  //         prevcount + Number(fields.filter((x) => x.value !== null).length)
  //     ),
  //   []
  // );

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

  const handlecallback = (ChildData) => {
    setList(ChildData);
  };

  const onSubmit = ({
    IVRName,
    useTimeDestination,
    auto_attendant,
    InvalidMsg,
    InputLength,
    InputTimeout,
    TimeoutMsg,
    SoundFile,
    Options,
  }) => {
    // setExtensionShow(true);
    var bodyFormData = new FormData();
    // bodyFormData.append("IVRName", IVRName);
    // bodyFormData.append("auto_attendant", auto_attendant);
    // bodyFormData.append("useTimeDestination", useTimeDestination);
    // bodyFormData.append("IVR_Sound_ID", SoundFile);
    // bodyFormData.append("Invalid_Sound_ID", InvalidMsg);
    // bodyFormData.append("TimeoutMsg", TimeoutMsg);
    // bodyFormData.append("InputLength", InputLength);
    // bodyFormData.append("InputTimeout", InputTimeout);
    // bodyFormData.append("credit_limit", 10);
    // bodyFormData.append("time_destination_type", Dest_Type);
    // bodyFormData.append("time_destination_id", Dest_ID);

    // Options.map(
    //   (val, index) => (
    //     bodyFormData.append(`ivr_key_${index}`, val.Opt_key),
    //     bodyFormData.append(`ivr_option_name_${index}`, val.OptionName),
    //     bodyFormData.append(`ivr_option_destination_${index}_type`),
    //     bodyFormData.append(`ivr_option_destination_${index}_id`)
    //   )
    // );
    // bodyFormData.append("onnet_minutes", 10);
    // bodyFormData.append("offet_minutes", 10);
    reset({
      Options: [
        {
          Opt_key: "",
          OptionName: "",
          // Dest: {
          destID: "",
          destType: "",
          // },
        },
      ],
    });
    console.log("DEKHO", Options);
    console.log("TYPE-- ", Dest_Type);
    console.log("ID-- ", Dest_ID);

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

  return (
    <div>
      {openForm && <CreateIVR SSO={SSO} ITO={ITO} ILO={ILO} />}
      {/* {ExtensionShow && (
        <StoreExtension
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
                  <Box>
                    <label style={{ marginRight: 15 }} htmlFor="SoundFile">
                      Sound Files
                    </label>
                    <Controller
                      name="SoundFile"
                      control={control}
                      render={({ field }) => (
                        <Select
                          sx={{ width: 250 }}
                          // fullWidth
                          size="small"
                          labelId="SoundFile"
                          value={field.value}
                          // defaultValue=""
                          onChange={(e) => field.onChange(e.target.value)}
                        >
                          {Syst_SO?.map((val, key) => (
                            <MenuItem value={val?.client_id}>
                              {/* {console.log('SHOW-' , val?.client_id)} */}
                              {val?.file_Name}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Box>
                    <label style={{ marginRight: 15 }} htmlFor="InvalidMsg">
                      Invalid Messages
                    </label>
                    <Controller
                      name="InvalidMsg"
                      control={control}
                      render={({ field }) => (
                        <Select
                          sx={{ width: 250 }}
                          // fullWidth
                          size="small"
                          labelId="InvalidMsg"
                          value={field.value}
                          defaultValue=""
                          onChange={(e) => field.onChange(e.target.value)}
                        >
                          {Syst_SO?.map((val, key) => (
                            <MenuItem key={key} value={val?.client_id}>
                              {val?.file_Name}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Box>
                    <label style={{ marginRight: 15 }} htmlFor="TimeoutMsg">
                      TimeOut Messages
                    </label>
                    <Controller
                      name="TimeoutMsg"
                      control={control}
                      render={({ field }) => (
                        <Select
                          sx={{ width: 250 }}
                          // fullWidth
                          size="small"
                          labelId="TimeoutMsg"
                          // required
                          value={field.value}
                          defaultValue=""
                          onChange={(e) => field.onChange(e.target.value)}
                        >
                          {Syst_SO?.map((val, key) => (
                            <MenuItem key={key} value={val?.client_id}>
                              {val?.file_Name}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Box>
                    <label style={{ marginRight: 15 }} htmlFor="InputLength">
                      Input Length
                    </label>
                    <Controller
                      name="InputLength"
                      control={control}
                      render={({ field }) => (
                        <Select
                          sx={{ width: 250 }}
                          // fullWidth
                          size="small"
                          labelId="InputLength"
                          // required
                          value={field.value}
                          defaultValue=""
                          onChange={(e) => field.onChange(e.target.value)}
                        >
                          {Input_LO &&
                            Object.entries(Input_LO).map((val, key) => (
                              // console.log('dekhh' , val[0] , key)
                              <MenuItem key={key} value={Number(val[0])}>
                                {val[1]}
                              </MenuItem>
                            ))}
                        </Select>
                      )}
                    />
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Box>
                    <label style={{ marginRight: 15 }} htmlFor="Timeout">
                      Input TimeOut
                    </label>
                    <Controller
                      name="InputTimeout"
                      control={control}
                      render={({ field }) => (
                        <Select
                          sx={{ width: 250 }}
                          // fullWidth
                          size="small"
                          labelId="Timeout"
                          // required
                          value={field.value}
                          defaultValue=""
                          onChange={(e) => field.onChange(e.target.value)}
                        >
                          {Input_TO &&
                            Object.entries(Input_TO).map((val, key) => (
                              <MenuItem key={key} value={Number(val[0])}>
                                {val[1]}
                              </MenuItem>
                            ))}
                        </Select>
                      )}
                    />
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
                        // defaultCk={Number(EditedData?.rec_flag) || field.value}
                        // inputRef={field.ref}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Controller
                      name="useTimeDestination"
                      control={control}
                      render={({ field }) => (
                        <CustomCheckBox
                          name="use Time Destination"
                          onChange={(e) => {
                            field.onChange(e.target.checked);
                            setuseTime(e.target.checked);
                          }}
                          check={field.value}
                          // defaultCk={field.value}
                          // inputRef={field.ref}
                        />
                      )}
                    />
                    {useTime && (
                      <Button
                        variant="contained"
                        onClick={() => dispatch(handleModal(true))}
                      >
                        Destination
                      </Button>
                    )}
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
                    {fields.map((item, index) => {
                      return (
                        <div key={item.id}>
                          {fields[index].value !== null && (
                            <>
                              {/* {console.log("WHAT FIELD", fields[index].value)} */}
                              {/* {alert('IN')} */}
                              <TextField
                                {...register(`Options.${index}.Opt_key`)}
                                size="small"
                                type="number"
                                style={{
                                  width: "10%",
                                  marginBottom: 5,
                                  marginRight: 10,
                                }}
                                placeholder="Key"
                                error={Error ? true : false}
                                helperText={
                                  Error?.Num_2 && Error?.Num_2?.toString()
                                }
                              />

                              <TextField
                                {...register(`Options.${index}.OptionName`)}
                                size="small"
                                type="text"
                                // required
                                style={{
                                  width: "40%",
                                  marginBottom: 5,
                                  marginRight: 12,
                                }}
                                placeholder="Option Name"
                              />
                              <Button
                                variant="contained"
                                onClick={() => {
                                  dispatch(handleModal(true));
                                  // dispatch(selectDestination(false));
                                  dispatch(addDestinationType(false));
                                  dispatch(addDestinationID(false));
                                }}
                              >
                                Destination
                              </Button>
                              {Dest_ID &&
                                // setValue(`Options.${index}.destID`, Dest_ID)
                                console.log("Destination- ID", index)}
                              {Dest_Type &&
                                // setValue(
                                //   `Options.${index}.destType`,
                                //   Dest_Type
                                // )
                                console.log("Destination- Type", index)}
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

                    {inPutFieldCount < 4 &&
                      (console.log("INPUTT", inPutFieldCount),
                      (
                        <Button
                          // className="btn btn-outline-success "
                          sx={{ ml: 1.5 }}
                          variant="contained"
                          onClick={() => (
                            append({
                              Opt_key: "",
                              OptionName: "",
                              destID: "",
                              destType: "",
                            }),
                            setinPutFieldCount((prevcount) => prevcount + 1)
                          )}
                        >
                          ADD NEW
                        </Button>
                      ))}
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

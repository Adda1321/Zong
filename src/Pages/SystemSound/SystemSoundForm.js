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

import LinearProgress from '@mui/material/LinearProgress';
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
import CreateSystemSound from "../../APICalls/SystemSoundCall/CreateSystemSound";
import StoreSystemSound from "../../APICalls/SystemSoundCall/StoreSystemSound";

var a;
export default function SystemSoundForm(props) {
  const Dest_Type = useSelector((state) => state.Dest.Destination_type);

  const { EditData, parentModal } = props;
  const EditedData = EditData?.dial_list;

  const [ExtensionShow, setExtensionShow] = React.useState(false);
  const [Data, setData] = useState({});
  const [useTime, setuseTime] = useState(false);

  const [selectMOH, setSelectMOH] = React.useState(false); // To check if MOH is selected
  const [InputTimeout, setInputTimeout] = React.useState(0); //InputTimeout Select

  const [Error, setError] = useState(null);
  const [Success, setSuccess] = useState(null);
  const [CreateData, setCreateData] = useState([]); //For Ring Plan
  const [MOH, setMOH] = useState([]); //For MOH
  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [OpenDest, setOpenDest] = useState(false);

  //STATES to store related data of API RESPONSE
  const [Syst_SO, setSSO] = useState(null);
  const [Input_TO, setITO] = useState(null);
  const [Input_LO, setILO] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const accent = pink.A200;

  const [buttonName, setButtonName] = useState("Play");

  const [audio, setAudio] = useState();
  const [audioName, setAudioName] = useState(); // To send to axios

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
      SystSoundName: "",
      description: "",
      Category: "",
      MOHClass: "",
      SoundFile: "",
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
    if (a) {
      a.pause();
      a = null;
      setButtonName("Play");
    }
    if (audio) {
      a = new Audio(audio);
      a.onended = () => {
        setButtonName("Play");
      };
    }
  }, [audio]);

  const handleClick = () => {
    if (buttonName === "Play") {
      a.play();
      setButtonName("Pause");
    } else {
      a.pause();
      setButtonName("Play");
    }
  };
  const addFile = (e) => {
    if (e.target.files[0]) {
      setAudio(URL.createObjectURL(e.target.files[0]));
      setAudioName(e.target.files[0]);
    }
  };

  const RemoveFile = () => {
    console.log("AUDIO ", audio);
    setAudio("");
    setButtonName("play");
  };
  useEffect(() => {
    setOpenForm(true);
  }, []);

  const header = {
    bgcolor: "#8dc63f",
    pl: 2,
    py: 0.51,
  };

  const onSubmit = ({
    SystSoundName,
    Category,
    description,
    MOHClass,
    // SoundFile,
  }) => {
    setExtensionShow(true);
    var bodyFormData = new FormData();

    bodyFormData.append("name", SystSoundName);
    bodyFormData.append("category_id", Category);
    bodyFormData.append("detail", description);
    bodyFormData.append("musiconhold_id", MOHClass || 0);
    bodyFormData.append("sound_file", audioName);
    setData(bodyFormData);
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
      {loading &&  (
        <Box sx={{ width: '100%' }}>
        <LinearProgress color="success" />
      </Box>
      )}
      {openForm && (
        <CreateSystemSound DataToShow={handleDataGet} DataMOH={handleMOH} />
      )}

      {ExtensionShow && (
        <StoreSystemSound
          body={Data}
          Success={succesHandle}
          Error={(err) => {
            setError(err);
          }}
          isLoading={(loading) => setLoading(loading)}
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
            Upload system Sound
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
                    <label style={{ marginRight: 10 }} htmlFor="SystSoundName">
                      Name
                    </label>

                    <Controller
                      control={control}
                      name="SystSoundName"
                      // defaultValue=""

                      render={({ field }) => (
                        <CustomTextField
                          // name="namefield"
                          size="small"
                          id="SystSoundName"
                          {...field}
                          label="Text field"
                          inputRef={field.ref}
                          //   defaultValue={EditedData?.List_Name}
                          error={Error?.name ? true : false}
                          helperText={Error?.name?.toString()}
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
                    <label style={{ marginRight: 10 }} htmlFor="description">
                      Description
                    </label>

                    <Controller
                      control={control}
                      name="description"
                      // defaultValue=""

                      render={({ field }) => (
                        <CustomTextField
                          // name="namefield"
                          size="small"
                          id="description"
                          {...field}
                          label="Description"
                          inputRef={field.ref}
                          //   defaultValue={EditedData?.List_Name}
                          error={Error?.detail ? true : false}
                          helperText={Error?.detail?.toString()}
                        />
                      )}
                    />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <Box>
                    <label style={{ marginRight: 15 }} htmlFor="Category">
                      Category
                    </label>
                    <Controller
                      name="Category"
                      control={control}
                      render={({ field }) => (
                        <Select
                          sx={{ width: 250 }}
                          // fullWidth
                          size="small"
                          labelId="Category"
                          //   label="Category"
                          value={field.value}
                          // defaultValue=""
                          required
                          onChange={(e) => field.onChange(e.target.value)}
                          //   error={Error?.category_id ? true : false}
                          //   helperText={Error?.category_id?.toString()}
                        >
                          {field.value === 4
                            ? setSelectMOH(true)
                            : setSelectMOH(false)}
                          {CreateData?.map((val, key) => (
                            <MenuItem value={val.id}>{val.title}</MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                  </Box>
                </Grid>
                {selectMOH && (
                  <Grid item xs={6}>
                    <Box>
                      <label style={{ marginRight: 15 }} htmlFor="MOHClass">
                        MOH Class
                      </label>
                      <Controller
                        name="MOHClass"
                        control={control}
                        render={({ field }) => (
                          <Select
                            sx={{ width: 250 }}
                            required
                            size="small"
                            labelId="MOHClass"
                            value={field.value}
                            defaultValue=""
                            onChange={(e) => field.onChange(e.target.value)}
                          >
                            {MOH?.map((val, key) => (
                              <MenuItem key={key} value={val?.id}>
                                {val?.name}
                                {console.log("DEKHONA", val)}
                                {/* // has to check from the PostMAN about val.name adn val.id */}
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      />
                    </Box>
                  </Grid>
                )}
              </Grid>

              <Typography sx={{ color: "#8dc63f", fontSize: 20 }}>
                Add sound File
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
                    <label htmlFor="btn-upload">Sound File</label>
                    <input type="file" accept=".wav,.gsm" onChange={addFile} />
                    <Button onClick={handleClick}>{buttonName}</Button>
                    <Button variant="contained" onClick={RemoveFile}>
                      Remove
                    </Button>
                  </div>
                  <div style={{ paddingLeft: 10, color: "red" }}>
                    {Error?.sound_file || ""}
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

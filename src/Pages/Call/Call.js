import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Divider, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import "../../App.css";


import {
    handleModal,
    selectDestination,
    addDestinationID,
    addDestinationType,
  } from "../../store/Module";
import GetSystemSound from "../../APICalls/SystemSoundCall/GetSystemSound";
import GetVoiceMail from "../../APICalls/VoiceMailCall/GetVoiceMail";
import StoreVoiceMail from "../../APICalls/VoiceMailCall/StoreVoiceMail";
import { useDispatch , useSelector } from "react-redux";
import Destination from "../../Destination";
import GetCallSetting from "../../APICalls/CallSettingsCall/GetCallSetting";
import StoreCallSetting from "../../APICalls/CallSettingsCall/StoreCallSetting";

function Call() {
  const [Data, setData] = useState({});
  const [ExtensionShow, setExtensionShow] = React.useState(false);
  const [CreateData, setCreateData] = useState(null); //For showing the Selected options of user
  const [selectionList, setSelectionList] = useState([]); // For showing all the options that a user can have
  const [Error, setError] = useState(null);
  const [Success, setSuccess] = useState(null);

const dispatch= useDispatch();
  const Dest_Type = useSelector((state) => state.Dest.Destination_type);
  const Dest_ID = useSelector((state) => state.Dest.Destination_id);
  const PreloadedValues = {
    Destination: Number(CreateData?.destination_sound?.id),
    MsgOption_SoundFile: CreateData?.msg_option_sound?.id || 0,
    Invalid_Opt: CreateData?.invalid_sound?.id || 0,
    Opt_timeout_msg: CreateData?.timeout_sound?.id || 0,
  };
  useEffect(() => {
    reset({ ...PreloadedValues });
  }, [CreateData?.destination_sound?.id]);

  const {
    handleSubmit,
    control,
    register,
    reset,
    setValue,

    formState: { errors },
  } = useForm({
    defaultValues: PreloadedValues,
  });

  const onSubmit = () => {
    //   setError(false)
    //   setSuccess(false)
    setExtensionShow(true);
    var bodyFormData = new FormData();

    bodyFormData.append("call_entry_app_type", Dest_Type);
    bodyFormData.append("call_entry_app_id", Dest_ID);
    bodyFormData.append("did_number", Number('03244028187'));
    
    setData(bodyFormData);
  };
  // console.log("DEKHO", CreateData?.record_message);
  const ErrorHandling = (ChildData) => {
    setError(ChildData);
  };
  const handleCallback = (CD) => {
    setCreateData(CD);
    dispatch(addDestinationID(CD.entry_app_id))
    dispatch(addDestinationType(CD.entry_app_type))
  };
  const handleSelectionData = (CD) => {
    setSelectionList(CD);
  };
  const succesHandle = (CD) => {
    setSuccess(CD);
  };

  return (
    <div>
      {ExtensionShow && (
        <StoreCallSetting
          body={Data}
          Success={succesHandle}
          Error={(err) => {
            setError(err);
          }}
          // isLoading={(loading) => setLoading(loading)}
        />
      )}

<GetCallSetting
        parentCallback={handleCallback}
        
        // ErrorCallback={ErrorHandling}
      />

      <Typography
        variant="h5"
        // component="div"
        sx={{ ml: 3, mt: 2, color: "#4a4a4a", fontWeight: 500 }}
      >
        Call Settings
      </Typography>
      <Divider />
      {Success && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success">{Success.message}</Alert>
        </Stack>
      )}
{Error && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">{Error}</Alert>
        </Stack>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography sx={{ color: "#8dc63f", fontSize: 20 }}>
          Incomming Call setting
        </Typography>
        <Divider sx={{ py: 0.5 }} />
        <Grid container sx={{ px: 10, py: 5 }} spacing={2}>
        <Grid item xs={10}>
        Master: 03155085530
          </Grid>
          
        </Grid>
        <Typography sx={{ color: "#8dc63f", fontSize: 20 }}>
          Set Destination
        </Typography>
        <Divider sx={{ py: 0.5 }} />
        <Grid container sx={{ px: 10, py: 5 }} spacing={2}>
          <Grid item xs={8}>
              <span style={{marginRight:8}}>

              Destination*
              </span>
            <Button
              variant="contained"
              onClick={() => dispatch(handleModal(true))}
            >
              Destination
            </Button>
          </Grid>

         
          
          <Grid item xs={2}>
            <Button type="submit" variant="contained">
              SUBMIT
            </Button>
          </Grid>
        </Grid>
      </form>
      <Destination/>
    </div>
  );
}

export default Call;

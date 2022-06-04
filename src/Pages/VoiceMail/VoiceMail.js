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

import { addModule } from "../../store/Module";
import GetSystemSound from "../../APICalls/SystemSoundCall/GetSystemSound";
import GetVoiceMail from "../../APICalls/VoiceMailCall/GetVoiceMail";
import StoreVoiceMail from "../../APICalls/VoiceMailCall/StoreVoiceMail";

function VoiceMail() {
  const [Data, setData] = useState({});
  const [ExtensionShow, setExtensionShow] = React.useState(false);
  const [CreateData, setCreateData] = useState(null); //For showing the Selected options of user
  const [selectionList, setSelectionList] = useState([]); // For showing all the options that a user can have
  const [Error, setError] = useState(null);
  const [Success, setSuccess] = useState(null);

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

  const onSubmit = ({
    Destination,
    MsgOption_SoundFile,
    Invalid_Opt,
    Opt_timeout_msg,
  }) => {
    setExtensionShow(true);
    var bodyFormData = new FormData();

    bodyFormData.append("destination_sound_id", Destination);
    bodyFormData.append("msg_opt_sound_id", MsgOption_SoundFile);
    bodyFormData.append("invalid_sound_id", Invalid_Opt);
    bodyFormData.append("timeout_sound_id", Opt_timeout_msg);
    setData(bodyFormData);
  };
  // console.log("DEKHO", CreateData?.record_message);
  const ErrorHandling = (ChildData) => {
    setError(ChildData);
  };
  const handleCallback = (CD) => {
    setCreateData(CD);
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
        <StoreVoiceMail
          body={Data}
          Success={succesHandle}
          Error={(err) => {
            setError(err);
          }}
          // isLoading={(loading) => setLoading(loading)}
        />
      )}

      <GetVoiceMail
        parentCallback={handleCallback}
        SelectionList={handleSelectionData}
        ErrorCallback={ErrorHandling}
      />

      <Typography
        variant="h5"
        // component="div"
        sx={{ ml: 3, mt: 2, color: "#4a4a4a", fontWeight: 500 }}
      >
        Voice Mail Settings
      </Typography>
      <Divider />
      {Success && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success">{Success.message}</Alert>
        </Stack>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container sx={{ px: 10, py: 5 }} spacing={2}>
          <Grid item xs={6}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <label style={{ marginRight: 10 }} htmlFor="Destination">
                Destination
              </label>
              <Controller
                name="Destination"
                defaultValue={CreateData?.record_message}
                control={control}
                render={({ field }) => (
                  <Select
                    sx={{ width: 250 }}
                    // fullWidth
                    size="small"
                    labelId="Destination"
                    //   label="Category"
                    value={field.value}
                    // defaultValue=""
                    required
                    onChange={(e) => field.onChange(e.target.value)}

                    //   error={Error?.category_id ? true : false}
                    //   helperText={Error?.category_id?.toString()}
                  >
                    {selectionList?.map((val, key) => (
                      <MenuItem value={val.id}>{val.file_Name}</MenuItem>
                    ))}
                  </Select>
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
              <label style={{ marginRight: 10 }} htmlFor="MsgOption_SoundFile">
                Message Option Sound Files
              </label>
              <Controller
                name="MsgOption_SoundFile"
                control={control}
                render={({ field }) => (
                  <Select
                    sx={{ width: 250 }}
                    // fullWidth
                    size="small"
                    labelId="MsgOption_SoundFile"
                    //   label="Category"
                    value={field.value}
                    // defaultValue=""
                    required
                    onChange={(e) => field.onChange(e.target.value)}
                    // defaultValue={CreateData?.msg_option_sound?.id}
                    //   error={Error?.category_id ? true : false}
                    //   helperText={Error?.category_id?.toString()}
                  >
                    {selectionList?.map((val, key) => (
                      <MenuItem value={val.id}>{val.file_Name}</MenuItem>
                    ))}
                  </Select>
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
              <label style={{ marginRight: 10 }} htmlFor="Opt_timeout_msg">
                Options TimeOut Message
              </label>
              <Controller
                name="Opt_timeout_msg"
                control={control}
                render={({ field }) => (
                  <Select
                    sx={{ width: 250 }}
                    // fullWidth
                    size="small"
                    labelId="Opt_timeout_msg"
                    //   label="Category"
                    value={field.value}
                    // defaultValue={CreateData?.timeout_sound?.id}
                    required
                    onChange={(e) => field.onChange(e.target.value)}
                    //   error={Error?.category_id ? true : false}
                    //   helperText={Error?.category_id?.toString()}
                  >
                    {selectionList?.map((val, key) => (
                      <MenuItem value={val.id}>{val.file_Name}</MenuItem>
                    ))}
                  </Select>
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
              <label style={{ marginRight: 10 }} htmlFor="Invalid_Opt">
                Invalid Option
              </label>
              <Controller
                name="Invalid_Opt"
                control={control}
                render={({ field }) => (
                  <Select
                    sx={{ width: 250 }}
                    // fullWidth
                    size="small"
                    labelId="Invalid_Opt"
                    //   label="Category"
                    value={field.value}
                    // defaultValue={13941}
                    required
                    onChange={(e) => field.onChange(e.target.value)}
                    //   error={Error?.category_id ? true : false}
                    //   helperText={Error?.category_id?.toString()}
                  >
                    {selectionList?.map((val, key) => (
                      <MenuItem value={val.id}>{val.file_Name}</MenuItem>
                    ))}
                  </Select>
                )}
              />
            </div>
          </Grid>
          <Grid item xs={2}>
            <Button type="submit" variant="contained">
              SUBMIT
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default VoiceMail;

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import {
  TextField,
  Checkbox,
  MenuItem,
  Switch,
  RadioGroup,
  FormControlLabel,
  ThemeProvider,
  Radio,
  Slider,
} from "@material-ui/core";
import moment from "moment";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Divider, Tooltip } from "@mui/material";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Select } from "@mui/material";
import FormControl from "@mui/material/FormControl";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import CallIcon from "@mui/icons-material/Call";
import { styled } from "@mui/material/styles";

import CustomTextField from "../components/TextField";
import CustomCheckBox from "../components/CheckBox";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import GetExtension from "../APICalls/ExtensionCall/GetExtension";
import SearchOutGoing from "./ReportsCall/SearchOutGoing";
import { Link } from "react-router-dom";
import Table from "../components/Table";
import CsvComponent from "./CsvComponent";
import GetIVR from "../APICalls/IVRCall/GetIVR";

export default function IncommingCalls() {
  const [Data, setData] = useState({});
  const [ExtensionShow, setExtensionShow] = React.useState(false);
  const [CreateData, setCreateData] = useState(null); //For showing the Selected options of user
  const [selectionList, setSelectionList] = useState([]); // For showing all the options that a user can have
  const [Error, setError] = useState(null);
  const [Success, setSuccess] = useState(null);
  const [extensionData, setextensionData] = useState([]);
  const [IVRData, setIVRData] = useState([]);
  
  const [TableData, setTableData] = useState([]);
  const [flag, setFlag] = useState(false);

  const PreloadedValues = {
    ClientNo: "",
    Extension: "",
    FromDate: new Date("July 21, 2021 01:15:00"),
    MinDuration: 0,
    Filter: "=",
    ToDate: new Date(),
    IvrOption:''
  };
  // useEffect(() => {
  //   reset({ ...PreloadedValues });
  // }, [extensionData[0]?.id]);

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
    ClientNo,
    Extension,
    FromDate,
    MinDuration,
    Filter,
    ToDate,
    IvrOption,
  }) => {
    setExtensionShow(true);
    var bodyFormData = new FormData();
    // console.log("show ClientNo", ClientNo);
    // console.log("show FromDate", FromDate);
    // console.log("show Extension", Extension);
    // console.log("show MinDuration", MinDuration);
    // console.log("show Filter", Filter);
    // console.log("show ToDate", ToDate);

    bodyFormData.append("customer_number", ClientNo);
    bodyFormData.append("from_date", moment(FromDate).format("YYYY-MM-DD"));
    bodyFormData.append("to_date", moment(ToDate).format("YYYY-MM-DD"));
    bodyFormData.append("agent_number", Extension);
    bodyFormData.append("duration_min", MinDuration);
    bodyFormData.append("filter_symbol", Filter);
    bodyFormData.append("ivr_id", IvrOption);
    // console.log('DATE BYDEFAULT: ' , moment(new Date()).format('YYYY-MM-DD'))
    // console.log("DATE BYDEFAULT: ", moment(FromDate).format("YYYY-MM-DD"));
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

  // ------------------- FOR TABLE DATA ------------------
  function createData(first, sec, thir, forth, fifth, six , seven) {
    return { first, sec, thir, forth, fifth, six,seven };
  }
  const header = [ "Client", 'ExtNo' , "Date", "Time", "Duration", "Status" , 'IVR Option'];
  // useEffect(() => {

  // }, [flag]);

  const DataHandle = (childData) => {
    setTableData(
      childData.map(
        (
          user //it returns the array
        ) =>
          createData(
            user.client_id.toString(),
            user.sourceclid || "-",
            user.date,
            user.time,
            user.duration || "-",
            user.recording,
            user.did_num || '-'
          )
      )
    );
  };
  return (
    <div>
      {ExtensionShow && (
        <SearchOutGoing
          body={Data}
          DataToShow={DataHandle}
          Error={(err) => {
            setError(err);
          }}
        />
      )}

<GetExtension
ErrorCallback={() => {}}
parentCallback={(CD) => setextensionData(CD)}
isLoading={() => {}}
/>

      
      <GetIVR
        // ErrorCallback={() => {}}
        parentCallback={(CD) => setIVRData(CD)}
        // isLoading={() => {}}
      />

      <Typography
        variant="h5"
        // component="div"
        sx={{ ml: 3, mt: 2, color: "#4a4a4a", fontWeight: 500 }}
      >
        Incomming Calls
      </Typography>
      <Divider />
      {/* {Success && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success">{Success.message}</Alert>
        </Stack>
      )} */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container sx={{ px: 2, py: 5 }} spacing={1}>
          <Grid item xs={3}>
            <Paper elevation={3} sx={{ height: 450 }}>
              <Stack
                direction="column"
                justifyContent="space-evenly"
                alignItems="flex-start"
                spacing={4}
                sx={{ ml: 4 }}
              >
                <Link
                  to={"/reports/Outgoing"}
                  style={{ color: "green", textDecoration: "none" }}
                >
                  <Button sx={{ mt: 2 }} startIcon={<CallIcon />}>
                    OutGoing Call
                  </Button>
                </Link>
                <Link
                  to={"/reports/Incoming"}
                  style={{ color: "green", textDecoration: "none" }}
                >
                  <Button startIcon={<CallIcon />}>Incoming Call</Button>
                </Link>

                <Link
                  to={"/reports/PortaltoVoiceMail"}
                  style={{ color: "green", textDecoration: "none" }}
                >
                  <Button startIcon={<CallIcon />}>
                    Portal VoiceMail Call
                  </Button>
                </Link>
              </Stack>
            </Paper>
          </Grid>

          <Grid item xs={9}>
            <Paper elevation={3} sx={{ width: "100%", height: 450 }}>
              <Grid container rowSpacing={3}>
                <Grid item xs={5} sx={{ ml: 4, mt: 1.5 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <label style={{ marginRight: 10 }} htmlFor="">
                      Client No
                    </label>

                    <Controller
                      control={control}
                      name="ClientNo"
                      required
                      render={({ field }) => (
                        <CustomTextField
                          size="small"
                          required
                          name="ClientNo"
                          {...field}
                          label="Client Number"
                          inputRef={field.ref}
                          // defaultValue={EditedData?.ext_code}
                          error={Error?.ext_code ? true : false}
                          // helperText={Error?.ext_code?.toString()}
                        />
                      )}
                    />
                  </div>
                </Grid>
              <Grid item xs={4} sx={{ mt: 2 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <label style={{ marginRight: 10 }} htmlFor="Destination">
                      Extension
                    </label>
                    <Controller
                      name="Extension"
                    
                      control={control}
                      // defaultValue={Number(EditedData?.rec_flag)}
                      render={({ field }) => (
                        <Select
                          fullWidth
                          size="small"
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          
                          value={field.value}
                          // label="Age"

                          onChange={(e) => field.onChange(e.target.value)}
                        >
                          
                          {extensionData?.map((val) => (
                            <MenuItem key={val.id} value={val.id}>
                              {val.ext_code}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                  </div>
                </Grid> 


                <Grid item xs={4} sx={{ mt: 2 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <label style={{ marginRight: 10 }} htmlFor="IvrOption">
                      IVR Option
                    </label>
                    <Controller
                      name="IvrOption"
                    
                      control={control}
                      // defaultValue={Number(EditedData?.rec_flag)}
                      render={({ field }) => (
                        <Select
                          fullWidth
                          size="small"
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          
                          value={field.value}
                          // label="Age"

                          onChange={(e) => field.onChange(e.target.value)}
                        >
                          
                          {IVRData?.map((val) => (
                            <MenuItem key={val.id} value={val.id}>
                              {val.IVR_Name}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                  </div>
                </Grid> 
                <Grid item xs={5}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        marginLeft: 35,
                      }}
                    >
                      <Controller
                        control={control}
                        name="FromDate"
                        render={({ field }) => (
                          <DatePicker
                            {...field}
                            label="From Date"
                            renderInput={(props) => (
                              <TextField margin="normal" {...props} />
                            )}
                          />
                        )}
                      />
                    </div>
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={5}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        marginLeft: 35,
                      }}
                    >
                      <Controller
                        control={control}
                        name="ToDate"
                        render={({ field }) => (
                          <DatePicker
                            label="To Date"
                            {...field}
                            renderInput={(props) => (
                              <TextField margin="normal" {...props} />
                            )}
                          />
                        )}
                      />
                    </div>
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={4} sx={{ ml: 4, mt: 1.5 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <label style={{ marginRight: 10 }} htmlFor="">
                      Duration Min
                    </label>

                    <Controller
                      control={control}
                      name="MinDuration"
                      render={({ field }) => (
                        <CustomTextField
                          size="small"
                          name="MinDuration"
                          {...field}
                          label="Duration in Minutes (1,2,3..)"
                          inputRef={field.ref}
                          // defaultValue={EditedData?.ext_code}
                          error={Error?.duration_min ? true : false}
                          helperText={Error?.duration_min?.toString()}
                        />
                      )}
                    />
                  </div>
                </Grid>
                <Grid item xs={4} sx={{ ml: 10, mt: 1.5 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <label style={{ marginRight: 10 }} htmlFor="">
                      Filter
                    </label>

                    <Controller
                      render={({ field }) => (
                        <RadioGroup row aria-label="gender" {...field}>
                          <Tooltip title="Smaller than">
                            <FormControlLabel
                              value=">"
                              control={<Radio />}
                              label=">"
                              labelPlacement="start"
                            />
                          </Tooltip>
                          <Tooltip title="equals to">
                            <FormControlLabel
                              value="="
                              control={<Radio />}
                              label="="
                              labelPlacement="start"
                            />
                          </Tooltip>
                          <Tooltip title="greater than">
                            <FormControlLabel
                              value="<"
                              control={<Radio />}
                              label="<"
                              labelPlacement="start"
                              color="##8dc63"
                            />
                          </Tooltip>
                        </RadioGroup>
                      )}
                      name="Filter"
                      control={control}
                    />
                  </div>
                </Grid>
                <Grid item xs={8}>
                  <Button type="submit" variant="contained">
                    SUBMIT
                  </Button>
                </Grid>

                <Grid item xs={2}>
                  {TableData.length > 0 && <CsvComponent data={TableData} />}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Grid container sx={{ px: 10, py: 5 }} spacing={2}>
          <Grid item>
            {console.log("Length", TableData.length)}
            {TableData.length > 0 && (
              <Table
                search={true}
                rows={TableData}
                header={header}
                // Error={error}
                mode={"OutGoing"}
                pagination={3}
              />
            )}
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

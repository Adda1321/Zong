import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import { makeStyles } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import TextField from "@mui/material/TextField";
// const useStyles = makeStyles(theme => ({
//     MenuItem : {
//       margin: theme.spacing(1),
//       width: "20vw",

//     },
// }))

import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/private-theming";

const theme = createTheme({
  components: {
    MuiMenuItem: {
      // margin: theme.spacing(1),
      style: {
        width: "2000",
        color: "red",
      },
    },
  },
});

const Selection = (props) => {
  console.log("PROOOOPPPPPS", props.RingPlan);
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <FormControl sx={{ width: "40%" }} size="small">
      <InputLabel id="demo-simple-select-label">{props.name}</InputLabel>

      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={age}
        label={props.name}
        onChange={handleChange}
        sx={{ textAlign: "initial", fontSize: "15px" }}
      >
        {props.value.map((value, index) => {
          return (
            <MenuItem dense value={index}>
              {value}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default Selection;

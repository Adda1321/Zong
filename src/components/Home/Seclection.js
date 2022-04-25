import * as React from "react";
import { Link } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import { makeStyles } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box } from "@mui/material";
import "../../App.css";

import TextField from "@mui/material/TextField";
// const useStyles = makeStyles(theme => ({
//     MenuItem : {
//       margin: theme.spacing(1),
//       width: "20vw",

//     },
// }))

import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/private-theming";
// import { Box } from "@mui/system";

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
  console.log(props.value);
  return (
    <Box sx={{ width: "120px" }}>
      <FormControl
        sx={{ m: 1, minWidth: 120, color: "white" }}
        // size="small"
      >
        <InputLabel id="demo-simple-select-label" sx={{ color: "white" }}>
          {props.name}
        </InputLabel>

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label={props.name}
          onChange={handleChange}
          sx={{ textAlign: "initial", fontSize: "15px", color: "white" }}
        >
          {props.value.map((value, index) => {
            return (
              // <Link to={value.link} className="navbar-link" >
              <MenuItem
                dense
                value={index}
                key={index}
                component={Link} className="navbar-link"
                to={value.link}
              >
                {value.value}
              </MenuItem>
              //  </Link>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Selection;

import React from "react";
import Box from "@mui/material/Box";

import Checkbox from "@mui/material/Checkbox";

export default function CustomCheckBox(props) {
  const { name , onChange , check , defaultCk} = props;
//   const [checked, setChecked] = React.useState(false);

//   const handleChange = (event) => {
//     setChecked(event.target.checked);
//   };
console.log('check--' , name , ':', check)
  return (
    <Box
      sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}
    >
      <div>{name}</div>
      <Checkbox
        checked={check}
        onChange={onChange}
        // defaultChecked={defaultCk}
        inputProps={{ "aria-label": "controlled" }}
      />
    </Box>
  );
}

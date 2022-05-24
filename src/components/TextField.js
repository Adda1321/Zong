import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function CustomTextField({
  placeholder,
  Width,
  size,
  defaultValue,
  label,
//   name,
  id,
  ...field
}) {
  console.log('FIELD-' , defaultValue)
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          {...field}
          size={size}
        //   name={name}
          id={id}
          defaultValue={defaultValue}
          placeholder={placeholder}
          label={label}
          InputLabelProps={{ shrink: true }}
        //   inputRef={}
        />
      </div>
    </Box>
  );
}

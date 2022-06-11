import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";



const  CustomTextField =  React.forwardRef(({
  placeholder,
  Width,
  size,
  defaultValue,
  label,
  inputRef,
  type,
  //   name,
  id,
  ...field
}, ref) =>   {
  // console.log("FIELD-", defaultValue);
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
          type={type}
          id={id}
          // defaultValue={defaultValue}
          placeholder={placeholder}
          label={label}
          InputLabelProps={{ shrink: true }}
          inputRef={ref}
        />
      </div>
    </Box>
  );
})

export default  CustomTextField;

import { useState,useEffect } from "react";
import { TextField, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import CustomTextField from "./TextField";
function AddRemoveMultipleInputFields({ parentCallback }) {
  const [inputFields, setInputFields] = useState([
    {
      phone: "",
    },
  ]);
useEffect(() => {
    parentCallback(inputFields);
  
}, [])

  const addInputField = () => {
    setInputFields([
      ...inputFields,
      {
        phone: "",
      },
    ]);
  };
  const removeInputFields = (index) => {
    const rows = [...inputFields];
    console.log("INDEX", index);
    rows.splice(index, 1);
    setInputFields(rows);
  };

  const handleChange = (index, evnt) => {
    const { name, value } = evnt.target;
    const list = [...inputFields];
    console.log("Before List", list);
    list[index][name] = value;
    // console.log("After List", list);
    setInputFields(list);
    parentCallback(inputFields);
  };

  return (
    <div>
      {/* <div className="row">
        <div className="col-sm-8"> */}
      {inputFields.map((data, index) => {
        const { phone } = data;
        return (
          // <Grid container sx={{ py: 1 }} spacing={2}>
          //   <Grid item xs={12} >
          <>
            <TextField
              //   fullWidth
              size="small"
              type="text"
              onChange={(evnt) => handleChange(index, evnt)}
              value={phone}
              name="phone"
              className="form-control"
              style={{ width: "60%", marginBottom: 5 }}
              placeholder="Phone number"
            />
            {/* <div className="col"> */}
            {inputFields.length !== 1 ? (
              <Button
                //   className="btn btn-outline-danger"
                sx={{ ml: 1.5 }}
                variant="contained"
                onClick={() => removeInputFields(index)}
              >
                Remove
              </Button>
            ) : (
              ""
            )}
            {inputFields.length - 1 === index && inputFields.length < 4 && (
              <Button
                // className="btn btn-outline-success "
                sx={{ ml: 1.5 }}
                variant="contained"
                onClick={addInputField}
              >
                Add New
              </Button>
            )}
          </>
          //   </Grid>
          //  </Grid>
        );
      })}
      {/* </div>
      </div> */}
    </div>
  );
}
export default AddRemoveMultipleInputFields;

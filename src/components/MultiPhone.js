import React, { useState, useEffect } from "react";
import { TextField, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import CustomTextField from "./TextField";
import { DateRangePickerDay } from "@mui/lab";
function AddRemoveMultipleInputFields({ parentCallback, NumArr , Error }) {
  // NumArr = [1 , 2 , 3 , 4 ...]

  // let fields = {
  //   phone :''
  // }

  //  fields = NumArr.map((val) => {

  // return ( val )

  // });

  const func = () => {
    var arr = [];
    var obj = { phone: "" };

    NumArr.map((val, key) => {
      obj.phone = val;
      arr.push(JSON.parse(JSON.stringify(obj)));
    });
    return arr;
  };

  const otherFunc = () => {
    const obj = [{ phone: "" }];
    return obj;
  };
  const [inputFields, setInputFields] = useState(
    NumArr.length > 0  ?  () => func() :  () => otherFunc() 
  );

  useEffect(() => {
    parentCallback(inputFields);
  }, []);

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
      {inputFields?.map((data, index) => {
        const { phone } = data;
        return (
          // <Grid container sx={{ py: 1 }} spacing={2}>
          //   <Grid item xs={12} >
          <React.Fragment key={index} >
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
              error={Error  ? true : false}
              helperText={
              
                Error?.Num_2 && Error?.Num_2?.toString()
              
              }

            />
            {/* <div className="col"> */}
            {inputFields?.length !== 1 ? (
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
            {inputFields?.length - 1 === index && inputFields?.length < 4 && (
              <Button
                // className="btn btn-outline-success "
                sx={{ ml: 1.5 }}
                variant="contained"
                onClick={addInputField}
              >
                Add New
              </Button>
            )}
          </React.Fragment>
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

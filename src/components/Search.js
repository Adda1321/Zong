import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Divider from '@mui/material/Divider';
// or
export default function ComboBox() {
  return (
    <Autocomplete
     size="small"
    //   disablePortal
      id="combo-box-demo"
      options={Members}
     
      sx={{ marginTop:'10px' }}
      renderInput={(params) =><> <TextField  {...params} label="Members"  />  
      <Divider/>
      </>
      }
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const Members = [
  { label: 'The Shawshank Redemption', year: 1994 },

  {
    label: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
 
  { label: 'The Great Dictator', year: 1940 },
  { label: 'Cinema Paradiso', year: 1988 },
  
  {
    label: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
 
  { label: 'The Great Dictator', year: 1940 },
  { label: 'Cinema Paradiso', year: 1988 },
  
 
];

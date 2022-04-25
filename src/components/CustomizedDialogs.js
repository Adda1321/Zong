import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import Divider from '@mui/material/Divider';
import  TextField  from '@mui/material/TextField';
import { Box, Select } from '@mui/material';
import Selection from './Select'
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/private-theming';
import ComboBox from './Search';

// const theme = createTheme({
//   components:{
    
//   }
// })

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  // '& .MuiDialogContent-root': {
  //   padding: theme.spacing(2),
  // },
  // '& .MuiDialogActions-root': {
  //   padding: theme.spacing(1),
  // },

}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 ,color:'white' , display:'flex', alignItems:'center', backgroundColor:"#004d7f"}} {...other}>
<AccountTreeIcon sx={{color:'white' , paddingRight:1 }}/>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color:'white',
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs({text}) {
  const RingPlan =['Sequential' , 'Ring All' , 'Sequential with Memory'];
  const Music =['option 1' , 'option 2 ', 'option 3']
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  function handleClickSave() {
    setLoading(true);
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        {text}
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        // sx={{width:'2000px'}}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} >
          Modal title
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom sx={{color:"#007bcd"}}>
 Queue Details
          </Typography>
          <Divider sx={{color:"#007bcd"}} />

<Box sx={{marginTop:3 , textAlign:'center' , 
  display:'flex', flexDirection:'column', width:'100%' , alignItems:'center' , backgroundColor:'',justifyContent:'center' , 
}}>

<TextField
          required
          id="outlined-required"
          sx={{ width:'40%'}}
          label="Queue Name"
           size="small"
          // defaultValue="Hello World"
          // paddingY={23}
        />
        <div style={{paddingTop:5 , paddingBottom:5}}/>
          
          <Selection  value={RingPlan} name = {'Ring Plan'}/>
          <div style={{paddingTop:5 , paddingBottom:5}}/>
          <Selection value={Music} name ={'Music on Hold'} />
          
</Box>

          
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
            ullamcorper nulla non metus auctor fringilla.
          </Typography>

          <Typography gutterBottom sx={{color:"#007bcd"}}>
Queue Members
          </Typography>
          <Divider sx={{color:"#007bcd"}} />
          <ComboBox/>
        </DialogContent>
  <Box sx={{display:'flex', justifyContent:'flex-end' , marginY:'8px' }}>
    
    
  <LoadingButton
          color="inherit"
          sx={{backgroundColor:'#efefef', marginX:'10px' , color:'#4a4a4a' , width:'100px'}}
          // onClick={handleClickSave}
          // loading={loading}
          loadingPosition="start"
          startIcon={<CloseIcon />}
          variant="contained"
          
        >
        Cancel
        </LoadingButton>

        <LoadingButton
          // color="warning"
          sx={{backgroundColor:'#f02794', marginRight:'10px', width:'100px'}}
          onClick={handleClickSave}
          // loading={loading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
        >
          Save
        </LoadingButton>
    </Box>    

      </BootstrapDialog>
    </div>
  );
}

import React,{useState , useEffect} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {Modal_OpenClose} from '../../store/Modal';

import { useDispatch, useSelector } from 'react-redux';


import Modal from "@mui/material/Modal";
import ExtForm from "./ExtForm";
import IVRForm from "../IVR/IVRForm";

export default function NewExt(props) {
  const { gate, get_state , mode , EditData }=props



  const getOpen = useSelector((state ) => state.Modal.open)
  // const [open, setOpen] = React.useState(getOpen);

  // ----------------------------------- REDUX -------------------------

//   useEffect(() => {
//   setOpen( getOpen )
   
// }, [getOpen])


  // Using useSelector hook we obtain the redux store value
console.log('OPEN',getOpen)
console.log('OPEN ---> Edit ',EditData)

  const dispatch = useDispatch();
  
  // Using the useDispatch hook to send payload back to redux
  const HandleModal = () => {
    dispatch(Modal_OpenClose(false)) 
    // console.log( 'get_state'  ,   )
   {get_state && get_state('')}
     
  };

  // ----------------------------------- REDUX -------------------------

  // React.useEffect(() => {
  //   alert(gate);
  //   setOpen(gate);
  // }, [gate]);

  const handleClose = () => {
    // setOpen(false);
   
    // get_state();
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    // p: 0.5,
  };
  // const closeModal = (childData)=>{
  //   setOpen(childData);
  //   handleClose();
  //   // EditData=null
  // }
  return (
    <div>
      <Modal
        open={getOpen}
        onClose={HandleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        <div>
          {mode === 'ext' && <ExtForm 
          // parentModal={closeModal}
          
          EditData={EditData} 
          />
           }
          { mode === 'ivr' && <IVRForm 
          // parentModal={closeModal}
          EditData={EditData} 
          /> }
          
          
        </div>
        
      </Modal>
    </div>
  );
}

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ExtForm from "./ExtForm";
import IVRForm from "../IVR/IVRForm";

export default function NewExt(props) {
  const { gate, get_state , ivr , ext  , EditData }=props
  const [open, setOpen] = React.useState(gate);

  React.useEffect(() => {
    // alert(gate);
    setOpen(gate);
  }, [gate]);

  const handleClose = () => {
    setOpen(false);
    get_state();
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
  const closeModal = (childData)=>{
    setOpen(childData);
    handleClose();
    // EditData=null
    // console.log('modal' , childData)
  }
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        <div>
          {ext && <ExtForm parentModal={closeModal} EditData={EditData} /> }
          {ivr && <IVRForm parentModal={closeModal}/> }
          
          
        </div>
        
      </Modal>
    </div>
  );
}

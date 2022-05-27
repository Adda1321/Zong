import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DestinationForm from "./DestinationForm";
import { handleModal } from "../store/Module";

import { useDispatch, useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  height: 600,
  bgcolor: "background.paper",
  //   border: '2px solid #000',
  boxShadow: 24,
  //   p: 1,
};

export default function Destination() {
  const open = useSelector((state) => state.Dest.Destination);
  
  const dispatch = useDispatch();

  const handleOpen = () => {};
  const handleClose = () => dispatch(handleModal(false));

  return (
    <div>
      {/* <Button onClick={() => dispatch(handleModal(true))}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <DestinationForm />
          </div>
        </Box>
      </Modal>
    </div>
  );
}

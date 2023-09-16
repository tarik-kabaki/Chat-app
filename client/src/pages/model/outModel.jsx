import React from "react";
import Box from "@mui/material/Box";
import PowerSettingsNewRounded from "@mui/icons-material/PowerSettingsNewRounded";
import Modal from "@mui/material/Modal";
import "./model.css";
import rmv from "../../av/rmv.png";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const OutModel = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button
        onClick={handleOpen}
        className="absolute right-3 top-3 w-[34px] h-[34px] rounded-full bg-white text-rose-500 flex justify-center items-center"
      >
        <PowerSettingsNewRounded />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="outModelCss">
          <section className="w-full h-full">
            <div className="flex justify-center p-10 mb-2">
              <img src={rmv} className="object-cover w-[150px] h-[150px]" />
            </div>
            <div className="flex justify-center ">
              <section>
                <h1 className="text-xl text-center">
                  Oh no! You're leaving...
                </h1>
                <h1 className="text-xl text-center">Are you sure?</h1>
              </section>
            </div>
            <div className="flex justify-center flex-col p-10">
              <button className="w-full rounded-full p-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white mb-3">
                Yes , Sign up
              </button>
              <button className="w-full rounded-full border-[1px] p-4 border-blue-500 text-blue-500">
                Nah, just kidding
              </button>
            </div>
          </section>
        </Box>
      </Modal>
    </div>
  );
};

export default OutModel;

import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { connect } from "react-redux";

const alertStatus = {
  isOpen: false,
  text: 0,
};

function DeleteSiswa({ anId, open, setOpen }) {
  const [openStatusDelete, setOpenStatusDelete] = useState(alertStatus);
  const [errMessage, setErrMessage] = useState("");

  const handleDelete = (event) => {
    setOpen(true);

    if (event.target) {
      if (event.target.textContent === "Yes") {
        axios
          .get(`https://dummyjson.com/users/${anId}`, {
            method: "DELETE",
          })
          .then((res) => ({ status: res.status, body: res.data }))
          .then((obj) => {
            console.log(obj.body);
            setOpen(false);
            setOpenStatusDelete({ isOpen: true, text: obj.status });
          })
          .catch((err) => {
            console.log(err);
            setOpen(false);
            setOpenStatusDelete({ isOpen: true, text: 0 });
            setErrMessage(err.message);
          });
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure delete this data?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openStatusDelete.isOpen}
        onClose={() => {
          setOpenStatusDelete({ isOpen: false, text: openStatusDelete.text });
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {openStatusDelete.text >= 200 && openStatusDelete.text <= 299
            ? "Data is already deleted"
            : `Falied, ${errMessage}`}
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenStatusDelete({
                isOpen: false,
                text: openStatusDelete.text,
              });
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function mapStateToProps(state) {
  return {
    id: state.id,
    items: state,
  };
}

export default connect(mapStateToProps)(DeleteSiswa);

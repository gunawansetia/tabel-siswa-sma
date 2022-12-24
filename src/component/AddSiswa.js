import {
  Alert,
  Button,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { connect } from "react-redux";
import { addSiswa } from "../actions";

const defaultValues = {
  firstName: "",
  lastName: "",
  city: "",
  gender: "",
};

const alertStatus = {
  isOpen: false,
  success: true,
  text: "",
};

const gender = ["Laki-laki", "Perempuan"];

function AddSiswa({ dispatch }) {
  const [formValues, setFormValues] = useState(defaultValues);
  const [open, setOpen] = useState(alertStatus);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("https://dummyjson.com/users/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        address: { city: formValues.city },
        gender: formValues.gender,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not OK");
        }
        res
          .json()
          .then((data) => ({ status: res.status, body: data }))
          .then((obj) => {
            dispatch(addSiswa(obj.body));
            console.log(obj.body);
            setOpen({ isOpen: true, text: obj.status, success: true });
          });
      })

      .catch((error) => {
        setOpen({ isOpen: true, text: error, success: false });
        console.error("Error:", error);
      });
  };

  return (
    <>
      <Container maxWidth="md">
        <Typography variant="h5" sx={{ textAlign: "center", my: 3 }}>
          Tambah Siswa SMA Setia
        </Typography>
        <Alert
          severity={!open.success ? "error" : "success"}
          sx={{ display: open.isOpen ? "flex" : "none", mb: 3 }}
        >
          {`This is a ${!open.success ? "error" : "success"} alert - ${
            open.text
          }`}
        </Alert>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item>
              <TextField
                id="firstname-input"
                required
                label="Nama Depan"
                name="firstName"
                variant="standard"
                value={formValues.firstName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="lastname-input"
                required
                label="Nama Belakang"
                name="lastName"
                variant="standard"
                value={formValues.lastName}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item>
              <TextField
                id="gender-input"
                required
                select
                sx={{ width: 182 }}
                label="Gender"
                name="gender"
                variant="standard"
                defaultValue="Laki-laki"
                helperText="Please select your gender"
                value={formValues.gender}
                onChange={handleInputChange}
              >
                {gender.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item>
              <TextField
                id="domisili-input"
                required
                label="Domisili"
                name="city"
                variant="standard"
                value={formValues.city}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Button color="primary" variant="outlined" type="submit">
            Submit
          </Button>
        </form>
      </Container>
    </>
  );
}

export default connect()(AddSiswa);

import {
  Alert,
  Button,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { updateSiswa } from "../actions";

const defaultValues = {
  firstName: "",
  lastName: "",
  city: "",
  gender: "",
};

const alertStatus = {
  isOpen: false,
  text: "",
};

const gender = ["Laki-laki", "Perempuan"];

function EditSiswa({ dispatch, id, items }) {
  const [formValues, setFormValues] = useState(defaultValues);
  const [open, setOpen] = useState(alertStatus);
  const [errMessage, setErrMessage] = useState("");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  useEffect(() => {
    if (id !== "") {
      axios
        .get(`https://dummyjson.com/users/${id}`)
        .then((res) => res.data)
        .then((data) => {
          setFormValues({
            firstName: data.firstName,
            lastName: data.lastName,
            city: data.address.city,
            gender: data.gender,
          });
        })
        .catch((err) => {
          console.log(err);
          setErrMessage(err.message);
        });
    }
    <div> Something's wrong...</div>; // eslint-disable-next-line
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .put(`https://dummyjson.com/users/${id}`, {
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        address: { city: formValues.city },
        gender: formValues.gender,
      })
      .then((res) => ({ status: res.status, body: res.data }))
      .then((obj) => {
        dispatch(updateSiswa(obj.body));

        setOpen({ isOpen: true, text: obj.status });
      })
      .catch((err) => {
        console.log(err);
        setErrMessage(err.message);
      });
  };

  if (formValues.firstName === "") {
    if (errMessage) {
      return (
        <Typography variant="h5" sx={{ textAlign: "center", my: 3 }}>
          {errMessage}
        </Typography>
      );
    }
    return (
      <Typography variant="h5" sx={{ textAlign: "center", my: 3 }}>
        Loading...
      </Typography>
    );
  }

  return (
    <>
      <Container maxWidth="md">
        <Typography
          variant="h5"
          fontWeight={500}
          sx={{ textAlign: "center", my: 3 }}
        >
          Update Siswa SMA Setia
        </Typography>
        <Alert sx={{ display: open.isOpen ? "flex" : "none", mb: 3 }}>
          {`This is a success alert - ${open.text}`}
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
                label="Gender"
                name="gender"
                variant="standard"
                defaultValue="Laki-laki"
                helperText="Please select your gender"
                value={
                  formValues.gender === "male"
                    ? "Laki-laki"
                    : formValues.gender === "female"
                    ? "Perempuan"
                    : formValues.gender === "Laki-laki"
                    ? "Laki-laki"
                    : "Perempuan"
                }
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

function mapStateToProps(state) {
  return {
    id: state.id,
    items: state,
  };
}

export default connect(mapStateToProps)(EditSiswa);

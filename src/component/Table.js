import { useState } from "react";
import { Container } from "@mui/system";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

export default function BasicTable() {
  const [state, setState] = useState({
    items: [],
    isLoading: true,
  });

  const { items, isLoading } = state;

  useState(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((res) => setState({ items: res.users, isLoading: false }));
  });

  if (isLoading) {
    return (
      <Typography variant="h5" sx={{ textAlign: "center", my: 3 }}>
        Loading...
      </Typography>
    );
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            ></IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Gunawan Setia
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <Container maxWidth="xl">
        <Typography variant="h5" sx={{ textAlign: "center", my: 3 }}>
          Daftar Siswa SMA Setia
        </Typography>
        <TableContainer sx={{ my: 2 }} component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Nama Lengkap</TableCell>
                <TableCell>Jenis Kelamin</TableCell>
                <TableCell>Domisili</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell>{row.firstName}</TableCell>
                  <TableCell>{row.gender}</TableCell>
                  <TableCell>{row.address.city}</TableCell>
                  <TableCell>Edit, Hapus</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

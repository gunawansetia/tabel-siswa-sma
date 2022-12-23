import { useEffect, useState } from "react";
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
import { connect } from "react-redux";
import { fetchTable } from "../actions";
import { TableFooter, TablePagination } from "@mui/material";

function TableSiswa(props) {
  useEffect(() => {
    props.dispatch(fetchTable());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (props.isLoading || !props.items) {
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
              {props.items
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell>{`${row.firstName} ${
                      row.middleName ? row.middleName : ""
                    } ${row.lastName}`}</TableCell>
                    <TableCell>
                      {row.gender === "male" ? "Laki-laki" : "Perempuan"}
                    </TableCell>
                    <TableCell>{row.address.city}</TableCell>
                    <TableCell>Edit, Hapus</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={props.items.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>
    </>
  );
}

function mapStateToProps(state) {
  return {
    items: state.rows.users,
  };
}

export default connect(mapStateToProps)(TableSiswa);

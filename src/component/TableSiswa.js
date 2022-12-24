import { useEffect, useState } from "react";
import { Container } from "@mui/system";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { connect } from "react-redux";
import { fetchTable, getId } from "../actions";
import { Button, TablePagination } from "@mui/material";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import { pink } from "@mui/material/colors";
import DeleteSiswa from "./DeleteSiswa";

function TableSiswa(props) {
  useEffect(() => {
    if (props.items ? props.items.length === 0 : true) {
      props.dispatch(fetchTable());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getIdUser = (id) => {
    props.dispatch(getId(id));
  };

  if (props.isLoading || props.items.length === 0 || !props.items) {
    return (
      <Typography variant="h5" sx={{ textAlign: "center", my: 3 }}>
        Loading...
      </Typography>
    );
  }

  return (
    <>
      <DeleteSiswa anId={id} open={open} setOpen={setOpen} />

      <Container maxWidth="xl">
        <Typography
          variant="h5"
          fontWeight={500}
          sx={{ textAlign: "center", my: 3 }}
        >
          Daftar Siswa SMA Setia
        </Typography>
        <Link style={{ textDecoration: "none" }} to="/add">
          <Button variant="outlined">Tambah Siswa</Button>
        </Link>
        <TableContainer sx={{ my: 2 }} component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Nama Lengkap</TableCell>
                <TableCell>Jenis Kelamin</TableCell>
                <TableCell>Domisili</TableCell>
                <TableCell sx={{ width: 200 }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.items
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell>{`${row.firstName} ${
                      row.middleName ? row.middleName : ""
                    } ${row.lastName}`}</TableCell>
                    <TableCell>
                      {row.gender === "male"
                        ? "Laki-laki"
                        : row.gender === "female"
                        ? "Perempuan"
                        : row.gender === "Laki-laki"
                        ? "Laki-laki"
                        : "Perempuan"}
                    </TableCell>
                    <TableCell>{row.address ? row.address.city : ""}</TableCell>
                    <TableCell>
                      <Link to="edit">
                        <Button onClick={() => getIdUser(row.id)}>
                          <EditOutlined />
                        </Button>
                      </Link>

                      <Button
                        sx={{ color: pink[500] }}
                        onClick={() => {
                          setId(row.id);
                          setOpen(true);
                        }}
                      >
                        <DeleteOutlined />
                      </Button>
                    </TableCell>
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
    loading: state.loading,
    items: state.rows,
  };
}

export default connect(mapStateToProps)(TableSiswa);

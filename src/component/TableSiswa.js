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
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  TablePagination,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Delete, DeleteOutlined, EditOutlined } from "@mui/icons-material";
import { pink } from "@mui/material/colors";
import DeleteSiswa from "./DeleteSiswa";

const alertStatus = {
  isOpen: false,
  text: false,
};

function TableSiswa(props) {
  useEffect(() => {
    if (props.items ? props.items.length === 0 : true) {
      props.dispatch(fetchTable());
    }
    console.log(props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [openStatusDelete, setOpenStatusDelete] = useState(alertStatus);
  const [id, setId] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getIdUser = (id) => {
    props.dispatch(getId(id));
    setId(id);
  };

  const handleDelete = (event) => {
    setOpen(true);
    console.log(id);
    if (event.target) {
      if (event.target.textContent === "Yes") {
        fetch(`https://dummyjson.com/users/${id}`, {
          method: "DELETE",
        }).then((res) => {
          res
            .json()
            .then((data) => ({ status: data.isDeleted, body: data }))
            .then((obj) => {
              console.log(obj.body);
              setOpen(false);
              setOpenStatusDelete({ isOpen: true, text: obj.status });
            });
        });
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
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
          {openStatusDelete.text
            ? "Berhasil menghapus Data"
            : "Gagal Menghapus"}
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

      <Container maxWidth="xl">
        <Typography variant="h5" sx={{ textAlign: "center", my: 3 }}>
          Daftar Siswa SMA Setia
        </Typography>
        <Link to="/add">
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
                          getIdUser(row.id);
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

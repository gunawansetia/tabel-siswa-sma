import { Breadcrumbs, Container } from "@mui/material";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import AddSiswa from "./component/AddSiswa";
import EditSiswa from "./component/EditSiswa";
import NavBar from "./component/NavBar";
import TableSiswa from "./component/TableSiswa";
import "./App.css";
import DeleteSiswa from "./component/DeleteSiswa";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Container maxWidth="lg">
        <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 3 }}>
          <Link className="Link" to="/">
            Home
          </Link>
          <Link className="Link" to="/add">
            Add
          </Link>
        </Breadcrumbs>
      </Container>
      <Routes>
        <Route path="/" index element={<TableSiswa />} />
        <Route path="/add" element={<AddSiswa />} />
        <Route path="/edit" element={<EditSiswa />} />
        <Route path="/delete" element={<DeleteSiswa />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

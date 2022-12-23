import { Breadcrumbs, Container } from "@mui/material";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import AddSiswa from "./component/AddSiswa";
import NavBar from "./component/NavBar";
import TableSiswa from "./component/TableSiswa";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Container maxWidth="md">
        <Breadcrumbs aria-label="breadcrumb" sx={{ my: 0.5 }}>
          <Link className="Link" to="/">
            Home
          </Link>
          <Link className="Link" to="/add">
            Add
          </Link>
        </Breadcrumbs>
      </Container>
      <Routes>
        <Route path="/" element={<TableSiswa />} />
        <Route path="/add" index element={<AddSiswa />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

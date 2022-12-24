import React, { useEffect } from "react";
import { connect } from "react-redux";

function DeleteSiswa({ id }) {
  useEffect(() => {
    fetch(`https://dummyjson.com/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(console.log);
  }, []);

  return <div>Berhasil Dihapus {id}</div>;
}

function mapStateToProps(state) {
  return {
    id: state.id,
    items: state,
  };
}

export default connect(mapStateToProps)(DeleteSiswa);

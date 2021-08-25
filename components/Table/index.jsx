import "bootstrap/dist/css/bootstrap.css";
// import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

export const Table = (props) => {
  // TODO: figure out empty states
  return (
    // props.body.length
    // ? <BootstrapTable
    <BootstrapTable
      {...props}
      pagination={paginationFactory({ sizePerPage: 20 })}
    />
    // : <p>No Data</p>
  )
};

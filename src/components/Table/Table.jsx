import Table from "react-bootstrap/Table";
import PropTypes from "prop-types";
import "./Table.css";

function Table_Component({ title_List, data }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {title_List.map((title, idx) => (
            <th key={idx}>{title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, idx) => (
          <tr key={idx}>
            <td>{idx}</td>
            <td>{item}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default Table_Component;

Table_Component.propTypes = {
  title_List: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};

import Table from "react-bootstrap/Table";
import PropTypes from "prop-types";

function RouteTable({ title_List, data }) {
  const lastColumnIndex = title_List.length - 1;

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {title_List.slice(0, lastColumnIndex).map((title, idx) => (
            <th key={idx}>{title}</th>
          ))}
          <th colSpan={100}>Tuyến Đường Thu Gom</th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ id, routes }) => {
          const routeCount = routes.length;

          return routes.map((route, routeIdx) => (
            <tr key={`${id}-${routeIdx}`}>
              {routeIdx === 0 ? (
                <td rowSpan={routeCount} className='text-center'>
                  {id}
                </td>
              ) : null}
              <td>{routeIdx}</td>
              {route.map((v, vIdx) => (
                <td key={vIdx}>{v}</td>
              ))}
            </tr>
          ));
        })}
      </tbody>
    </Table>
  );
}

RouteTable.propTypes = {
  title_List: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      routes: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number).isRequired)
        .isRequired,
    })
  ).isRequired,
};

export default RouteTable;

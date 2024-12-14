import WOA from "./WOA";
import RouteTable from "./RouteTable";
import Console from "../Console/Console";
import PropTypes from "prop-types";
import "./Schedule.css";

const Schedule = ({ load }) => {
  const woa = new WOA(
    load.sort((a, b) => b - a),
    1
  );

  const schedule = woa.initPopulation(0, 0)[0];

  return (
    <>
      <RouteTable
        title_List={["Lần Di Chuyển", "ID", "Tuyến Đường Thu Gom"]}
        data={schedule}
      />

      <Console data={schedule} load={load} />
    </>
  );
};

export default Schedule;

Schedule.propTypes = {
  load: PropTypes.array.isRequired,
};

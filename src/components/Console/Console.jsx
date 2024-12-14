import PropTypes from "prop-types";
import { loadM } from "../../Data/data";

const Console = ({ data, load }) => {
  const copyLoadM = [...loadM];
  return (
    <div>
      {data.map((item) => (
        <div key={Math.random()}>
          {item.routes.map((route, j) => {
            const messages = [];
            let max = load[j];
            let startIdx = 0;

            while (
              startIdx < route.length &&
              max - copyLoadM[route[startIdx]] >= 0 &&
              max !== max - copyLoadM[route[startIdx]] >= 0
            ) {
              max -= copyLoadM[route[startIdx]];
              messages.push(
                <p key={Math.random()}>{`Xe ${j + 1} ${
                  route[startIdx] === 0 ? "bắt đầu thu gom" : "thu gom điểm"
                } ${route[startIdx]} - tải tối đa: ${max}`}</p>
              );
              copyLoadM[route[startIdx]] = 0;
              startIdx++;
            }

            return messages;
          })}
        </div>
      ))}
    </div>
  );
};

export default Console;

Console.propTypes = {
  load: PropTypes.arrayOf(PropTypes.number).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      routes: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number).isRequired)
        .isRequired,
    })
  ).isRequired,
};

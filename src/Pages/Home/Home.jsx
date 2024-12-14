import { Canvas, Table, UpLoadFile } from "../Index";
import { coordinates, distanceM, loadM } from "../../Data/data";
import "./Home.css";

const Home = () => {
  const copyLoadM = [...loadM];
  return (
    <div>
      <div className='Info'>
        <div className='graph'>
          <h3>Đồ Thị Các Điểm Cần Thu Gom</h3>
          <Canvas width={700} height={300} c={coordinates} d={distanceM} />
        </div>

        <div className='loadTable'>
          <h3>Trữ Lượng Của Từng Điểm Thu Gom</h3>
          <Table title_List={["ID", "Trữ Lượng"]} data={copyLoadM} />
        </div>
      </div>

      <UpLoadFile />
    </div>
  );
};

export default Home;

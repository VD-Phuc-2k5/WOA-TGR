import PropTypes from "prop-types";
import { useRef, useEffect } from "react";
import "./Canvas.css";

const Canvas = ({ width, height, c, d }) => {
  const canvasRef = useRef(null);
  // Ve cac canh
  function drawEdges(ctx) {
    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
    for (let i = 0; i < d.length; i++) {
      for (let j = i + 1; j < d[i].length; j++) {
        if (d[i][j] !== 0) {
          ctx.beginPath();
          ctx.moveTo(c[i].x, c[i].y);
          ctx.lineTo(c[j].x, c[j].y);
          ctx.stroke();

          const midX = (c[i].x + c[j].x) / 2;
          const midY = (c[i].y + c[j].y) / 2 + 10;

          ctx.fillText(d[i][j], midX, midY);
        }
      }
    }
  }

  // ve cac dinh
  function drawVertices(ctx) {
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "13px Arial";
    c.forEach((point, index) => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 15, 0, Math.PI * 2);
      ctx.fillStyle = index === 0 ? "yellow" : "white";
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "black";
      ctx.fillText(`${index}`, point.x, point.y);
    });
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "white";
    drawEdges(ctx);
    drawVertices(ctx);
  }, []);

  return <canvas ref={canvasRef} width={width} height={height}></canvas>;
};

export default Canvas;

Canvas.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  c: PropTypes.array.isRequired,
  d: PropTypes.array.isRequired,
};

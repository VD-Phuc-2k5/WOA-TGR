import { useState } from "react";
import Table_Component from "../Table/Table";
import Schedule from "../Schedule/Schedule";
import "./UpLoadFile.css";

const UpLoadFile = () => {
  const [fileContent, setFileContent] = useState([]);

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files[0].type === "text/plain") {
      readFile(files[0]);
    } else throw new Error("Error: can't read file");
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "text/plain") {
      readFile(file);
    } else throw new Error("Error: can't read file");
  };

  const readFile = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      setFileContent(event.target.result.split(","));
    };
    reader.readAsText(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div id='drop_zone' onDrop={handleDrop} onDragOver={handleDragOver}>
        <p>Drop File Here or Click to Upload</p>
        <input
          type='file'
          accept='.txt'
          onChange={handleChange}
          id='fileInput'
        />
        <label htmlFor='fileInput'>Browse Files</label>
      </div>

      {fileContent && fileContent.length > 0 && (
        <>
          <Table_Component
            title_List={["ID", "Tải Tối Đa"]}
            data={fileContent}
          />
          <h3>LỊCH TRÌNH THU GOM</h3>
          <Schedule
            load={fileContent.map((item) => Number.parseInt(item))}
          />{" "}
        </>
      )}
    </>
  );
};

export default UpLoadFile;

import React from "react";
import FileList from "../Components/FileList";

function Home(props) {
  return (
    <React.Fragment>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Home</h1>
      </div>
      <FileList />
    </React.Fragment>
  );
}

export default Home;

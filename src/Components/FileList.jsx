import React, { useState, useEffect } from "react";
import ServiceWrapper from "../Services/ServiceWrapper";
import Utils from "../Common/Utils";
import AppSettings from "../Settings/AppSettings";

function FileList() {
  var [loadError, setLoadError] = React.useState(false);
  var [filesList, setfilesList] = React.useState([]);
  var [breadList, setbreadList] = React.useState([]);
  var [loading, setLoading] = React.useState(false);

  async function load_files(path = "") {
    setLoading(true);
    var api_base_url = AppSettings.BACKEND_API_URL;
    let ret = await ServiceWrapper.doGet(api_base_url + "path/" + path);
    // console.log(ret);
    setLoadError(ret.errorfound);
    if (!ret.errorfound) {
      setfilesList(ret.data.files);
      setbreadList(ret.data.bread);
    }
    setLoading(false);
  }

  function handle_file_click(filename) {
    var temp = JSON.parse(JSON.stringify(breadList));
    temp.push({ path: "", type: "file", name: filename });
    setbreadList(temp);
    temp = [];
    temp.push({ path: "", type: "data", name: "THIS IS FILE: " + filename });
    setfilesList(temp);
  }

  useEffect(() => {
    load_files();
  }, []);

  return (
    <React.Fragment>
      <div className="row">
        &nbsp;
        {loading && (
          <>
            <span
              className="spinner-grow spinner-grow-sm"
              role="status"
              aria-hidden="true"
            ></span>{" "}
            Loading.....
          </>
        )}
      </div>
      <div className="row"></div>
      <div className="row"></div>
      <div className="table-responsive">
        {filesList.length > 0 && !loadError && (
          <React.Fragment>
            {breadList.length > 0 && (
              <table className="table table-bordered table-sm">
                <thead>
                  <tr>
                    <td>
                      {breadList.map((item) => (
                        <React.Fragment key={"file-" + item.name}>
                          <a
                            href="#"
                            onClick={() => {
                              if (item.type !== "file") load_files(item.path);
                            }}
                            disabled={item.type === "file"}
                          >
                            {item.name}
                          </a>
                          {" > "}
                        </React.Fragment>
                      ))}
                    </td>
                  </tr>
                </thead>
              </table>
            )}

            <table className="table table-bordered table-sm">
              <tbody>
                <tr>
                  <td>
                    <strong>List of files and folders</strong>
                  </td>
                </tr>
                {filesList.map((item) => (
                  <tr key={"file-" + item.name}>
                    <td>
                      {item.type !== "data" && (
                        <a
                          href="#"
                          onClick={() => {
                            if (item.type == "dir") load_files(item.path);
                            else if (item.type == "file")
                              handle_file_click(item.name);
                          }}
                        >
                          {item.name}
                        </a>
                      )}

                      {item.type === "data" && item.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </React.Fragment>
        )}

        {!loading && (
          <>
            {filesList.length == 0 && !loadError && (
              <div className="alert alert-danger" role="alert">
                <strong>Sorry!</strong>, No records found during our search
              </div>
            )}

            {loadError && (
              <div className="alert alert-danger" role="alert">
                <strong>Oops</strong>, A error occured
              </div>
            )}
          </>
        )}
      </div>
    </React.Fragment>
  );
}

export default FileList;

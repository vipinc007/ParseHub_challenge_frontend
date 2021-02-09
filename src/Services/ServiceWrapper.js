const doPost = async function (url, inputdata, authdata = null, token = null) {
  let retObj = {};
  try {
    let authString =
      authdata != null
        ? "Basic " +
          Buffer.from(authdata.email + ":" + authdata.password).toString(
            "base64"
          )
        : null;

    if (authString === null) {
      authString = token != null ? "Bearer " + token : null;
    }
    const rawResponse = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: authString,
      },
      body: JSON.stringify(inputdata),
    });
    retObj.data = await rawResponse.json();
    retObj.errorfound = false;
  } catch (error) {
    retObj = { errorfound: true, errorbj: error, data: null };
  } finally {
  }
  return retObj;
};

const doGet = async function (url, inputdata, authdata = null, token = null) {
  let retObj = {};
  try {
    let authString =
      authdata != null
        ? "Basic " +
          Buffer.from(authdata.email + ":" + authdata.password).toString(
            "base64"
          )
        : null;

    if (authString === null) {
      authString = token != null ? "Bearer " + token : null;
    }

    const rawResponse = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: authString,
      },
    });
    retObj.data = await rawResponse.json();
    retObj.errorfound = false;
  } catch (error) {
    retObj = { errorfound: true, errorbj: error, data: null };
  } finally {
  }
  return retObj;
};

export default {
  doPost: doPost,
  doGet: doGet,
};

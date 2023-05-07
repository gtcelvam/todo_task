import axios from "axios";
var CryptoJS = require("crypto-js");

export const encryptText = (password: string) => {
  try {
    return CryptoJS.AES.encrypt(
      password,
      process.env.REACT_APP_TS_KEY
    ).toString();
  } catch (error) {
    console.log("Error : ", error);
  }
};

export const decryptText = (password: string) => {
  try {
    return CryptoJS.AES.decrypt(
      password,
      process.env.REACT_APP_TS_KEY
    ).toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.log("Error : ", error);
  }
};

export const handleRequest = async (
  method: string,
  data = null,
  route = ""
) => {
  const url = process.env.REACT_APP_BACKEND_URL + "/api/user" + route;
  let result;
  try {
    if (method === "POST") {
      result = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return result;
    } else {
      let result = await axios.get(url + `/${data}`);
      return result;
    }
  } catch (error) {
    result = error;
    return result;
  }
};

export const handleUserRequest = async (token: string) => {
  // const url = process.env.REACT_APP_BACKEND_URL
  const url = process.env.REACT_APP_BACKEND_URL + "/api/user/auth";
  try {
    let result = await axios.post(
      url,
      {},
      {
        headers: {
          token: `bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return result;
  } catch (error) {}
};

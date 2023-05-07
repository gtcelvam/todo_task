import React, { ChangeEvent, useContext, useState } from "react";
import { CustomTextField, LoginContainer, Logo } from "./login-styled";
import { Button, CircularProgress, Typography } from "@mui/material";
import { decryptText, encryptText, handleRequest } from "../../utils/helpers";
import { ToastContainer, toast } from "react-toastify";
import BookLogo from "../../assests/images/logo.png";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { LoginUserData } from "../../utils/types/user";
import { ContextProvider } from "../provider";

const Login = () => {
  //state values
  const [userData, setUserData] = useState<LoginUserData>({
    name: "",
    password: "",
  });
  const [isError, setIsError] = useState<LoginUserData>({
    name: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  //constants
  const isName = Boolean(userData.name.length);
  const isPassword = Boolean(userData.password.length);
  const { data, setData } = useContext(ContextProvider);

  //functions
  const handleData = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    type = "name"
  ) => {
    let data;
    if (type === "name") {
      data = {
        ...userData,
        name: e.target.value,
      };
    } else {
      data = {
        ...userData,
        password: e.target.value,
      };
    }
    setUserData(data);
  };

  const handleSubmit = async () => {
    if (!isName) setIsError({ ...isError, name: "email should not be empty" });
    else if (!isPassword)
      setIsError({ ...isError, password: "password should not be empty" });
    else {
      setIsLoading(true);
      let encryptedPassword = encryptText(userData.password);
      let data: any = {
        ...userData,
        password: encryptedPassword,
      } as LoginUserData;
      const result: any = await handleRequest("POST", data, "/login");
      let isError = result.data.message;
      if (isError) {
        setIsLoading(false);
        toast.error(isError);
      } else {
        const { accessToken } = result.data;
        setIsLoading(false);
        document.cookie = `user=${accessToken}`;
        setData({ todos: [], isLoggedIn: true });
      }
    }
  };
  return (
    <>
      <LoginContainer>
        <Logo src={BookLogo} alt="logo" />
        <Typography>Login Form</Typography>
        <CustomTextField
          label="email"
          value={userData.name}
          onChange={(e) => handleData(e)}
          helperText={isName && Boolean(userData.name) ? "" : isError.name}
        />
        <CustomTextField
          label="password"
          value={userData.password}
          onChange={(e) => handleData(e, "password")}
          helperText={
            isPassword && Boolean(userData.password) ? "" : isError.password
          }
        />
        <Button
          variant="contained"
          style={{ width: "100px", height: "auto" }}
          onClick={handleSubmit}
        >
          {isLoading ? (
            <CircularProgress
              style={{ width: "20px", height: "auto" }}
              color="inherit"
            />
          ) : (
            "Login"
          )}
        </Button>
        <p>
          New user ? Create account <Link to={"/signup"}>here</Link>{" "}
        </p>
      </LoginContainer>
      <ToastContainer />
    </>
  );
};

export default Login;

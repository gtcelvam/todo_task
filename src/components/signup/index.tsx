import React, { ChangeEvent, useState } from "react";
import { CustomTextField, SignUpContainer, Logo } from "./signup-styled";
import { Button, CircularProgress, Typography } from "@mui/material";
import { encryptText, handleRequest } from "../../utils/helpers";
import TodoLogo from "../../assests/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { SignUpUserData } from "../../utils/types/user";
import { toast } from "react-toastify";

const SignUp = () => {
  //constructor
  const navigate = useNavigate();

  //state values
  const [userData, setUserData] = useState<SignUpUserData>({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [isError, setIsError] = useState<SignUpUserData>({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  //constants
  const isName = Boolean(userData.name.length);
  const isEmail = Boolean(userData.email.length);
  const isPassword = Boolean(userData.password.length);
  const isConfirm = Boolean(userData.confirm.length);

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
    } else if (type === "email") {
      data = {
        ...userData,
        email: e.target.value,
      };
    } else if (type === "password") {
      data = {
        ...userData,
        password: e.target.value,
      };
    } else {
      data = {
        ...userData,
        confirm: e.target.value,
      };
    }
    setUserData(data);
  };

  const handleSubmit = async () => {
    if (!isName)
      setIsError({ ...isError, name: "username should not be empty" });
    else if (!isEmail)
      setIsError({ ...isError, email: "Email should not be empty" });
    else if (!isPassword)
      setIsError({ ...isError, password: "password should not be empty" });
    else if (userData.password !== userData.confirm)
      setIsError({ ...isError, confirm: "password is not matching" });
    else {
      setIsLoading(true);
      let data: SignUpUserData = { ...userData };
      data.password = encryptText(userData.password);
      data.confirm = data.password;
      let result: any = await handleRequest("POST", data as any);
      if (result.data) {
        toast.success("Account Created Succesfully!");
        navigate("/login");
      } else {
        toast.error("Something went wrong..please try again");
      }
      setIsLoading(false);
    }
  };

  return (
    <SignUpContainer>
      <Logo src={TodoLogo} alt="logo" />
      <Typography>SignUp Form</Typography>
      <CustomTextField
        label="username"
        value={userData.name}
        onChange={(e) => handleData(e)}
        helperText={isName && Boolean(userData.name) ? "" : isError.name}
      />
      <CustomTextField
        label="email"
        value={userData.email}
        onChange={(e) => handleData(e, "email")}
        helperText={isEmail && Boolean(userData.name) ? "" : isError.email}
      />
      <CustomTextField
        label="password"
        value={userData.password}
        onChange={(e) => handleData(e, "password")}
        helperText={
          isPassword && Boolean(userData.password) ? "" : isError.password
        }
      />
      <CustomTextField
        label="confirm password"
        value={userData.confirm}
        onChange={(e) => handleData(e, "confirm")}
        helperText={
          userData.password === userData.confirm &&
          Boolean(userData.confirm.length)
            ? ""
            : isError.confirm
        }
      />
      <Button variant="contained" onClick={handleSubmit}>
        {isLoading ? (
          <CircularProgress
            style={{ width: "20px", height: "auto" }}
            color="inherit"
          />
        ) : (
          "Sign Up"
        )}
      </Button>
      <p>
        Already have an account ? <Link to={"/login"}>Login</Link>{" "}
      </p>
    </SignUpContainer>
  );
};

export default SignUp;

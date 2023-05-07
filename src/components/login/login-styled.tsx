import { Box, TextField, styled } from "@mui/material";

export const LoginContainer = styled(Box)(() => ({
  width: "100%",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "1rem",
}));

export const Logo = styled("img")(() => ({
  width: "100px",
  height: "auto",
}));

export const CustomTextField = styled(TextField)(() => ({}));

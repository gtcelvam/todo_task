import { Box, IconButton, styled } from "@mui/material";
import { Logout } from "@mui/icons-material";

namespace S {
  export const HeaderWrapper = styled(Box)({
    width: "100%",
    height: "5vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 10px",
    h1: {
      fontSize: "1rem",
    },
  });

  export const LogoutContainer = styled(IconButton)({});

  export const LogoutIcon = styled(Logout)({});
}

export default S;

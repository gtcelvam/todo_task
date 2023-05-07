import { Box, Divider, TextField, styled } from "@mui/material";
import { AddLocation, Done } from "@mui/icons-material";

namespace S {
  export const AddTodoContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== "isSubTodo",
  })(({ isSubTodo }: { isSubTodo?: boolean }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: isSubTodo ? "50px" : "-75px",
    gap: "0.5rem",
  }));

  export const AddIcon = styled(AddLocation, {
    shouldForwardProp: (prop) => prop !== "isSubTodo",
  })(({ isSubTodo }: { isSubTodo?: boolean }) => ({
    color: isSubTodo ? "#C70039" : "#3498DB",
    transform: "rotate(-90deg)",
    cursor: "pointer",
  }));

  export const TickIcon = styled(Done)({
    color: "green",
    cursor: "pointer",
  });

  export const CustomDivider = styled(Divider)({
    minWidth: "300px",
  });

  export const CustomTextField = styled(TextField)(() => ({
    minWidth: "300px",
  }));
}

export default S;

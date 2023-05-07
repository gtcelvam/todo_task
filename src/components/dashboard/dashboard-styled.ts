import { Box, Stack, styled } from "@mui/material";

namespace S {
  export const DashboardContainer = styled(Box)(() => ({
    width: "100%",
    height: "95vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  export const TodoWrapper = styled(Stack)(() => ({
    width: "50%",
    height: "300px",
    alignItems: "center",
    gap: "1rem",
  }));

  export const TodoContainer = styled(Stack)({
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  });

  export const TodoUL = styled("ul")({
    listStyleType: "none",
  });

  export const TodoList = styled("li", {
    shouldForwardProp: (prop) => prop !== "isSubTodo",
  })(({ isSubTodo }: { isSubTodo?: boolean }) => ({
    width: "340px",
    height: isSubTodo ? "25px" : "40px",
    background: isSubTodo ? "#C7003990" : "#3498DB",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "3px 0",
    marginLeft: isSubTodo ? "50px" : 0,
    borderRadius: "0.3rem",
  }));
}

export default S;

import S from "./dashboard-styled";
import { Typography } from "@mui/material";
import AddTodo from "../addTodo";
import React, { useContext } from "react";
import { ContextProvider } from "../provider";
import Header from "../header";

const Dashboad = () => {
  const {
    data: { todos },
  } = useContext(ContextProvider);

  const todoList = (item: any) => {
    let subTodo = item.sub;

    return (
      <React.Fragment key={item.id}>
        <S.TodoList>{item.title}</S.TodoList>
        {subTodo &&
          subTodo.map((element: any) => (
            <S.TodoList isSubTodo={true}>{element.title}</S.TodoList>
          ))}
        <AddTodo subTodo={item.id} isSubTodo={true} />
      </React.Fragment>
    );
  };

  return (
    <>
      <Header />
      <S.DashboardContainer>
        <S.TodoWrapper>
          <Typography>Todo List</Typography>
          <S.TodoUL>{todos && todos.map((item) => todoList(item))}</S.TodoUL>
          <S.TodoContainer>
            <AddTodo />
          </S.TodoContainer>
        </S.TodoWrapper>
      </S.DashboardContainer>
    </>
  );
};

export default Dashboad;

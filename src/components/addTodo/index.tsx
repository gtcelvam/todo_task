import React, { useState, ChangeEvent, useContext, KeyboardEvent } from "react";
import S from "./addTodo-styled";
import { ContextProvider } from "../provider";

type AddTodoProps = {
  subTodo?: number;
  isSubTodo?: boolean;
};

const AddTodo = ({ subTodo, isSubTodo }: AddTodoProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");

  const { data, setData } = useContext(ContextProvider);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    if (subTodo) {
      let newTodo = {
        id: Math.random(),
        title: value,
      };
      let todoResult = [...data.todos];
      let int = -1;
      data.todos.find((item, index) => {
        if (item.id === subTodo) int = index;
      });
      todoResult[int]?.sub?.push(newTodo);
      setData({ ...data, todos: todoResult });
    } else {
      let newTodo = {
        id: Math.random(),
        title: value,
        sub: [],
      };
      let updatedList = data.todos ? [...data.todos, newTodo] : [];
      setData({ ...data, todos: updatedList });
    }
    setIsOpen(false);
    setValue("");
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") handleClose();
  };

  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setValue(e.target.value);
  };

  return (
    <S.AddTodoContainer isSubTodo={isSubTodo}>
      {isOpen ? (
        <S.TickIcon onClick={handleClose} />
      ) : (
        <S.AddIcon isSubTodo={isSubTodo} onClick={handleOpen} />
      )}
      {isOpen ? (
        <S.CustomTextField
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
        />
      ) : (
        <S.CustomDivider dir="horizontal" />
      )}
    </S.AddTodoContainer>
  );
};

export default AddTodo;

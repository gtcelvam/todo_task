import { useState, ReactNode, createContext } from "react";

type ProviderProps = {
  children: ReactNode;
};

type todoType = {
  id: number;
  title: string;
  sub?: { id: number; title: string }[];
};

type userType = {
  isLoggedIn: boolean;
  todos: todoType[];
};

//constants
const initialValue: userType = {
  isLoggedIn: false,
  todos: [],
};

type UserContextType = {
  data: userType;
  setData(value?: any): void;
};
export const ContextProvider = createContext<UserContextType>({
  data: initialValue,
  setData: () => {},
});

const Provider = ({ children }: ProviderProps) => {
  const [data, setData] = useState(initialValue);
  return (
    <>
      <ContextProvider.Provider value={{ data, setData }}>
        {children}
      </ContextProvider.Provider>{" "}
    </>
  );
};

export default Provider;

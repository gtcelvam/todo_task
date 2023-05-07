import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import S from "./layout-styled";
import Login from "../login";
import SignUp from "../signup";
import Dashboad from "../dashboard";
import { ContextProvider } from "../provider";
import { handleUserRequest } from "../../utils/helpers";

const Layout = () => {
  //constants
  const { data, setData } = useContext(ContextProvider);
  const isLoggedIn = data.isLoggedIn;

  useEffect(() => {
    let token = document.cookie.split("=")[1];
    if (Boolean(token)) {
      const authUser = async () => {
        let result = await handleUserRequest(token);
        result?.data.isUser && setData({ isLoggedIn: true, todos: [] });
      };
      authUser();
    }
  }, []);

  return (
    <S.LayoutContainer>
      <Router>
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Dashboad /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={isLoggedIn ? <Navigate to="/" /> : <SignUp />}
          />
        </Routes>
      </Router>
    </S.LayoutContainer>
  );
};

export default Layout;

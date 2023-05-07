import React, { useContext } from "react";
import S from "./header-styled";
import { ContextProvider } from "../provider";

const Header = () => {
  const { data, setData } = useContext(ContextProvider);
  const handleLogout = () => {
    document.cookie = 'user="" expires=Thu, 18 Dec 2013 12:00:00 UTC;';
    setData({ ...data, isLoggedIn: false });
  };

  return (
    <S.HeaderWrapper>
      <h1>Todo Task</h1>
      <S.LogoutContainer onClick={handleLogout}>
        <S.LogoutIcon />
      </S.LogoutContainer>
    </S.HeaderWrapper>
  );
};

export default Header;

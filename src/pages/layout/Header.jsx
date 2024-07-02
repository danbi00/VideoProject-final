import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { HiMoon, HiSun } from "react-icons/hi";
import { useDarkMode } from "../../context/DarkModeContext";

const Header = () => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useDarkMode();

  const goHome = () => {
    navigate(`/`);
  };

  const goPhoto = () => {
    navigate(`/photoedit`);
  };

  const goLogin = () => {
    navigate(`/login`);
  };

  return (
    <>
      <StContainer>
        <StLogo onClick={goHome}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKRNYYKGC0OV6Cyy3u5TbiZbJYCoJilfkjbA&s" alt="MYAPP Logo"/>
        </StLogo>
        <StNav>
          <StGnbLists>
            <GnbItem onClick={goHome}>비디오 편집</GnbItem>
            <GnbItem onClick={goPhoto}>이미지 편집</GnbItem>
            <GnbItem onClick={goLogin}>로그인</GnbItem>
          </StGnbLists>
        </StNav>

        <StToggleButton onClick={toggleDarkMode}>
          {!darkMode && <HiMoon />}
          {darkMode && <HiSun />}
        </StToggleButton>
      </StContainer>
    </>
  );
};

export default Header;

const StContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 64px;
  align-items: center;
  border-bottom: 5px outset #87CEEB;
`;

const StLogo = styled.div`
  cursor: pointer;
  img {
    height: 62px;
    width: auto;
  }
`;

const StNav = styled.nav`
  display: flex;
`;

const StGnbLists = styled.ul`
  list-style: none;
  display: flex;
  color: var(--main-font-color);
`;

const GnbItem = styled.li`
  display: inline-block;
  cursor: pointer;
  margin-left: 20px;
  height: 22px;

  &:hover {
    color: #000;
    border-bottom: solid 3px gray;
  }
`;

const StToggleButton = styled.button`
  position: absolute;
  right: 20%;
  top: 8%;
  font-size: 1.5rem;
  cursor: pointer;
  background-color: transparent;
  color: var(--main-font-color);
  transition: all 150ms ease-out;
  margin-left: 5px;
  border: none;

  &:hover {
    transform: scale(1.5);
    color: orange;
  }
`;

import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { DarkModeProvider } from "../../context/DarkModeContext";

const LayOut = () => {
  return (
    <>
      <DarkModeProvider>
        <StLine />
        <StContainer>
          <Header />
          <Outlet />
        </StContainer>
        <StFooterLine>
          <StContainer>
            <Footer />
          </StContainer>
        </StFooterLine>
      </DarkModeProvider>
    </>
  );
};

export default LayOut;

const StContainer = styled.div`
  width: 60vw;
  margin: 0 auto;
  flex-direction: column;
  @media all and (max-width: 600px) {
    width: 90vw;
  }
`;

const StLine = styled.div`
  width: 100vw;
  position: absolute;
  top: 63px;
  border-bottom: 1px solid var(--main-line-color);
`;

const StFooterLine = styled.div`
  width: 100%;
  height: 80px;
  position: fixed;
  bottom: 0;
  background-color: #5f83a3; 
  display: flex;
  justify-content: center;
  align-items: center;
`;
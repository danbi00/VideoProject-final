import React from "react";
import styled from "styled-components";
import VideoEditor from "../component/VideoEditor";

const MainPage = () => {
  return (
    <StContainer>
      <VideoEditor />
    </StContainer>
  );
};

export default MainPage;

const StContainer = styled.div`
  width: 60vw;
  /* height: 85vh; */
  margin: 0 auto;
`;
import React, { useState } from "react";
import styled from "styled-components";
import { BiImage } from "react-icons/bi"; 

const PhotoEdit = () => {
  const [image, setImage] = useState(null);
  const [brightness, setBrightness] = useState(100);
  const [width, setWidth] = useState(300);

  // 이미지 업로드 핸들러
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // 밝기 조절 핸들러
  const handleBrightnessChange = (e) => {
    const value = parseInt(e.target.value);
    setBrightness(value);
  };

  // 크기 조절 핸들러
  const handleWidthChange = (e) => {
    const value = parseInt(e.target.value);
    setWidth(value);
  };

  // 이미지 저장 핸들러
  const handleSaveImage = () => {
    const downloadLink = document.createElement("a");
    downloadLink.href = image;
    downloadLink.download = "edited_image.png"; 
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <Container>
      <Title>
        <BiImage style={{ marginRight: "10px" }} />
        이미지 편집기
      </Title>
      <UploadInput type="file" onChange={handleImageUpload} accept="image/*" />
      
      {image && (
        <ImageContainer>
          <StyledImage src={image} style={{ width: `${width}px`, filter: `brightness(${brightness}%)` }} />
        </ImageContainer>
      )}

      <Controls>
        <label>
          크기 조절:
          <input type="range" min="100" max="600" value={width} onChange={handleWidthChange} />
        </label>
        <label>
          밝기 조절:
          <input type="range" min="0" max="200" value={brightness} onChange={handleBrightnessChange} />
        </label>
      </Controls>

      <Button onClick={handleSaveImage}>이미지 저장</Button>
    </Container>
  );
};

export default PhotoEdit;

const Container = styled.div`
  width: 100%;
  height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  display: flex;
  align-items: center;
`;

const UploadInput = styled.input`
  margin-bottom: 20px;
`;

const ImageContainer = styled.div`
  margin: 20px 0;
`;

const StyledImage = styled.img`
  max-width: 100%;
  border-radius: 8px;
`;

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  label {
    margin: 10px 0;
    font-size: 14px;
  }

  input[type="range"] {
    width: 80%;
  }
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 12px 24px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;
import React, { useRef, useState } from "react";
import { Button } from "antd";
import wide_video_placeholder from "../assets/images/editor/default_upload.png";
import "./VideoUpload.css"; 

export const VideoUpload = () => {
  const [videoFile, setVideoFile] = useState();
  const uploadFile = useRef("");

  return (
    <>
      <div className="st-video-area">
        <div>
          <input
            onChange={(e) => setVideoFile(e.target.files[0])}
            type="file"
            accept="video/*"
            style={{ display: "none" }}
            ref={uploadFile}
          />
          <img
            className="st-video-img"
            onClick={() => uploadFile.current.click()}
            src={wide_video_placeholder}
            alt="비디오를 업로드해주세요."
          />
        </div>
      </div>
      <div className="st-video-btn">
        <input
          onChange={(e) => setVideoFile(e.target.files[0])}
          type="file"
          accept="video/*"
          style={{ display: "none" }}
          ref={uploadFile}
        />
        <Button
          onClick={() => uploadFile.current.click()}
          style={{ width: 600, height: 30 }}
        >
          비디오 업로드하기
        </Button>
      </div>
    </>
  );
};
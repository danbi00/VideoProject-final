import React, { useEffect, useRef, useState } from "react";
import { Button } from "antd";
import { createFFmpeg } from "@ffmpeg/ffmpeg";
import VideoPlayer from "./VideoPlayer";
import { sliderValueToVideoTime } from "../utils/utils";
import MultiRangeSlider from "./MultiRangeSlider";
import VideoConversionButton from "./VideoConversionButton";
import { Spinner, Modal, ToastContainer, Toast } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import "./VideoEditor.css";

const ffmpeg = createFFmpeg({ log: true });

const VideoEditor = () => {
  const [ffmpegLoaded, setFFmpegLoaded] = useState(false);
  const [videoFile, setVideoFile] = useState();
  const uploadFile = useRef("");

  const [videoPlayerState, setVideoPlayerState] = useState();
  const [videoPlayer, setVideoPlayer] = useState();
  const [sliderValues, setSliderValues] = useState([0, 100]);
  const [processing, setProcessing] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // FFmpeg 로드 여부를 확인하는 useEffect 훅
    if (!ffmpeg.isLoaded()) {
      ffmpeg.load().then(() => {
        setFFmpegLoaded(true);
      });
    } else {
      setFFmpegLoaded(true);
    }
  }, []);

  useEffect(() => {
    // 비디오 파일이 설정된 경우 슬라이더 값을 기반으로 비디오를 시크
    if (videoFile) {
      const min = sliderValues[0];
     // console.log("Slider min value:", min);

      if (min !== undefined && videoPlayerState && videoPlayer && isFinite(min)) {
        const minTime = sliderValueToVideoTime(videoPlayerState.duration, min);
        // console.log("Seeking to minTime:", minTime);
        if (isFinite(minTime)) {
          videoPlayer.seekTo(minTime, 'seconds');
        }
      }
    }
  }, [sliderValues, videoPlayerState, videoPlayer, videoFile]);

  useEffect(() => {
    // 비디오 파일과 플레이어 상태를 기반으로 비디오를 시크
    if (videoFile && videoPlayer && videoPlayerState) {
      const [min, max] = sliderValues;

      const minTime = sliderValueToVideoTime(videoPlayerState.duration, min);
      const maxTime = sliderValueToVideoTime(videoPlayerState.duration, max);

      // console.log("Min time:", minTime, "Max time:", maxTime);

      if (isFinite(minTime) && isFinite(maxTime)) {
        if (videoPlayerState.playedSeconds < minTime) {
          videoPlayer.seekTo(minTime, 'seconds');
        }
        if (videoPlayerState.playedSeconds > maxTime) {
          videoPlayer.seekTo(maxTime, 'seconds');
        }
      }
    }
  }, [videoPlayerState, videoPlayer, sliderValues, videoFile]);

  useEffect(() => {
    // 비디오 파일이 없을 때 상태 초기화
    if (!videoFile) {
      setVideoPlayerState(undefined);
    }
    setSliderValues([0, 100]);
  }, [videoFile]);

  if (!ffmpegLoaded) return <div>Loading...</div>;
  return (
    <div className="video-editor-container">
      <div className="video-editor-title-area">
        <h2 className="video-editor-title">Video Editor</h2>
        {videoFile && (
          <div>
            <input
              onChange={(e) => setVideoFile(e.target.files[0])}
              type="file"
              accept="video/*"
              style={{ display: "none" }}
              ref={uploadFile}
            />
            <Button className="video-editor-button" onClick={() => uploadFile.current.click()}>
              비디오 재선택
            </Button>
          </div>
        )}
      </div>
      <div className="video-editor-video-section">
        {videoFile ? (
          <VideoPlayer
            src={videoFile}
            onPlayerChange={(videoPlayer) => {
              setVideoPlayer(videoPlayer);
            }}
            onChange={(videoPlayerState) => {
              setVideoPlayerState(videoPlayerState);
            }}
            style={{ height: 500 }}
          />
        ) : (
          <>
            <div className="video-editor-video-area">
              <div>
                <input
                  onChange={(e) => setVideoFile(e.target.files[0])}
                  type="file"
                  accept="video/*"
                  style={{ display: "none" }}
                  ref={uploadFile}
                />
                <img
                  className="video-editor-video-img"
                  onClick={() => uploadFile.current.click()}
                  src={require("../assets/images/editor/default_upload.png")}
                  alt="비디오를 업로드해주세요."
                />
              </div>
            </div>
            <div className="video-editor-video-btn">
              <input
                onChange={(e) => setVideoFile(e.target.files[0])}
                type="file"
                accept="video/*"
                style={{ display: "none" }}
                ref={uploadFile}
              />
              <Button
                className="video-editor-upload-button"
                onClick={() => uploadFile.current.click()}
                style={{ width: 600, height: 70 }}
              >
                비디오 업로드하기
              </Button>
            </div>
          </>
        )}
      </div>

      {videoFile && (
        <>
          <div className="video-editor-slider-section">
            <MultiRangeSlider
              min={0}
              max={100}
              onChange={({ min, max }) => {
                setSliderValues([min, max]);
              }}
            />
          </div>

          <section>
            <VideoConversionButton
              onConversionStart={() => {
                setProcessing(true);
              }}
              onConversionEnd={() => {
                setProcessing(false);
                setShow(true);
              }}
              ffmpeg={ffmpeg}
              videoPlayerState={videoPlayerState}
              sliderValues={sliderValues}
              videoFile={videoFile}
            />
          </section>
        </>
      )}
      <ToastContainer
        className="p-3"
        position="top-center"
        style={{ display: "flex", justifyContent: "center", zIndex: 3 }}
      >
        <Toast
          onClose={() => setShow(false)}
          show={show}
          delay={2000}
          bg="dark"
          autohide
        >
          <Toast.Header closeButton={false}>
            <strong className="me-auto">Video Editor</strong>
          </Toast.Header>
          <Toast.Body>내보내기가 완료되었습니다.</Toast.Body>
        </Toast>
      </ToastContainer>

      <Modal
        show={processing}
        onHide={() => setProcessing(false)}
        backdrop={false}
        keyboard={false}
        centered
        size="sm"
      >
        <div style={{ textAlign: "center" }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>

          <p
            style={{
              marginTop: 16,
              fontSize: 14,
              fontWeight: 600,
              color: "#c8c8c8",
            }}
          >
            내보내기가 진행중입니다.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default VideoEditor;
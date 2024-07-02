import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';

export function VideoPlayer({ src, onPlayerChange = () => {}, onChange = () => {}, startTime = undefined }) {
  const [source, setSource] = useState();
  const playerRef = useRef(null);

  useEffect(() => {
    // 비디오 소스를 설정하는 useEffect 훅
    if (src instanceof Blob) {
      const objectUrl = URL.createObjectURL(src);
      setSource(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (typeof src === 'string') {
      setSource(src);
    } else {
      console.error('src is not a valid Blob or URL string');
    }
  }, [src]);

  useEffect(() => {
    // startTime이 유효한지 확인하고, 유효한 경우 비디오를 해당 위치로 이동
    if (startTime !== undefined && playerRef.current && isFinite(startTime)) {
      console.log("Setting start time:", startTime);
      playerRef.current.seekTo(startTime, 'seconds');
    }
  }, [startTime]);

  const handleProgress = (state) => {
    // 비디오의 진행 상태를 업데이트하고 로깅
    //console.log("Progress state:", state);//   
    if (onChange) {
      onChange(state);
    }
  };

  const handleDuration = (duration) => {
    // 비디오의 전체 길이를 업데이트하고 로깅
    //console.log("Video duration:", duration);//
    onChange((prevState) => ({ ...prevState, duration }));
  };

  return (
    <div className="video-player" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <ReactPlayer
        ref={playerRef}
        url={source}
        controls
        width="80%"
        height="80%"
        onProgress={handleProgress}
        onDuration={handleDuration}
        onReady={() => onPlayerChange(playerRef.current)}
      />
    </div>
  );
}

export default VideoPlayer;
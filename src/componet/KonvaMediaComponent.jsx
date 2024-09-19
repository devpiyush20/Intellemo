import React, { useEffect, useRef, useState } from 'react';
import Konva from 'konva';
import Display from './Display';

const KonvaVideoComponent = () => {
  const containerRef = useRef(null);
  const [videoNode, setVideoNode] = useState(null);
  const [stage, setStage] = useState(null);
  const [layer, setLayer] = useState(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const newStage = new Konva.Stage({
      container: containerRef.current,
      width: 500,
      height: 500,
    });

    const newLayer = new Konva.Layer();
    newStage.add(newLayer);

    setStage(newStage);
    setLayer(newLayer);

    return () => {
      newStage.destroy();
    };
  }, []);

  useEffect(() => {
    if (!stage || !layer) return;

  
    const video = document.createElement('video');
    video.src = 'https://www.w3schools.com/html/mov_bbb.mp4';
    video.width = 400;
    video.height = 300;
    video.autoplay = false;
    video.controls = false;

    video.addEventListener('loadedmetadata', () => {
      const newVideoNode = new Konva.Image({
        x: 50,
        y: 50,
        image: video,
        width: video.width,
        height: video.height,
        draggable: true,
      });

      layer.add(newVideoNode);
      layer.draw();
      setVideoNode(newVideoNode);
    });

    return () => {
      video.remove();
    };
  }, [stage, layer]);

  const playPauseVideo = () => {
    if (videoNode) {
      const video = videoNode.image();
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
  };

  const stopVideo = () => {
    if (videoNode) {
      const video = videoNode.image();
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <div>
      <button onClick={playPauseVideo}>
        {videoNode && videoNode.image().paused ? 'Play Video' : 'Pause Video'}
      </button>
      <button onClick={stopVideo}>
        Stop Video
      </button>
      <Display ref={containerRef}/>
    </div>
  );
};

export default KonvaVideoComponent;

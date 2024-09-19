import React, { useEffect, useRef, useState } from "react";
import Konva from "konva";

import './KonvaCanvasComponent.css'
const KonvaCanvasComponent = () => {
  const containerRef = useRef(null);
  const [stage, setStage] = useState(null);
  const [imageNodes, setImageNodes] = useState([]);
  const [textNode, setTextNode] = useState(null);
  const [videoNode, setVideoNode] = useState(null);
  const [inputText, setInputText] = useState("");

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

    
    return () => {
      newStage.destroy();
    };
  }, []);

  const addImage = (src) => {
    if (!stage) return;

    const layer = stage.findOne("Layer");

    const image = new window.Image();
    image.src = src;
    image.onload = () => {
      const imageNode = new Konva.Image({
        x: 50,
        y: 50,
        image: image,
        width: 200,
        height: 200,
        draggable: true,
      });

      const transformer = new Konva.Transformer({
        nodes: [imageNode],
        enabledAnchors: [
          "top-left",
          "top-right",
          "bottom-left",
          "bottom-right",
        ],
        boundBoxFunc: (oldBox, newBox) => {
          if (newBox.width < 50 || newBox.height < 50) {
            return oldBox;
          }
          return newBox;
        },
      });

      layer.add(imageNode);
      layer.add(transformer);
      layer.draw();

      setImageNodes((nodes) => [...nodes, imageNode]);
    };
  };

  const removeImage = () => {
    if (!stage || imageNodes.length === 0) return;

    const layer = stage.findOne("Layer");
    const lastImageNode = imageNodes[imageNodes.length - 1];

    lastImageNode.destroy();
    layer.draw();

    setImageNodes((nodes) => nodes.slice(0, -1));
  };

  const addText = () => {
    if (!stage || !inputText.trim()) return;

    const layer = stage.findOne("Layer");

    const text = new Konva.Text({
      x: 50,
      y: 300,
      text: inputText,
      fontSize: 24,
      draggable: true,
    });

    const transformer = new Konva.Transformer({
      nodes: [text],
      enabledAnchors: ["top-left", "top-right", "bottom-left", "bottom-right"],
      boundBoxFunc: (oldBox, newBox) => {
        if (newBox.width < 50 || newBox.height < 20) {
          return oldBox;
        }
        return newBox;
      },
    });

    layer.add(text);
    layer.add(transformer);
    layer.draw();

    setTextNode(text);
  };

  const removeText = () => {
    if (!stage || !textNode) return;

    const layer = stage.findOne("Layer");
    textNode.destroy();
    layer.draw();

    setTextNode(null);
  };

  const addVideo = () => {
    if (!stage) return;

    const layer = stage.findOne("Layer");

    const video = document.createElement("video");
    video.src = "https://www.w3schools.com/html/mov_bbb.mp4"; 
    video.width = 400;
    video.height = 300;
    video.autoplay = false;
    video.controls = false;

    video.addEventListener("loadedmetadata", () => {
      const videoKonvaNode = new Konva.Image({
        x: 50,
        y: 400,
        image: video,
        width: video.width,
        height: video.height,
        draggable: true,
      });

      layer.add(videoKonvaNode);
      layer.draw();
      setVideoNode(videoKonvaNode);
    });

    return () => {
      video.remove();
    };
  };

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

  
  const moveText = (direction) => {
    if (!textNode) return;

    const step = 10; 
    const layer = stage.findOne("Layer");

    switch (direction) {
      case "up":
        textNode.y(textNode.y() - step);
        break;
      case "down":
        textNode.y(textNode.y() + step);
        break;
      case "left":
        textNode.x(textNode.x() - step);
        break;
      case "right":
        textNode.x(textNode.x() + step);
        break;
      default:
        break;
    }

    layer.batchDraw();
  };

  return (
    <div className="containerBox">
      <div className="buttonContainer">
        <button onClick={() => addImage("https://konvajs.org/assets/lion.png")}>
          Add Image
        </button>
        <button onClick={removeImage} disabled={imageNodes.length === 0}>
          Remove Last Image
        </button>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text"
        />
        <button onClick={addText} disabled={!inputText.trim()}>
          Add Text
        </button>
        <button onClick={removeText} disabled={!textNode}>
          Remove Text
        </button>
        <button onClick={addVideo}>Add Video</button>
        <button onClick={playPauseVideo} disabled={!videoNode}>
          {videoNode && videoNode.image().paused ? "Play Video" : "Pause Video"}
        </button>
        <button onClick={stopVideo} disabled={!videoNode}>
          Stop Video
        </button>
        <div>
          <button onClick={() => moveText("up")} disabled={!textNode}>
            Move Up
          </button>
          <button onClick={() => moveText("down")} disabled={!textNode}>
            Move Down
          </button>
          <button onClick={() => moveText("left")} disabled={!textNode}>
            Move Left
          </button>
          <button onClick={() => moveText("right")} disabled={!textNode}>
            Move Right
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        style={{
          border: "1px solid black",
          width: "500px",
          height: "500px",
          marginTop: "10px",
        }}
      ></div>
    </div>
  );
};

export default KonvaCanvasComponent;

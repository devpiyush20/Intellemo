import React, { useEffect, useRef, useState } from 'react';
import Konva from 'konva';
import Display from './Display';

const KonvaImageComponent = () => {
  const containerRef = useRef(null);
  const [stage, setStage] = useState(null);
  const [imageNodes, setImageNodes] = useState([]);

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

    const layer = stage.findOne('Layer');

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
        enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
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

    const layer = stage.findOne('Layer');
    const lastImageNode = imageNodes[imageNodes.length - 1];

    lastImageNode.destroy(); 
    layer.draw();

    
    setImageNodes((nodes) => nodes.slice(0, -1));
  };

  return (
    <div>
      <button onClick={() => addImage('https://konvajs.org/assets/lion.png')}>
        Add Image
      </button>
      <button onClick={removeImage} disabled={imageNodes.length === 0}>
        Remove Last Image
      </button>
      <Display ref={containerRef}/>
    </div>
  );
};

export default KonvaImageComponent;

import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Text, Transformer } from 'konva';
import Display from './Display';

const KonvaTextComponent = () => {

  const containerRef = useRef(null);
  
  
  const [textNode, setTextNode] = useState(null);
  const [showText, setShowText] = useState(false);
  const [text, setText] = useState('type Text');
  const [stage, setStage] = useState(null);
  const [transformer, setTransformer] = useState(null);

  useEffect(() => {
    if (!containerRef.current) return;

  
    const newStage = new Stage({
      container: containerRef.current,
      width: 500,
      height: 500,
    });

    const layer = new Layer();
    newStage.add(layer);
    setStage(newStage);

   
    return () => {
      newStage.destroy();
    };
  }, []);

  useEffect(() => {
    if (!stage) return;

    const layer = stage.findOne('Layer');

    if (showText) {
      
      const newTextNode = new Text({
        x: 100,
        y: 100,
        text: text, 
        fontSize: 30,
        fontFamily: 'Arial',
        fill: 'black',
        draggable: true,
      });

  
      const newTransformer = new Transformer({
        nodes: [newTextNode],
        enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
        boundBoxFunc: (oldBox, newBox) => {
          if (newBox.width < 50 || newBox.height < 50) {
            return oldBox;
          }
          return newBox;
        },
      });

      layer.add(newTextNode);
      layer.add(newTransformer);
      layer.draw();

      
      setTextNode(newTextNode);
      setTransformer(newTransformer);
    } else if (textNode) {
    
      textNode.destroy();
      transformer.destroy();
      layer.draw();
      setTextNode(null);
      setTransformer(null);
    }
  }, [showText, stage, text]);

  const handleButtonClick = () => {
    setShowText((prevShowText) => !prevShowText);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <input 
        type="text" 
        value={text} 
        onChange={handleTextChange} 
        placeholder="Enter text here" 
        style={{ marginBottom: '10px', width: '100%' }}
      />
      <button onClick={handleButtonClick}>
        {showText ? 'Remove Text' : 'Add Text'}
      </button>
      <Display ref={containerRef}/>
    </div>
  );
};

export default KonvaTextComponent;

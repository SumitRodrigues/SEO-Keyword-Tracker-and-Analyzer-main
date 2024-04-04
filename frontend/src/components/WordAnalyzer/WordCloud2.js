import React, { useEffect, useRef } from 'react';
import WordCloud from 'wordcloud';

const TextSphere = ({ data }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!data) {
      return;
    }

    // Prepare the words array from data
    const words = Object.entries(data).map(([word, count]) => [word, count]);

    if (canvasRef.current) {
      WordCloud(canvasRef.current, { 
        list: words,
        gridSize: 16,
        weightFactor: 3,
        fontFamily: 'Finger Paint, cursive, sans-serif',
        color: 'random-dark',
        rotateRatio: 0,
        rotationSteps: 2,
        backgroundColor: '#FFE4B5',
        // shape: 'star' or any other shape
      });
    }
  }, [data]); // Redraw cloud when data changes

  return (
    <canvas ref={canvasRef} width="600" height="600" />
  );
};

export default TextSphere;

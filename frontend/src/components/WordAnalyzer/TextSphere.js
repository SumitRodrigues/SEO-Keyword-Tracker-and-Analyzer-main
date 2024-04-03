import React, { useEffect } from 'react';
import TagCloud from 'TagCloud';
import './TextSphere.css';

const TextSphere = ({ data }) => {
  if (!data || typeof data !== 'object') {
    return <div>Loading...</div>;
  }

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  useEffect(() => {
    const container = '.tagcloud';
    const entries = Object.entries(data);
    const top50Words = entries
      .sort((a, b) => b[1] - a[1])
      .slice(0, 50)
      .map(([word]) => word);

    TagCloud(container, top50Words, {
      radius: 300,
      maxSpeed: 'fast',
      initSpeed: 'fast',
      direction: 135,
      keep: true
    });

    const tags = document.querySelectorAll('.tagcloud span');
    tags.forEach(tag => {
      tag.style.color = getRandomColor();
    });

    // This function will be called when the component is unmounted
    return () => {
      const tagCloudContainer = document.querySelector(container);
      if (tagCloudContainer) {
        tagCloudContainer.innerHTML = '';
      }
    };
  }, [data]);

  return (
    <div className='text-sphere'>
      <span className='tagcloud'></span>
    </div>
  );
};

export default TextSphere;

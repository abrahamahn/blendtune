'use client';
import React, { useEffect, useState } from 'react';

const Terms: React.FC = () => {
  const [htmlContent, setHtmlContent] = useState<string>('');

  useEffect(() => {
    // Fetch the HTML file (You can also use other methods to load the file)
    fetch('/html/terms.html') // Make sure to adjust the path based on your project structure
      .then(response => response.text())
      .then(data => {
        setHtmlContent(data);
      });
  }, []);

  return (
    <div className='flex justify-center items-center'>
      <div className='w-4/5 p-10 mt-16 text-black dark:text-white rounded-lg'>
        <div
          className='w-full overflow-scroll z-auto'
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        ></div>
      </div>
    </div>
  );
};

export default Terms;

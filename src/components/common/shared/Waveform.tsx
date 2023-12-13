import React, { useEffect, useRef, useState } from 'react';

interface WaveformProps {
  audioUrl: string; // Define the type of audioUrl as a string
  barColor: string;
  amplitude: number;
}

const Waveform: React.FC<WaveformProps> = ({
  audioUrl,
  barColor,
  amplitude,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);

  useEffect(() => {
    const fetchDataAndDecode = async () => {
      try {
        const response = await fetch(audioUrl);
        const arrayBuffer = await response.arrayBuffer();

        // Check for webkitAudioContext first, and fallback to AudioContext
        const audioContext = new AudioContext();
        const buffer = await audioContext.decodeAudioData(arrayBuffer);
        setAudioBuffer(buffer);
      } catch (error) {
        console.error('Error loading audio:', error);
      }
    };

    if (!audioBuffer) {
      fetchDataAndDecode();
    }
  }, [audioUrl, audioBuffer]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const numBars = 65; // Number of bars
    const amp = canvas.height / 4;
    const data = audioBuffer ? audioBuffer.getChannelData(0) : [];

    if (!data.length) {
      return; // Wait for audio data to be ready
    }

    canvas.width = 300; // Adjust as needed
    canvas.height = 40; // Adjust as needed
    const barWidth = Math.ceil(data.length / numBars);

    const drawBars = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < numBars; i++) {
        let sum = 0;
        const startSample = i * barWidth;
        const endSample = (i + 1) * barWidth;

        for (let j = startSample; j < endSample; j += 15) {
          sum += Math.abs(data[j]); // Sample every 10th data point
        }

        const averageAmplitude = sum / (barWidth / 10);
        const barHeight = averageAmplitude * amp * amplitude;

        const x = i * (canvas.width / numBars);
        const y = (canvas.height - barHeight) / 2;

        context.fillStyle = barColor;
        context.fillRect(x, y, 1, barHeight);
      }
    };

    drawBars();
  }, [audioBuffer, amplitude, barColor]);

  return (
    <div className='relative h-8 justify-center items-center'>
      <canvas
        ref={canvasRef}
        className='w-full h-8 justify-center items-center'
      />
    </div>
  );
};

export default Waveform;

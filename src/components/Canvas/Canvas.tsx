import Box from '@mui/material/Box';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Tools } from '../../constants';
import canvasService from '../../utils/CanvasService';
import CanvasPanel from '../CanvasPanel';
import classes from './Canvas.module.css';

const Canvas: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<Tools | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      canvasService.setCanvas(canvasRef.current);
    }
  }, [canvasRef]);

  const selectTool = useCallback((tool: Tools) => {
    setSelectedTool(tool);
  }, []);

  const startDrawing = (event: React.MouseEvent) => {
    const { offsetX, offsetY } = event.nativeEvent;

    setIsDrawing(true);

    if (selectedTool) {
      canvasService.startDrawing(selectedTool, {
        x: offsetX,
        y: offsetY
      });
    }
  };

  const finishDrawing = () => {
    setIsDrawing(false);
  };

  const draw = (event: React.MouseEvent) => {
    if (!isDrawing) {
      return;
    }

    if (!selectedTool) {
      return;
    }

    const { offsetX, offsetY } = event.nativeEvent;

    canvasService.draw(selectedTool, { x: offsetX, y: offsetY });
  };

  return (
    <Box margin={2} className={classes.box}>
      <CanvasPanel selectTool={selectTool} selected={selectedTool} />
      <canvas
        width="1000px"
        height="600px"
        style={{ border: '1px solid black' }}
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
      />
    </Box>
  );
};

export default Canvas;

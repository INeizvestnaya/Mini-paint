import { INITIAL_COLOR, Tools } from '../constants';
import { Color } from '../types';

interface Coordinates {
  x: number;
  y: number;
}

class CanvasService {
  canvas: HTMLCanvasElement | null = null;

  context: CanvasRenderingContext2D | null = null;

  snapshot: ImageData | undefined | null = null;

  startPosition: Coordinates = { x: 0, y: 0 };

  offset: Coordinates = { x: 0, y: 0 };

  size: number = 0;

  color: Color = INITIAL_COLOR;

  lineWidth: number = 3;

  computeSize() {
    this.size = Math.sqrt(
      (this.offset.x - this.startPosition.x) ** 2 +
        (this.offset.y - this.startPosition.y) ** 2
    );
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    if (canvas) {
      this.context = canvas.getContext('2d', { willReadFrequently: true });
      if (this.context) {
        this.context.lineWidth = this.lineWidth;
        this.context.lineCap = 'round';

        this.context.fillStyle = '#ffffff';
        this.context.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }

  changeColor(color: Color) {
    this.color = color;

    if (this.context) {
      this.context.strokeStyle = this.color;
    }
  }

  changeLineWidth(width: number) {
    this.lineWidth = width;

    if (this.context) {
      this.context.lineWidth = this.lineWidth;
    }
  }

  drawWithPen() {
    this.context?.lineTo(this.offset.x, this.offset.y);
  }

  drawLine() {
    this.context?.moveTo(this.startPosition.x, this.startPosition.y);
    this.context?.lineTo(this.offset.x, this.offset.y);
  }

  drawCircle() {
    this.context?.arc(
      this.startPosition.x,
      this.startPosition.y,
      this.size,
      0,
      2 * Math.PI
    );
  }

  drawTriangle() {
    this.context?.moveTo(this.startPosition.x, this.startPosition.y);
    this.context?.lineTo(this.offset.x, this.offset.y);
    this.context?.lineTo(
      this.startPosition.x * 2 - this.offset.x,
      this.offset.y
    );
    this.context?.closePath();
    this.context?.stroke();
  }

  drawRect() {
    this.context?.strokeRect(
      this.offset.x,
      this.offset.y,
      this.startPosition.x - this.offset.x,
      this.startPosition.y - this.offset.y
    );
  }

  drawPentagon() {
    const step = (2 * Math.PI) / 5;
    const shift = (Math.PI / 180.0) * -18;

    for (let i = 0; i <= 5; i += 1) {
      const curStep = i * step + shift;
      this.context?.lineTo(
        this.startPosition.x + this.size * Math.cos(curStep),
        this.startPosition.y + this.size * Math.sin(curStep)
      );
    }
  }

  drawStar() {
    let rot = (Math.PI / 2) * 3;
    const step = Math.PI / 5;
    const { x: startX, y: startY } = this.startPosition;

    this.context?.moveTo(startX, startY - this.size);

    for (let i = 0; i < 5; i += 1) {
      let x = startX + Math.cos(rot) * this.size;
      let y = startY + Math.sin(rot) * this.size;
      this.context?.lineTo(x, y);
      rot += step;

      x = startX + (Math.cos(rot) * this.size) / 2;
      y = startY + (Math.sin(rot) * this.size) / 2;
      this.context?.lineTo(x, y);
      rot += step;
    }

    this.context?.lineTo(startX, startY - this.size);

    this.context?.closePath();
    this.context?.stroke();
  }

  startDrawing(shape: Tools, startPosition: Coordinates) {
    this.context?.beginPath();

    this.snapshot = this.context?.getImageData(
      0,
      0,
      this.canvas?.width || 1,
      this.canvas?.height || 1
    );

    this.startPosition = startPosition;

    if (shape === Tools.ERASER && this.context) {
      this.context.strokeStyle = '#ffffff';
    } else if (this.context) {
      this.context.strokeStyle = this.color;
    }
  }

  // eslint-disable-next-line consistent-return
  draw(shape: Tools, offset: Coordinates) {
    this.offset = offset;
    this.computeSize();

    if (this.snapshot) {
      this.context?.putImageData(this.snapshot, 0, 0);
    }

    if (shape !== Tools.PEN && shape !== Tools.ERASER) {
      this.context?.beginPath();
    }

    switch (shape) {
      case Tools.PEN:
      case Tools.ERASER:
        this.drawWithPen();
        break;
      case Tools.LINE:
        this.drawLine();
        break;
      case Tools.CIRCLE:
        this.drawCircle();
        break;
      case Tools.TRIANGLE:
        this.drawTriangle();
        break;
      case Tools.RECT:
        this.drawRect();
        break;
      case Tools.PENTAGON:
        this.drawPentagon();
        break;
      case Tools.STAR:
        this.drawStar();
        break;
      default: {
        const exhaustiveCheck: never = shape;
        return exhaustiveCheck;
      }
    }

    this.context?.stroke();
  }
}

const canvasService = new CanvasService();

export default canvasService;

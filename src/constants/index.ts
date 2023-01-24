import { Color } from '../types';

export enum Tools {
  PEN = 'PEN',
  LINE = 'LINE',
  TRIANGLE = 'TRIANGLE',
  RECT = 'RECT',
  PENTAGON = 'PENTAGON',
  CIRCLE = 'CIRCLE',
  ERASER = 'ERASER',
  STAR = 'STAR'
}

export enum ThemeModes {
  light = 'light',
  dark = 'dark'
}

export const INITIAL_COLOR: Color = '#000000';

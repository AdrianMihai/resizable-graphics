import { createContext } from 'react';

type DrawingData = {
  width: number;
  height: number;
};

export const DrawingContext = createContext<DrawingData>({ width: 0, height: 0 });

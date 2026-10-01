import { createContext } from 'react';

type GraphicsConfiguration = {
  ratio: number;
  isMaxWidth: boolean;
  updateRatio: (width: number, height: number) => void;
  containerElement: HTMLDivElement | null;
  setContainerElement: (el: HTMLDivElement | null) => void;
};

export const GraphicsContext = createContext<GraphicsConfiguration>({
  ratio: 1,
  isMaxWidth: true,
  updateRatio: () => {},
  containerElement: null,
  setContainerElement: () => {},
});

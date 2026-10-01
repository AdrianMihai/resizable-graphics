import { GraphicsContext } from '@/graphics-configuration/GraphicsContext';
import type React from 'react';
import { useCallback, useState } from 'react';

export const GraphicsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [graphicsConfig, setGraphicsConfig] = useState({ isMaxWidth: true, ratio: 1 });
  const [containerElement, setContainerElement] = useState<HTMLDivElement | null>(null);

  const updateRatio = useCallback((width: number, height: number) => {
    if (Number.isNaN(Number(width)) || Number.isNaN(Number(height)) || width < 100 || height < 100) return;

    let ratio = parseFloat(Number(width / height).toFixed(2));

    if (ratio <= 1) {
      setGraphicsConfig({
        ratio,
        isMaxWidth: false,
      });

      return;
    }

    setGraphicsConfig({
      ratio: parseFloat(Number(height / width).toFixed(2)),
      isMaxWidth: true,
    });
  }, []);

  return (
    <GraphicsContext value={{ ...graphicsConfig, updateRatio, containerElement, setContainerElement }}>
      {children}
    </GraphicsContext>
  );
};

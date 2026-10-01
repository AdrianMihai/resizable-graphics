import { GraphicsContext } from '@/graphics-configuration/GraphicsContext';
import { DrawingContext } from '@/window-graphics/DrawingContext';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Stage } from 'react-konva';

export const ResponsiveStage: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { containerElement } = useContext(GraphicsContext);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const stageRef = useRef(null);

  useEffect(() => {
    if (!containerElement) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;

      setSize((current) => {
        const next = { width: Math.floor(width), height: Math.floor(height) };

        return current.width === next.width && current.height === next.height ? current : next;
      });
    });

    observer.observe(containerElement);

    return () => observer.disconnect();
  }, [containerElement]);

  return (
    <Stage ref={stageRef} width={size.width} height={size.height}>
      <DrawingContext value={size}>{children}</DrawingContext>
    </Stage>
  );
};

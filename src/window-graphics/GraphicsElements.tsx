import { ResponsiveStage } from '@/window-graphics/ResponsiveStage';
import { WindowDrawing } from '@/window-graphics/WindowDrawing';
import { Layer } from 'react-konva';

export const GraphicsElements = () => {
  return (
    <ResponsiveStage>
      <Layer>
        <WindowDrawing />
      </Layer>
    </ResponsiveStage>
  );
};

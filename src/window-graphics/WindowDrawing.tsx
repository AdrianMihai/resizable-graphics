import { GraphicsContext } from '@/graphics-configuration/GraphicsContext';
import { DrawingContext } from '@/window-graphics/DrawingContext';
import { useInnerSashes } from '@/window-graphics/UseInnerSashes';
import { useContext, useMemo } from 'react';
import { Group, Rect } from 'react-konva';

const FRAME_SIZE = 24;

export const WindowDrawing = () => {
  const { isMaxWidth, ratio } = useContext(GraphicsContext);
  const { width, height } = useContext(DrawingContext);

  const frameDimensions = useMemo(() => {
    if (isMaxWidth) {
      return {
        width: width - 60,
        height: ratio * height - 60,
      };
    }

    return {
      width: ratio * width - 60,
      height: height - 60,
    };
  }, [isMaxWidth, ratio, width, height]);

  const windowOffset = useMemo(
    () => ({
      x: width / 2 - frameDimensions.width / 2,
      y: height / 2 - frameDimensions.height / 2,
    }),
    [frameDimensions, width, height],
  );

  const innerWidth = frameDimensions.width - 2 * FRAME_SIZE;
  const innerHeight = frameDimensions.height - 2 * FRAME_SIZE;

  const { verticalSashes, horizontalSashes } = useInnerSashes({
    windowInnerSize: { width: innerWidth, height: innerHeight },
    rows: 2,
    cols: 3,
  });

  return (
    <Group x={windowOffset.x} y={windowOffset.y}>
      <Rect
        key='outer-frame'
        x={0}
        y={0}
        width={frameDimensions.width}
        height={frameDimensions.height}
        fillLinearGradientStartPoint={{ x: 0, y: 0 }}
        fillLinearGradientEndPoint={{ x: frameDimensions.width, y: frameDimensions.height }}
        fillLinearGradientColorStops={[0, '#222', 0.5, '#444', 1, '#111']}
        shadowColor='rgba(0,0,0,0.6)'
        shadowBlur={15}
        shadowOffset={{ x: 4, y: 4 }}
        cornerRadius={4}
      />
      <Rect
        key='inner-frame'
        x={FRAME_SIZE - 5}
        y={FRAME_SIZE - 5}
        width={innerWidth + 10}
        height={innerHeight + 10}
        fillLinearGradientStartPoint={{ x: 0, y: 0 }}
        fillLinearGradientEndPoint={{ x: width, y: height }}
        fillLinearGradientColorStops={[0, '#555', 1, '#333']}
        shadowColor='rgba(255,255,255,0.2)'
        shadowBlur={5}
        shadowOffset={{ x: -2, y: -2 }}
        cornerRadius={2}
      />
      <Rect key='glass' x={FRAME_SIZE} y={FRAME_SIZE} width={innerWidth} height={innerHeight} fill='#a3d4f7' />
      {verticalSashes.map((rect, idx) => (
        <Rect
          key={`vertical-mutin-${idx}`}
          {...rect}
          x={rect.x + FRAME_SIZE}
          y={rect.y + FRAME_SIZE}
          fill='#b8b9ba'
          stroke='rgba(255,255,255,0.45)'
          strokeWidth={1}
          shadowColor='#4a4a4a'
          shadowBlur={2}
          shadowOffset={{ x: 2, y: 0 }}
        />
      ))}
      {horizontalSashes.map((rect, idx) => (
        <Rect
          key={`horizontal-mutin-${idx}`}
          {...rect}
          x={rect.x + FRAME_SIZE}
          y={rect.y + FRAME_SIZE}
          fill='#b8b9ba'
          stroke='rgba(255,255,255,0.45)'
          strokeWidth={1}
          shadowColor='#4a4a4a'
          shadowBlur={2}
          shadowOffset={{ x: 0, y: 2 }}
        />
      ))}
    </Group>
  );
};

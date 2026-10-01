import { useMemo } from 'react';

type UseInnerSashesProps = {
  windowInnerSize: { width: number; height: number };
  rows: number;
  cols: number;
};

const SASH_SIZE = 16;

export const useInnerSashes = ({ windowInnerSize, rows, cols }: UseInnerSashesProps) => {
  const horizontalSashes = useMemo(() => {
    const horizontalRectangles = [];
    let currentOffset = 0;

    for (let row = 0; row < rows; ++row) {
      if (row > 0) {
        horizontalRectangles.push({
          x: 0,
          y: currentOffset - SASH_SIZE / 2,
          width: windowInnerSize.width,
          height: SASH_SIZE,
        });
      }

      currentOffset += Math.floor(windowInnerSize.height / rows);
    }

    return horizontalRectangles;
  }, [windowInnerSize, cols]);

  const verticalSashes = useMemo(() => {
    const verticalRectangles = [];
    let currentOffset = 0;

    for (let col = 0; col < cols; ++col) {
      if (col > 0) {
        verticalRectangles.push({
          x: currentOffset - SASH_SIZE / 2,
          y: 0,
          width: SASH_SIZE,
          height: windowInnerSize.height,
        });
      }

      currentOffset += Math.floor(windowInnerSize.width / cols);
    }

    return verticalRectangles;
  }, [windowInnerSize, cols]);

  return { horizontalSashes, verticalSashes };
};

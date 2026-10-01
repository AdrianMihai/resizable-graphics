import { useCallback, useContext, useRef } from 'react';
import styles from './GraphicsControls.module.css';
import { GraphicsContext } from '@/graphics-configuration/GraphicsContext';

export const GraphicsControls = () => {
  const widthInput = useRef<HTMLInputElement>(null);
  const heightInput = useRef<HTMLInputElement>(null);
  const { updateRatio } = useContext(GraphicsContext);

  const onDimensionChange = useCallback(() => {
    const widthValue = Number(widthInput.current?.value);
    const heightValue = Number(heightInput.current?.value);

    updateRatio(widthValue, heightValue);
  }, [updateRatio]);

  return (
    <div className={styles['controls-row']}>
      <input ref={widthInput} type='text' placeholder='Window width' defaultValue={300} onChange={onDimensionChange} />
      <input
        ref={heightInput}
        type='text'
        placeholder='Window height'
        defaultValue={300}
        onChange={onDimensionChange}
      />
    </div>
  );
};

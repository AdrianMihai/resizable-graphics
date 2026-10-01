import { GraphicsProvider } from '@/graphics-configuration/GraphicsProvider';
import styles from './MainPage.module.css';
import { GraphicsElements } from '@/window-graphics/GraphicsElements';
import { GraphicsContext } from '@/graphics-configuration/GraphicsContext';
import { GraphicsControls } from '@/main-page/GraphicsControls';

export const MainPage = () => {
  return (
    <GraphicsProvider>
      <div className={styles['main-page-container']}>
        <GraphicsControls />
        <GraphicsContext.Consumer>
          {({ setContainerElement }) => (
            <div ref={setContainerElement} className={styles['graphic-container']}>
              <GraphicsElements />
            </div>
          )}
        </GraphicsContext.Consumer>
      </div>
    </GraphicsProvider>
  );
};

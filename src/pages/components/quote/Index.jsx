import TextOpacity from '@src/components/animationComponents/textOpacity/Index';
import clsx from 'clsx';
import styles from '@src/pages/components/quote/styles/quote.module.scss';
import { useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useStore } from '@src/store';
import usePortfolioData from '@src/hooks/usePortfolioData';

function Quote() {
  const [isLoading] = useStore(useShallow((state) => [state.isLoading]));
  const { data } = usePortfolioData();
  const quote = data?.profile?.midQuote || "“Dreams are not what you see in your sleep, dreams are things which do not let you sleep.”";

  const rootRef = useRef();
  const textRef = useRef();

  return (
    <section ref={rootRef} className={clsx(styles.root, 'layout-block-inner')}>
      <h3 ref={textRef} className={clsx(styles.text, 'h3')}>
        {!isLoading && (
          <TextOpacity key={quote} textRef={textRef.current} trigger={rootRef.current}>
            {quote}
          </TextOpacity>
        )}
      </h3>
    </section>
  );
}

export default Quote;

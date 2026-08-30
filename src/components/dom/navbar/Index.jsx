import ButtonLink from '@src/components/animationComponents/buttonLink/Index';
import { Glass } from '@samasante/liquid-glass';
import Link from 'next/link';
import MenuButton from '@src/components/dom/navbar/components/MenuButton';
import MenuLinks from '@src/components/dom/navbar/components/MenuLinks';
import clsx from 'clsx';
import styles from '@src/components/dom/navbar/styles/index.module.scss';
import { useCallback } from 'react';
import useIsMobile from '@src/hooks/useIsMobile';
import { useRouter } from 'next/router';
import { useShallow } from 'zustand/react/shallow';
import { useStore } from '@src/store';

function Navbar() {
  const isMobile = useIsMobile();
  const router = useRouter();
  const [lenis] = useStore(useShallow((state) => [state.lenis]));

  const scrollToPosition = useCallback(
    (position, duration = 1.5) => {
      if (lenis) {
        lenis.scrollTo(position, {
          duration,
          force: true,
          easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
          onComplete: () => {
            lenis.start();
          },
        });
      }
    },
    [lenis],
  );

  const goToTop = useCallback(() => {
    if (router.pathname === '/') {
      scrollToPosition(0);
    }
  }, [router.pathname, scrollToPosition]);

  return (
    <>
      <MenuLinks />

      <header className={styles.root} role="banner">
        {/* Glass wraps a single in-flow child. It injects its own aria-hidden layer
            elements, so the flex row stays on .innerHeader rather than on Glass itself. */}
        {/* display is set inline because Glass applies `display: inline-block` as an
            inline style, which would otherwise beat the stylesheet rule. */}
        <Glass
          className={styles.glassBar}
          optics={{ frost: 10, saturate: 1.2, sheen: 0.35 }}
          style={{ display: 'block', background: 'rgba(255, 255, 255, 0.38)' }}
        >
          <div className={styles.innerHeader}>
            <Link
              onClick={goToTop}
              aria-label="Go home"
              scroll={false}
              href="/"
            >
              <h4 className={clsx('bold', 'h4', styles.wordmark)}>
                ABHAY AGNIHOTRI
              </h4>
            </Link>

            <div className={styles.rightContainer}>
              {!isMobile && (
                <ButtonLink
                  href="mailto:abhayagnihotri976@gmail.com"
                  label="GET IN TOUCH"
                />
              )}
              <MenuButton />
            </div>
          </div>
        </Glass>
      </header>
    </>
  );
}

export default Navbar;

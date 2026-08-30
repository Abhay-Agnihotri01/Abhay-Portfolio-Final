/* eslint-disable no-return-assign */
/* eslint-disable no-nested-ternary */
import AppearByWords from '@src/components/animationComponents/appearByWords/Index';
import Image from 'next/image';
import clsx from 'clsx';
import experience from '@src/constants/experience';
import { gsap } from 'gsap';
import styles from '@src/pages/components/experience/styles/experience.module.scss';
import useIsMobile from '@src/hooks/useIsMobile';
import { useIsomorphicLayoutEffect } from '@src/hooks/useIsomorphicLayoutEffect';
import { useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useStore } from '@src/store';
import { useWindowSize } from '@darkroom.engineering/hamo';

function Experience() {
  const isMobile = useIsMobile();
  const windowSize = useWindowSize();
  const [isLoading] = useStore(useShallow((state) => [state.isLoading]));

  const rootRef = useRef();
  const cardRefs = useRef([]);

  const setupCardAnimations = () => {
    const ctx = gsap.context(() => {
      if (!isLoading) {
        cardRefs.current.slice(0, -1).forEach((cardRef, index) => {
          gsap.set(cardRef, { yPercent: 0 });
          gsap
            .timeline({
              scrollTrigger: {
                id: `experienceRef-${index}`,
                trigger: rootRef.current,
                start: `top+=${windowSize.height * index}`,
                end: () => `+=${(cardRefs.current.length - 2) * windowSize.height}`,
                scrub: true,
                scroller: document?.querySelector('main'),
                invalidateOnRefresh: true,
              },
            })
            .to(cardRef, {
              yPercent: 100,
              stagger: 1,
            });
        });
      }
    });

    return ctx;
  };

  useIsomorphicLayoutEffect(() => {
    const ctx = setupCardAnimations();
    return () => ctx.kill();
  }, [isLoading, windowSize.height]);

  return (
    <>
      <section className={clsx(styles.titleContainer, 'layout-block-inner')}>
        <h1 className={clsx(styles.title, 'h1')}>
          <AppearByWords>Ventures</AppearByWords>
        </h1>
      </section>
      <section ref={rootRef} className={clsx(styles.root, 'layout-block-inner')}>
        <div className={styles.innerContainer}>
          {experience.map((job, index) => (
            <article key={`${job.company}-${job.period}`} className={styles.card}>
              <div
                style={
                  !isMobile
                    ? {
                        height: index === experience.length - 1 ? '200svh' : `${200 + 100 * index}svh`,
                        top: index === 0 ? '0px' : '-100svh',
                      }
                    : {
                        height: index === experience.length - 1 ? '124svh' : `${200 + 100 * index}svh`,
                        top: index === 0 ? '0px' : '-62svh',
                      }
                }
                className={styles.projectsWrap}
              >
                <div className={clsx(styles.container, 'layout-grid-inner')}>
                  <div className={styles.projectsDetails}>
                    <h6 className={clsx(styles.text, 'h6')}>{job.period}</h6>
                    <h3 className={clsx(styles.text, styles.company, 'h3')}>{job.company}</h3>
                    <h6 className={clsx(styles.text, styles.role, 'h6')}>{job.role}</h6>
                    <div className={clsx(styles.text, styles.location, 'p-x')}>{job.location}</div>
                    <div className={clsx(styles.text, styles.desc, 'p-l')}>{job.desc}</div>
                  </div>
                  {/* Sharp artwork in the framed thumbnail; the blurred variant is the
                      full-bleed layer below, so the two never fight for attention. */}
                  <div className={styles.imageContainer}>
                    <Image sizes="50vw" src={job.image} fill alt={`${job.company} artwork`} />
                  </div>
                </div>
              </div>
              <div ref={(el) => (cardRefs.current[index] = el)} className={styles.canvas}>
                <Image
                  priority={index === 0}
                  loading={index === 0 ? undefined : 'lazy'}
                  sizes="100vw"
                  className={index === 0 ? styles.firstCard : index === experience.length - 1 ? styles.lastCard : undefined}
                  src={job.imageBlur}
                  fill
                  alt=""
                  aria-hidden
                />
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export default Experience;

import AppearTitle from '@src/components/animationComponents/appearTitle/Index';
import ButtonLink from '@src/components/animationComponents/buttonLink/Index';
import Image from 'next/image';
import clsx from 'clsx';
import { gsap } from 'gsap';
import styles from '@src/pages/components/about/styles/about.module.scss';
import useIsMobile from '@src/hooks/useIsMobile';
import { useIsomorphicLayoutEffect } from '@src/hooks/useIsomorphicLayoutEffect';
import { useRef } from 'react';
import usePortfolioData from '@src/hooks/usePortfolioData';

function About() {
  const isMobile = useIsMobile();
  const rootRef = useRef();
  const animatedImageRef = useRef();
  const { data } = usePortfolioData();
  const profile = data?.profile || {};

  const setupScrollAnimation = () => {
    const ctx = gsap.context(() => {
      gsap.set(animatedImageRef.current, { top: !isMobile ? '-20vw' : '0' });
      if (!isMobile) {
        gsap.to(animatedImageRef.current, {
          top: '20vw',
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            scroller: document?.querySelector('main'),
            invalidateOnRefresh: true,
          },
        });
      }
    });

    return ctx;
  };

  useIsomorphicLayoutEffect(() => {
    const ctx = setupScrollAnimation();
    return () => ctx.kill();
  }, [isMobile]);

  const renderImageContainer = () => (
    <div className={styles.imageContainer}>
      <Image
        priority
        src={profile.profileImageFront || '/profile/front.png'}
        sizes="100%"
        fill
        alt="Portrait"
      />
    </div>
  );

  const heroGreeting = profile.heroGreeting || "Hey, My name's Abhay Agnihotri!";
  const heroQuote = profile.heroQuote || "“I don't want to simply follow the path that already exists. I want to keep learning, keep building, and leave something behind.”";
  const bioParagraphs = profile.homeBio || [
    "I'm a developer who enjoys turning ideas into thoughtful, useful digital experiences.",
    "I'm curious by nature, always learning something new and looking for better ways to build.",
    "For me, every project is another chance to grow."
  ];

  return (
    <section ref={rootRef} className={styles.root}>
      <div className={clsx(styles.nameContainer, 'layout-block-inner')}>
        <AppearTitle>
          <h1 className={clsx('h1', 'medium')}>{heroGreeting}</h1>
        </AppearTitle>
      </div>

      <div className={clsx(styles.container, 'layout-grid-inner')}>
        {isMobile ? renderImageContainer() : null}
        <div className={clsx(styles.descWrapper)} ref={animatedImageRef}>
          <AppearTitle>
            <div className="p-l">{heroQuote}</div>
          </AppearTitle>
        </div>
        {!isMobile ? renderImageContainer() : null}
        <div className={clsx(styles.descWrapperBottom)}>
          <AppearTitle key="descWrapperBottom">
            {bioParagraphs.map((paragraph, idx) => (
              <h6 key={paragraph} className={clsx('h6', idx > 0 && styles.paddingTop)}>
                {paragraph}
              </h6>
            ))}
          </AppearTitle>
          <div className={clsx(styles.buttonContainer)}>
            <ButtonLink href="/about" label="ABOUT ME" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;

import AppearTitle from '@src/components/animationComponents/appearTitle/Index';
import Link from 'next/link';
import LinkText from '@src/components/animationComponents/linkText/Index';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import SocialIcon from '@src/components/dom/SocialIcon';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import footerLinks from '@src/components/dom/navbar/constants/footerLinks';
import gsap from 'gsap';
import menuLinks from '@src/components/dom/navbar/constants/menuLinks';
import projectsLinks from '@src/components/dom/navbar/constants/projectsLinks';
import styles from '@src/components/dom/styles/footer.module.scss';
import useIsMobile from '@src/hooks/useIsMobile';
import { useIsomorphicLayoutEffect } from '@src/hooks/useIsomorphicLayoutEffect';
import { useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useStore } from '@src/store';
import { useWindowSize } from '@darkroom.engineering/hamo';

const Time = dynamic(() => import('@src/components/dom/Time'), { ssr: false });
const GoTop = dynamic(() => import('@src/components/dom/GoTop'), {
  ssr: false,
});

const EMAIL = 'abhayagnihotri976@gmail.com';

// The social list is split across two columns so neither runs long.
const CONNECT = footerLinks.slice(0, 4);
const ELSEWHERE = footerLinks.slice(4);

function Footer() {
  const isMobile = useIsMobile();
  const footerRef = useRef();
  const [isLoading] = useStore(useShallow((state) => [state.isLoading]));
  const windowSize = useWindowSize();

  useIsomorphicLayoutEffect(() => {
    if (!isLoading) {
      const setupFooterAnimation = () => {
        gsap.set(footerRef.current, { height: 'auto' });
        const allSections = document.querySelectorAll('#mainContainer section');
        if (allSections.length > 1) {
          const lastSection = allSections[allSections.length - 2];
          if (footerRef.current.offsetHeight <= windowSize.height) {
            gsap.set(footerRef.current, { yPercent: -50 });
            const uncover = gsap.timeline({ paused: true });
            gsap.set(footerRef.current, { height: '100.5svh' });
            uncover.to(footerRef.current, { yPercent: 0, ease: 'none' });
            ScrollTrigger.create({
              id: 'footerTrigger',
              trigger: lastSection,
              start: 'bottom bottom',
              end: '+=100%',
              animation: uncover,
              scrub: true,
              scroller: document?.querySelector('main'),
            });
          } else {
            gsap.set(footerRef.current, {
              transform: 'translate(0%, 0%)',
              height: 'auto',
            });
          }
        }
      };

      setupFooterAnimation(footerRef, windowSize);
    }

    return () => {
      const footerTrigger = ScrollTrigger.getById('footerTrigger');
      if (footerTrigger) {
        footerTrigger.kill();
      }
    };
  }, [isLoading, windowSize.height]);

  const renderColumn = (title, links, external = false) => (
    <div className={styles.column}>
      <AppearTitle isFooter>
        <h6 className={clsx(styles.columnTitle, 'p-x')}>{title}</h6>
        {links.map((link) => (
          <div key={link.title} className={styles.linkTextContainer}>
            <LinkText
              target={external}
              className={styles.linkText}
              title={link.title}
              href={link.href}
            >
              <span className="footer">{link.title}</span>
            </LinkText>
          </div>
        ))}
      </AppearTitle>
    </div>
  );

  return (
    <section
      ref={footerRef}
      className={clsx(styles.root, 'layout-block-inner')}
      role="contentinfo"
    >
      <div className={styles.inner}>
        {/* brand + call to action */}
        <div className={styles.top}>
          <div className={styles.brand}>
            <AppearTitle isFooter>
              <h4 className={clsx(styles.wordmark, 'h4', 'bold')}>
                Abhay Agnihotri
              </h4>
              <div className={clsx(styles.brandDesc, 'p-x')}>
                Transforming complex data into intelligent products, predictive
                models, and seamless user experiences.
              </div>
              <div className={clsx(styles.brandMeta, 'p-xs')}>
                Lucknow, India · <Time />
              </div>
            </AppearTitle>
          </div>
          <div className={styles.cta}>
            <AppearTitle isFooter>
              <h3 className={clsx(styles.ctaTitle, 'h3')}>Ready to build?</h3>
              <Link
                aria-label="Send email"
                scroll={false}
                href={`mailto:${EMAIL}`}
                className={styles.ctaButton}
              >
                <span className="p-x">Get in touch</span>
                <span className={styles.ctaArrow}>&#8594;</span>
              </Link>
            </AppearTitle>
          </div>
        </div>

        <div className={styles.divider} />

        {/* link columns */}
        <div className={styles.columns}>
          {renderColumn('SITEMAP', menuLinks.slice(0, -1))}
          {renderColumn('WORK', projectsLinks)}
          {renderColumn('CONNECT', CONNECT, true)}
          {renderColumn('ELSEWHERE', ELSEWHERE, true)}
          <div className={styles.column}>
            <AppearTitle isFooter>
              <h6 className={clsx(styles.columnTitle, 'p-x')}>CONTACT</h6>
              <div className={styles.linkTextContainer}>
                <LinkText
                  className={styles.linkText}
                  title="Email"
                  href={`mailto:${EMAIL}`}
                >
                  <span className="footer">{EMAIL}</span>
                </LinkText>
              </div>
              <div className={clsx(styles.availability, 'p-x')}>
                Currently available for new work
              </div>
            </AppearTitle>
          </div>
        </div>

        <div className={styles.divider} />

        {/* bottom bar */}
        <div className={styles.bottom}>
          <div className={clsx(styles.copyright, 'p-xs')}>
            © 2026 · Abhay Agnihotri · All Rights Reserved
          </div>
          <div className={styles.socialRow}>
            {footerLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.title}
                title={link.title}
                className={styles.socialButton}
              >
                <SocialIcon name={link.icon} className={styles.socialIcon} />
              </a>
            ))}
            {!isMobile && (
              <div className={styles.goToTop}>
                <GoTop />
              </div>
            )}
          </div>
        </div>

        {isMobile && (
          <div className={styles.goToTopMobile}>
            <GoTop />
          </div>
        )}
      </div>
    </section>
  );
}

export default Footer;

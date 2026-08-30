/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from '@src/pages/projects/components/projectsImages/styles/projectImages.module.scss';
import useIsMobile from '@src/hooks/useIsMobile';

/**
 * `autoPlay` makes a browser fetch the whole file immediately, even for videos
 * far below the fold, several MB before the page is usable. Mounting the
 * <video> only once it approaches the viewport defers that entirely.
 */
function LazyVideo({ src }) {
  const containerRef = useRef();
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || shouldLoad) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div ref={containerRef} className={styles.videoContainer}>
      {shouldLoad && (
        // playsInline is required or iOS refuses to autoplay inline.
        <video loop muted autoPlay playsInline preload="metadata">
          <source src={src} type="video/mp4" />
        </video>
      )}
    </div>
  );
}

LazyVideo.propTypes = {
  src: PropTypes.string.isRequired,
};

function ProjectImages({ project }) {
  const isMobile = useIsMobile();

  const renderMediaContainer = useCallback(
    ({ tag, src, isRight, index, title }) => {
      if (tag === 'video') {
        return <LazyVideo src={src} />;
      }
      // Only the first image is worth prioritising; the rest lazy-load as usual.
      const isFirst = index === 0;
      if (tag === 'small') {
        return (
          <div style={{ gridColumn: !isMobile ? (!isRight ? '1 / 9' : ' 9 / 17') : !isRight ? '1 / 4' : ' 4 / 7' }} className={styles.imageContainer}>
            <Image priority={isFirst} loading={isFirst ? undefined : 'lazy'} sizes="100%" src={src} fill alt={`Image-${title}-${index}`} />
          </div>
        );
      }
      if (tag === 'big') {
        return (
          <div className={styles.bigContainer}>
            <Image priority={isFirst} loading={isFirst ? undefined : 'lazy'} sizes="100%" src={src} fill alt={`Image-${title}-${index}`} />
          </div>
        );
      }
      if (tag === 'medium') {
        return (
          <div className={styles.mediumContainer}>
            <Image priority={isFirst} loading={isFirst ? undefined : 'lazy'} sizes="100%" src={src} fill alt={`Image-${title}-${index}`} />
          </div>
        );
      }
      return null;
    },
    [isMobile],
  );

  return (
    <section className={clsx(styles.root, 'layout-grid-inner')}>
      {project.images.map((image, index) => (
        <Fragment key={`${project.title}-image-${index}`}>{renderMediaContainer({ ...image, index, title: project.title })}</Fragment>
      ))}
    </section>
  );
}

ProjectImages.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        tag: PropTypes.string.isRequired,
        src: PropTypes.string.isRequired,
        isRight: PropTypes.bool,
      }),
    ).isRequired,
  }).isRequired,
};

export default ProjectImages;

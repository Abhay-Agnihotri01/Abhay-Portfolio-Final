import AppearTitle from '@src/components/animationComponents/appearTitle/Index';
import clsx from 'clsx';
import styles from '@src/pages/about/components/overview/styles/overview.module.scss';
import useIsMobile from '@src/hooks/useIsMobile';

function Overview() {
  const isMobile = useIsMobile();

  return (
    <section className={clsx(styles.root, 'layout-grid-inner')}>
      <div className={styles.title}>
        {isMobile ? (
          // <AppearTitle key="mobile-queto">
          //   <h3 className="h3">I believe curiosity is the</h3>
          //   <h3 className="h3">
          //     beginning of every <span className="medium">great thing</span>
          //   </h3>
          //   <h3 className="h3">worth building. So I keep</h3>
          //   <h3 className="h3">
          //     <span className="medium">learning</span> and turning ideas real.
          //   </h3>
          // </AppearTitle>
          <AppearTitle key="mobile-queto">
            <h3 className="h3">I believe curiosity</h3>
            <h3 className="h3">
              is the start of every <span className="medium">great</span>
            </h3>
            <h3 className="h3">
              <span className="medium">thing</span>. So I keep learning
            </h3>
            <h3 className="h3">and turning ideas real.</h3>
          </AppearTitle>
        ) : (
          <AppearTitle key="desktop-queto">
            <h3 className="h3">I believe curiosity is the</h3>
            <h3 className="h3">
              beginning of every <span className="medium">great thing</span>.
            </h3>
            <h3 className="h3">
              So I keep <span className="medium">learning</span>, experimenting,
            </h3>
            <h3 className="h3">and turning ideas into reality.</h3>
          </AppearTitle>
        )}
      </div>
      <div className={clsx(styles.text, 'p-l', styles.myStory)}>
        <AppearTitle>
          <span>My story</span>
        </AppearTitle>
      </div>
      <div className={styles.desc}>
        {!isMobile ? (
          <AppearTitle key="desktop-overview">
            <h6 className="h6">
              I&apos;m Abhay Agnihotri, a developer who enjoys turning
            </h6>
            <h6 className="h6">
              ideas into useful digital experiences. My journey
            </h6>
            <h6 className="h6">
              started with curiosity about technology, which quickly
            </h6>
            <h6 className="h6">
              grew into a genuine passion for building things.
            </h6>

            <h6 className={clsx(styles.paddingTop, 'h6')}>
              Along the way, I&apos;ve learned that engineering is
            </h6>
            <h6 className="h6">
              about more than writing code—it&apos;s about understanding
            </h6>
            <h6 className="h6">
              problems, experimenting, and finding better solutions.
            </h6>

            <h6 className={clsx(styles.paddingTop, 'h6')}>
              Today, I&apos;m focused on building meaningful AI and web
            </h6>
            <h6 className="h6">
              applications, constantly exploring new technologies,
            </h6>
            <h6 className="h6">and solving real-world challenges.</h6>

            <h6 className={clsx(styles.paddingTop, 'h6')}>
              I&apos;m still learning, still creating, and always excited
            </h6>
            <h6 className="h6">
              for what comes next. That&apos;s the best part.
            </h6>

            <h6 className={clsx(styles.paddingTop, 'h6')}>— Abhay</h6>
          </AppearTitle>
        ) : (
          <AppearTitle key="mobile-overview">
            <h6 className="h6">
              I&apos;m Abhay Agnihotri, a developer who enjoys
            </h6>
            <h6 className="h6">
              turning ideas into useful digital experiences.
            </h6>

            <h6 className={clsx(styles.paddingTop, 'h6')}>
              I believe development is about understanding
            </h6>
            <h6 className="h6">
              problems, experimenting, and finding better ways
            </h6>
            <h6 className="h6">to build and innovate.</h6>

            <h6 className={clsx(styles.paddingTop, 'h6')}>
              Today, I&apos;m focused on building meaningful
            </h6>
            <h6 className="h6">
              projects across AI, data, and full-stack systems.
            </h6>

            <h6 className={clsx(styles.paddingTop, 'h6')}>
              Still learning, still building, and excited for
            </h6>
            <h6 className="h6">what comes next.</h6>

            <h6 className={clsx(styles.paddingTop, 'h6')}>— Abhay</h6>
          </AppearTitle>
        )}
      </div>
    </section>
  );
}
export default Overview;

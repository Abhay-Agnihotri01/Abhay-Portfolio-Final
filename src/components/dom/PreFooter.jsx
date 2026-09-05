import FruitNinja from '@src/components/dom/prefooter/Index';
import clsx from 'clsx';
import styles from '@src/components/dom/styles/preFooter.module.scss';
import usePortfolioData from '@src/hooks/usePortfolioData';

function PreFooter() {
  const { data } = usePortfolioData();
  const profile = data?.profile || {};
  const prefooterTitle = profile.prefooterTitle || "Let's slice through your next challenge together.";
  const prefooterSub = profile.prefooterSub || "Have an exciting project, problem to solve, or just want to say hi? Let's talk.";

  return (
    <section className={clsx(styles.root, 'layout-block-inner')}>
      <div className={styles.textsContainer}>
        <div>
          <h2 className="h1">{prefooterTitle}</h2>
        </div>
        <div>
          <h6 className="h6">
            {prefooterSub}
          </h6>
        </div>
      </div>

      <div className={styles.canvas}>
        <FruitNinja />
      </div>
    </section>
  );
}

export default PreFooter;

import AppearByWords from '@src/components/animationComponents/appearByWords/Index';
import AppearTitle from '@src/components/animationComponents/appearTitle/Index';
import clsx from 'clsx';
import defaultStats from '@src/constants/stats';
import styles from '@src/pages/components/stats/styles/stats.module.scss';
import usePortfolioData from '@src/hooks/usePortfolioData';

function Stats() {
  const { data } = usePortfolioData();
  const statsList = data?.stats || defaultStats;
  const statsNote = data?.profile?.statsNote || 'Open for free clinic valuation consultations.';

  return (
    <section className={clsx(styles.root, 'layout-grid-inner')}>
      <h1 className={clsx(styles.sectionTitle, 'h1')}>
        <AppearByWords>By the Numbers</AppearByWords>
      </h1>

      <div className={styles.grid}>
        {statsList.map((stat, idx) => (
          <div key={stat.id || stat.label || idx} className={styles.stat}>
            <AppearTitle>
              <div className={clsx(styles.value, 'h2')}>{stat.value}</div>
              <div className={clsx(styles.label, 'p-l')}>{stat.label}</div>
            </AppearTitle>
          </div>
        ))}
      </div>

      <div className={styles.note}>
        <AppearTitle>
          <h6 className={clsx('h6', 'bold')}>
            {statsNote}
          </h6>
        </AppearTitle>
      </div>
    </section>
  );
}

export default Stats;

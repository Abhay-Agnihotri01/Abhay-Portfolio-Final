import AppearByWords from '@src/components/animationComponents/appearByWords/Index';
import AppearTitle from '@src/components/animationComponents/appearTitle/Index';
import clsx from 'clsx';
import stats from '@src/constants/stats';
import styles from '@src/pages/components/stats/styles/stats.module.scss';

function Stats() {
  return (
    <section className={clsx(styles.root, 'layout-grid-inner')}>
      <h1 className={clsx(styles.sectionTitle, 'h1')}>
        <AppearByWords>By the Numbers</AppearByWords>
      </h1>

      <div className={styles.grid}>
        {stats.map((stat) => (
          <div key={stat.label} className={styles.stat}>
            <AppearTitle>
              <div className={clsx(styles.value, 'h2')}>{stat.value}</div>
              <div className={clsx(styles.label, 'p-l')}>{stat.label}</div>
            </AppearTitle>
          </div>
        ))}
      </div>

      <div className={styles.note}>
        <AppearTitle>
          <h6 className={clsx('h6', 'bold')}>Open for free clinic valuation consultations.</h6>
        </AppearTitle>
      </div>
    </section>
  );
}

export default Stats;

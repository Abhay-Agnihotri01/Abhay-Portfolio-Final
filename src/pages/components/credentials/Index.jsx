import { education, languages, skills } from '@src/constants/credentials';

import AppearByWords from '@src/components/animationComponents/appearByWords/Index';
import AppearTitle from '@src/components/animationComponents/appearTitle/Index';
import clsx from 'clsx';
import styles from '@src/pages/components/credentials/styles/credentials.module.scss';

function Credentials() {
  return (
    <section className={clsx(styles.root, 'layout-grid-inner')}>
      <h1 className={clsx(styles.sectionTitle, 'h1')}>
        <AppearByWords>Education & Skills</AppearByWords>
      </h1>

      <div className={styles.column}>
        <AppearTitle>
          <h6 className={clsx('h6', 'bold', styles.columnTitle)}>Education</h6>
        </AppearTitle>
        {education.map((item) => (
          <div key={item.school} className={styles.item}>
            <AppearTitle>
              <div className={clsx('p-l', 'medium')}>{item.school}</div>
              <div className={clsx('p-x', styles.meta)}>{item.award}</div>
              <div className={clsx('p-x', styles.meta)}>{item.period}</div>
            </AppearTitle>
          </div>
        ))}
      </div>

      <div className={styles.column}>
        <AppearTitle>
          <h6 className={clsx('h6', 'bold', styles.columnTitle)}>Skills</h6>
        </AppearTitle>
        <div className={styles.tags}>
          {skills.map((skill) => (
            <div key={skill} className={styles.tag}>
              <AppearTitle>
                <div className="p-x">{skill}</div>
              </AppearTitle>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.column}>
        <AppearTitle>
          <h6 className={clsx('h6', 'bold', styles.columnTitle)}>Languages</h6>
        </AppearTitle>
        {languages.map((lang) => (
          <div key={lang.name} className={styles.langRow}>
            <AppearTitle>
              <div className={clsx('p-l', 'medium')}>{lang.name}</div>
              <div className={clsx('p-x', styles.meta)}>{lang.level}</div>
            </AppearTitle>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Credentials;

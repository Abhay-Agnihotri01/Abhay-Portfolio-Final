/* eslint-disable react/no-array-index-key */
import { education as defaultEdu, languages as defaultLang, skills as defaultSkills } from '@src/constants/credentials';

import AppearByWords from '@src/components/animationComponents/appearByWords/Index';
import AppearTitle from '@src/components/animationComponents/appearTitle/Index';
import clsx from 'clsx';
import styles from '@src/pages/components/credentials/styles/credentials.module.scss';
import usePortfolioData from '@src/hooks/usePortfolioData';

function Credentials() {
  const { data } = usePortfolioData();
  const credentials = data?.credentials || {};
  const education = credentials.education || defaultEdu;
  const skills = credentials.skills || defaultSkills;
  const languages = credentials.languages || defaultLang;

  return (
    <section className={clsx(styles.root, 'layout-grid-inner')}>
      <h1 className={clsx(styles.sectionTitle, 'h1')}>
        <AppearByWords>Education & Skills</AppearByWords>
      </h1>

      <div className={styles.column}>
        <AppearTitle>
          <h6 className={clsx('h6', 'bold', styles.columnTitle)}>Education</h6>
        </AppearTitle>
        {education.map((item, idx) => (
          <div key={`${item.school}-${idx}`} className={styles.item}>
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
          {skills.map((skill, idx) => (
            <div key={`${skill}-${idx}`} className={styles.tag}>
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
        {languages.map((lang, idx) => (
          <div key={`${lang.name}-${idx}`} className={styles.langRow}>
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

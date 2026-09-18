/* eslint-disable react/jsx-props-no-spreading */
import Hero from '@src/pages/about/components/hero/Hero';
import Overview from '@src/pages/about/components/overview/Overview';
import Services from '@src/pages/about/components/services/Services';
import Process from '@src/pages/about/components/process/Process';
import CustomHead from '@src/components/dom/CustomHead';

const profileSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  name: 'About Abhay Agnihotri',
  description:
    'Learn about Abhay Agnihotri — background, skills, development process, and experience in AI, Machine Learning, and Software Development.',
  mainEntity: {
    '@type': 'Person',
    name: 'Abhay Agnihotri',
    jobTitle: 'AI & Machine Learning Engineer',
  },
};

const seo = {
  title: 'About Abhay Agnihotri - AI & Machine Learning Engineer',
  description:
    'Learn more about Abhay Agnihotri — an AI & Machine Learning Engineer who turns complex technical challenges into scalable, high-performance software applications.',
  keywords: [
    'Abhay Agnihotri',
    'About Abhay Agnihotri',
    'AI Engineer',
    'Machine Learning Engineer',
    'Data Scientist',
    'Software Developer',
    'Web Developer',
    'Python Developer',
    'Portfolio',
  ],
  canonicalPath: '/about',
  extraSchema: profileSchema,
};

function Page() {
  return (
    <>
      <CustomHead {...seo} />

      <Hero />
      <Overview />
      <Services />
      <Process />
    </>
  );
}

export default Page;


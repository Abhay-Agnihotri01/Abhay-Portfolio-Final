/* eslint-disable react/jsx-props-no-spreading */
import Hero from '@src/pages/about/components/hero/Hero';
import Overview from '@src/pages/about/components/overview/Overview';
import Services from '@src/pages/about/components/services/Services';
import Process from '@src/pages/about/components/process/Process';
import CustomHead from '@src/components/dom/CustomHead';

const seo = {
  title: 'Abhay Agnihotri - About',
  description:
    'Learn more about Abhay Agnihotri, a developer who enjoys turning ideas into thoughtful and useful digital experiences.',
  keywords: [
    'Abhay Agnihotri',
    'About Abhay Agnihotri',
    'Developer',
    'Software Developer',
    'Web Developer',
    'Data Analyst',
    'Machine Learning',
    'AI',
    'Data Scientist',
    'Portfolio',
  ],
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

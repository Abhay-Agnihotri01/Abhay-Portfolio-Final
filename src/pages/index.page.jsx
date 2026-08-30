/* eslint-disable react/jsx-props-no-spreading */
import Home from '@src/pages/components/home/Index';
import About from '@src/pages/components/about/Index';
import Stats from '@src/pages/components/stats/Index';
import Quote from '@src/pages/components/quote/Index';
import Experience from '@src/pages/components/experience/Index';
import Credentials from '@src/pages/components/credentials/Index';
import CustomHead from '@src/components/dom/CustomHead';

const seo = {
  title: 'Abhay Agnihotri - Portfolio',
  description:
    'Software Developer specializing in Data Science, Machine Learning, and Full-Stack Development. I build scalable ML solutions, AI-powered applications, data-driven platforms, and production-ready web applications.',
  keywords: [
    'Abhay Agnihotri',
    'Software Developer',
    'AI Engineer',
    'Machine Learning Engineer',
    'Data Science',
    'Machine Learning',
    'Full Stack Developer',
    'AI Developer',
    'Python Developer',
    'React Developer',
    'Data Analytics',
    'Artificial Intelligence',
    'Lucknow',
    'India',
  ],
};

function Page() {
  return (
    <>
      <CustomHead {...seo} />
      <Home />
      <About />
      <Stats />
      <Quote />
      <Experience />
      <Credentials />
    </>
  );
}

export default Page;

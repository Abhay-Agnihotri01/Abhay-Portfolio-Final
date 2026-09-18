/* eslint-disable react/jsx-props-no-spreading */
import Home from '@src/pages/components/home/Index';
import About from '@src/pages/components/about/Index';
import Stats from '@src/pages/components/stats/Index';
import Quote from '@src/pages/components/quote/Index';
import Experience from '@src/pages/components/experience/Index';
import Credentials from '@src/pages/components/credentials/Index';
import CustomHead from '@src/components/dom/CustomHead';

const seo = {
  title: 'Abhay Agnihotri - AI & Machine Learning Engineer | Portfolio',
  description:
    'Official portfolio of Abhay Agnihotri — AI & Machine Learning Engineer specializing in Data Science, ML models, AI-powered applications, and Full-Stack Development.',
  keywords: [
    'Abhay Agnihotri',
    'AI Engineer',
    'Machine Learning Engineer',
    'Data Scientist',
    'Software Developer',
    'Full Stack Developer',
    'Python Developer',
    'React Developer',
    'Data Science',
    'Machine Learning',
    'Artificial Intelligence',
    'Lucknow',
    'India',
  ],
  canonicalPath: '/',
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


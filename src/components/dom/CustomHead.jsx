import NextHead from 'next/head';
import { NextSeo } from 'next-seo';
import PropTypes from 'prop-types';

// Set this to your real domain before deploying.
const SITE_URL = 'https://abhayagnihotri.dpdns.org/';
const OG_IMAGE = `${SITE_URL}/og.png`;

// https://schema.org/Person — helps search engines attribute the site to you.
const getSchema = () => ({
  '@context': 'http://schema.org',
  '@type': 'Person',
  name: 'Abhay Agnihotri',
  jobTitle: 'AI & ML Engineer',
  description:
    'AI and ML Engineer with a B.Tech in Computer Science Engineering, specializing in Artificial Intelligence and Machine Learning, with experience in data analytics, machine learning, Python, SQL, database management, data visualization, and software development.',
  url: SITE_URL,
  image: OG_IMAGE,
  email: 'mailto:abhayagnihotri976@gmail.com',
  homeLocation: { '@type': 'Place', name: 'Lucknow, India' },
  sameAs: [
    'https://www.linkedin.com/in/abhay-agnihotri-221352247/',
    'https://github.com/Abhay-Agnihotri01',
  ],
});

function CustomHead({ title = '', description, keywords }) {
  return (
    <>
      <NextHead>
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta httpEquiv="x-dns-prefetch-control" content="off" />
        <meta
          name="robots"
          content={
            process.env.NODE_ENV !== 'development'
              ? 'index,follow'
              : 'noindex,nofollow'
          }
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta
          name="keywords"
          content={keywords && keywords.length ? keywords.join(',') : keywords}
        />
        <meta name="author" content="Abhay Agnihotri" />
        <meta name="referrer" content="no-referrer" />
        <meta name="format-detection" content="telephone=no" />

        <link rel="canonical" href={SITE_URL} />
        <title>{title}</title>

        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={SITE_URL} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={OG_IMAGE} />

        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#f0f4f1" />

        {/* eslint-disable-next-line react/no-danger */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getSchema()) }}
        />
      </NextHead>
      <NextSeo title={title} description={description} />
    </>
  );
}

CustomHead.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  keywords: PropTypes.arrayOf(PropTypes.string),
};

CustomHead.defaultProps = { keywords: [] };

export default CustomHead;

import NextHead from 'next/head';
import { NextSeo } from 'next-seo';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://abhayagnihotri.dpdns.org').replace(/\/$/, '');
const DEFAULT_OG_IMAGE = `${SITE_URL}/og.png`;

const getBaseSchemas = (fullUrl, ogImage) => [
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: 'Abhay Agnihotri',
    jobTitle: 'AI & Machine Learning Engineer | Software Developer',
    description:
      'Software Developer specializing in Data Science, Machine Learning, and Full-Stack Development. Experienced in building scalable AI solutions, ML models, and production web applications.',
    url: SITE_URL,
    image: ogImage || DEFAULT_OG_IMAGE,
    email: 'mailto:abhayagnihotri976@gmail.com',
    homeLocation: {
      '@type': 'Place',
      name: 'Lucknow, Uttar Pradesh, India',
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Computer Science & Engineering (Artificial Intelligence & Machine Learning)',
    },
    knowsAbout: [
      'Artificial Intelligence',
      'Machine Learning',
      'Data Science',
      'Python',
      'React',
      'Next.js',
      'Full Stack Development',
      'Deep Learning',
      'Data Analytics',
      'SQL',
    ],
    sameAs: [
      'https://www.linkedin.com/in/abhay-agnihotri-221352247/',
      'https://github.com/Abhay-Agnihotri01',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'Abhay Agnihotri Portfolio',
    description:
      'Official Portfolio of Abhay Agnihotri — AI/ML Engineer & Full-Stack Developer showcasing projects, experience, skills, and credentials.',
    publisher: {
      '@id': `${SITE_URL}/#person`,
    },
    inLanguage: 'en-US',
  },
];

function CustomHead({
  title = 'Abhay Agnihotri - Portfolio',
  description = 'Software Developer specializing in Data Science, Machine Learning, and Full-Stack Development.',
  keywords = [],
  canonicalPath,
  ogImage,
  extraSchema,
}) {
  const router = useRouter();
  const currentPath = canonicalPath || (router?.asPath ? router.asPath.split('?')[0] : '/');
  const fullUrl = `${SITE_URL}${currentPath === '/' ? '' : currentPath}`;
  const fullOgImage = ogImage
    ? (ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`)
    : DEFAULT_OG_IMAGE;

  const baseSchemas = getBaseSchemas(fullUrl, fullOgImage);
  const schemasToRender = extraSchema
    ? [...baseSchemas, ...(Array.isArray(extraSchema) ? extraSchema : [extraSchema])]
    : baseSchemas;

  return (
    <>
      <NextHead>
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        <meta
          name="robots"
          content={
            process.env.NODE_ENV !== 'development'
              ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
              : 'noindex, nofollow'
          }
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta
          name="keywords"
          content={keywords && keywords.length ? keywords.join(', ') : keywords}
        />
        <meta name="author" content="Abhay Agnihotri" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta name="format-detection" content="telephone=no" />

        <link rel="canonical" href={fullUrl} />
        <title>{title}</title>

        <meta property="og:site_name" content="Abhay Agnihotri Portfolio" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:image" content={fullOgImage} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={fullOgImage} />

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
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': schemasToRender,
            }),
          }}
        />
      </NextHead>
      <NextSeo
        title={title}
        description={description}
        canonical={fullUrl}
        openGraph={{
          url: fullUrl,
          title,
          description,
          images: [{ url: fullOgImage }],
          site_name: 'Abhay Agnihotri Portfolio',
        }}
      />
    </>
  );
}

CustomHead.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  keywords: PropTypes.arrayOf(PropTypes.string),
  canonicalPath: PropTypes.string,
  ogImage: PropTypes.string,
  extraSchema: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

CustomHead.defaultProps = {
  keywords: [],
  canonicalPath: undefined,
  ogImage: undefined,
  extraSchema: undefined,
};

export default CustomHead;


module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://abhayagnihotri.dpdns.org/',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/admin', '/admin/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/*'],
      },
    ],
  },
};



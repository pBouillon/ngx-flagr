// @ts-check

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const organizationName = 'pBouillon';
const projectName = 'ngx-flagr';
const title = 'ngx-flagr';
const tagline = 'Effortless feature flag management in Angular ';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title,
  tagline,
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: `https:/${organizationName}.github.io`,
  baseUrl: `/${projectName}/`,

  // GitHub pages deployment config.
  organizationName,
  projectName,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: `https://github.com/${organizationName}/${projectName}/edit/main/apps/docs-app`,
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        respectPrefersColorScheme: true,
      },
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title,
        logo: {
          alt: `${projectName} Logo`,
          src: 'img/logos/ngx-flagr.png',
        },
        items: [
          {
            to: 'docs/quickstart',
            label: 'Quickstart',
            position: 'left',
          },
          {
            to: 'docs/introduction',
            label: 'Documentation',
            position: 'left',
          },
          {
            label: 'Projects',
            position: 'left',
            items: [
              {
                label: '@ngx-flagr/core',
                to: 'docs/category/ngx-flagrcore',
              },
            ],
          },
          {
            href: `https://www.npmjs.com/org/${projectName}`,
            label: 'npm',
            position: 'right',
            target: '_blank',
          },
          {
            href: `https://github.com/${organizationName}/${projectName}`,
            label: 'GitHub',
            position: 'right',
            target: '_blank',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Quickstart',
                to: '/docs/quickstart',
              },
              {
                label: 'Documentation',
                to: '/docs/introduction',
              },
            ],
          },
          {
            title: 'Open Source',
            items: [
              {
                label: 'Create an issue',
                href: `https://github.com/${organizationName}/${projectName}/issues/new`,
              },
              {
                label: 'Discussions',
                href: `https://github.com/${organizationName}/${projectName}/discussions`,
              },
              {
                label: 'Contributing',
                href: `https://github.com/${organizationName}/${projectName}/blob/main/CONTRIBUTING.md`,
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: `https://github.com/${organizationName}/${projectName}`,
              },
              {
                label: 'npm',
                href: `https://www.npmjs.com/org/${projectName}`,
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} ${projectName} - Licensed under MIT`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;

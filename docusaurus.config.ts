import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Zip Station',
  tagline: 'A modern, self-hosted helpdesk solution',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://zipstation.dev',
  baseUrl: '/',

  organizationName: 'signal-one-digital',
  projectName: 'zip-station-docs',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: [
            './src/css/custom.css',
          ],
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Zip Station',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docs',
          position: 'left',
          label: 'User Guide',
        },
        {
          to: '/docs/setup-guide/overview',
          position: 'left',
          label: 'Setup Guide',
        },
        {
          to: '/docs/contributing/development-setup',
          position: 'left',
          label: 'Contributing',
        },
        {
          href: 'https://github.com/zip-station/zip-station-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'User Guide',
              to: '/docs/user-guide/getting-started',
            },
            {
              label: 'Setup Guide',
              to: '/docs/setup-guide/overview',
            },
            {
              label: 'Contributing',
              to: '/docs/contributing/development-setup',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/zip-station/zip-station-docs',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Signal One Digital LLC. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'yaml', 'docker'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

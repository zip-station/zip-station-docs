import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    'intro',
    {
      type: 'category',
      label: 'User Guide',
      collapsed: false,
      items: [
        'user-guide/getting-started',
        'user-guide/dashboard',
        'user-guide/tickets',
        'user-guide/kanban',
        'user-guide/intake',
        'user-guide/customers',
        'user-guide/canned-responses',
        'user-guide/projects',
        'user-guide/alerts',
        'user-guide/settings',
        'user-guide/roles-and-permissions',
        'user-guide/keyboard-shortcuts',
      ],
    },
    {
      type: 'category',
      label: 'Setup Guide',
      collapsed: false,
      items: [
        'setup-guide/overview',
        'setup-guide/quick-start',
        'setup-guide/firebase-setup',
        'setup-guide/email-configuration',
        'setup-guide/dns-and-reverse-proxy',
        'setup-guide/environment-variables',
        'setup-guide/firebase-admin-sdk',
        'setup-guide/production-deployment',
        'setup-guide/upgrading',
      ],
    },
    {
      type: 'category',
      label: 'Contributing',
      collapsed: true,
      items: [
        'contributing/development-setup',
        'contributing/architecture',
        'contributing/project-structure',
        'contributing/coding-standards',
      ],
    },
  ],
};

export default sidebars;

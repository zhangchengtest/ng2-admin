export const STRUCTURE = [
  {
    type: 'section',
    name: 'Getting Started',
    children: [
      {
        type: 'page',
        name: 'Installation',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'index.md'
          }
        ]
      },
      {
        type: 'page',
        name: 'Customization',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'customization.md'
          }
        ]
      },
      {
        type: 'page',
        name: 'Theme',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'theme.md'
          }
        ]
      }
    ],
  },
  {
    type: 'section',
    name: 'UI Components',
    children: [
      {
        type: 'page',
        name: 'Layout',
        children: [
          {
            type: 'block',
            block: 'component',
            blockData: 'NgaLayoutComponent',
          },
        ],
      },
      {
        type: 'page',
        name: 'Sidebar',
        children: [
          {
            type: 'block',
            block: 'component',
            blockData: 'NgaSidebarComponent',
          },
          {
            type: 'block',
            block: 'component',
            blockData: 'NgaSidebarHeaderComponent',
          },
          {
            type: 'block',
            block: 'component',
            blockData: 'NgaSidebarFooterComponent',
            name: 'true'
          },
          {
            type: 'block',
            block: 'component',
            blockData: 'NgaSidebarService',
          }
        ],
      },


    ],
  },
  {
    type: 'section',
    name: 'Themes',
    children: [
      {
        type: 'page',
        name: 'NgaThemes',
        children: [
          {
            type: 'block',
            block: 'theme',
            blockData: 'default',
          },
          {
            type: 'block',
            block: 'theme',
            blockData: 'light',
          },
          {
            type: 'block',
            block: 'theme',
            blockData: 'cosmic',
          },
        ],
      }
    ]
  }
];

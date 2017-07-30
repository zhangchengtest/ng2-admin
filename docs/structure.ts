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
          {
            type: 'block',
            block: 'component',
            blockData: 'NgaLayoutHeaderComponent',
          },
          {
            type: 'block',
            block: 'component',
            blockData: 'NgaLayoutColumnComponent',
          },
          {
            type: 'block',
            block: 'component',
            blockData: 'NgaLayoutFooterComponent',
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
      {
        type: 'page',
        name: 'UserComponent',
        children: [
          {
            type: 'block',
            block: 'component',
            blockData: 'NgaUserComponent',
          }
        ],
      }
    ],
  },
  {
    type: 'section',
    name: 'Services',
    children: [
      {
        type: 'page',
        name: 'MediaBreakpoints',
        children: [
          {
            type: 'block',
            block: 'component',
            blockData: 'NgaMediaBreakpointsService',
          },
        ],
      },
      {
        type: 'page',
        name: 'JSThemesRegistry',
        children: [
          {
            type: 'block',
            block: 'component',
            blockData: 'NgaJSThemesRegistry',
          },
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
        isSubpages: true,
        children: [
          {
            type: 'block',
            block: 'theme',
            name: 'default',
            blockData: 'default',
          },
          {
            type: 'block',
            block: 'theme',
            name: 'light',
            blockData: 'light',
          },
          {
            type: 'block',
            block: 'theme',
            name: 'cosmic',
            blockData: 'cosmic',
          },
        ],
      }
    ]
  }
];

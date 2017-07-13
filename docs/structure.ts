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
            block: 'description',
            classData: 'NgaLayoutComponent',
          },
          {
            type: 'block',
            block: 'props',
            classData: 'NgaLayoutComponent',
          },
          // {
          //   type: 'block',
          //   block: 'class-outputs',
          //   classData: 'NgaLayoutComponent',
          // },
          {
            type: 'block',
            block: 'examples',
            classData: 'NgaLayoutComponent',
          },
          {
            type: 'block',
            block: 'methods',
            classData: 'NgaLayoutComponent',
          },
          {
            type: 'block',
            block: 'styles',
            classData: 'NgaLayoutComponent',
          },
          // we may have a couple of custom components like header, text, html (or do we?)
          {
            type: 'type',
            block: 'header',
            text: 'Children components containers',
          },
          // tag: component will render all of the above (description, inputs, outputs, examples, runnable examples)
          {
            type: 'block',
            block: 'class-component',
            classData: 'NgaLayoutColumnComponent',
          },
        ],
      },
      {
        type: 'page',
        name: 'Sidebar',
        children: [
          {
            type: 'block',
            block: 'description',
            classData: 'NgaSidebarComponent',
          },
          {
            type: 'block',
            block: 'props',
            classData: 'NgaSidebarComponent',
          },
          {
            type: 'block',
            block: 'methods',
            classData: 'NgaSidebarComponent',
          },
          {
            type: 'block',
            block: 'examples',
            classData: 'NgaSidebarComponent',
          },
          {
            type: 'block',
            block: 'styles',
            classData: 'NgaSidebarComponent',
          },

          // we may have a couple of custom components like header, text, html (or do we?)
          {
            type: 'block',
            block: 'header',
            text: 'Children components',
          },
          // tag: component will render all of the above (description, inputs, outputs, examples, runnable examples)
          {
            type: 'block',
            block: 'class-description',
            classData: 'NgaSidebarHeaderComponent',
          },
          {
            type: 'block',
            block: 'class-description',
            classData: 'NgaSidebarFooterComponent',
          },
          {
            type: 'block',
            block: 'class-description',
            classData: 'NgaSidebarService',
          },
          {
            type: 'block',
            block: 'class-methods',
            classData: 'NgaSidebarService',
          },
        ],
      },


    ],
  },
];

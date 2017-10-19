export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'general.menu.dashboard',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      
      {
        path: 'forms',
        data: {
          menu: {
            title: 'general.menu.add_restaurant',
            icon: 'ion-compose',
            selected: false,
            expanded: false,
            order: 400,
          }
        },
        children: [
          {
            path: 'inputs',
            data: {
              menu: {
                title: 'general.menu.add_print_machine',
              }
            }
          },
          {
            path: 'layouts',
            data: {
              menu: {
                title: 'general.menu.add_restaurant',
              }
            }
          }
        ]
      },

      {
        path: 'tables',
        data: {
          menu: {
            title: 'general.menu.restaurant',
            icon: 'ion-grid',
            selected: false,
            expanded: false,
            order: 500,
          }
        },
        children: [
          {
            path: 'basictables',
            data: {
              menu: {
                title: 'general.menu.restaurants',
                inner_path: '/pages/tables/datatables'
              }
            }
          },
          {
            path: 'smarttables',
            data: {
              menu: {
                title: 'general.menu.print_machines',
              }
            }
          }
         
        ]
      }
      
    ]
  }
];

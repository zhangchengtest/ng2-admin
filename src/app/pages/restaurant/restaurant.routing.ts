import { Routes, RouterModule } from '@angular/router';

import { Restaurant } from './restaurant.component';
import { RestaurantList } from './components/restaurantList/restaurantList.component';
import { SmartTables } from './components/smartTables/smartTables.component';
import { DataTables } from './components/dataTables/dataTables.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Restaurant,
    children: [
      { path: 'restaurantList', component: RestaurantList },
      { path: 'smarttables', component: SmartTables },
      { path: 'datatables', component: DataTables },
    ]
  }
];

export const routing = RouterModule.forChild(routes);

import { Routes, RouterModule }  from '@angular/router';

import { Ui } from './ui.component';
import { Modals } from './components/modals/modals.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Ui,
    children: [
    
      { path: 'modals', component: Modals }
      
    ]
  }
];

export const routing = RouterModule.forChild(routes);

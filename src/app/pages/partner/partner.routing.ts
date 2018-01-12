import { Routes, RouterModule } from '@angular/router';

import { Partner } from './partner.component';
import { PartnerDetailComponent } from './component/detail/partnerDetail.component';
import { PartnerListComponent } from './component/list/partnerList.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Partner,
    children: [
    
      { path: 'detail', component: PartnerDetailComponent },
	  { path: 'list', component: PartnerListComponent }	
      
    ]
    
  }
];

export const routing = RouterModule.forChild(routes);
